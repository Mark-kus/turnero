"use server";

import { cookies } from "next/headers";

import {
  ChangePasswordFormSchema,
  LoginFormSchema,
  ProfileFormSchema,
  SignupFormSchema,
} from "@/app/lib/definitions";
import type { FormState } from "@/app/types";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { createSession, deleteSession, verifySession } from "@/app/lib/session";
import {
  sendChangeEmail,
  sendChangePassword,
  sendVerifyEmail,
} from "@/app/lib/email";
import { redirect } from "next/navigation";
import { PutBlobResult } from "@vercel/blob";

export async function startPasswordChange(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  let user = null;

  // If user is not logged in, get user by email recieved in form
  const email = formData.get("email");
  if (email) {
    const data = await sql`
    SELECT * FROM accounts WHERE email = ${email as string}
    `;
    user = data.rows[0];

    if (!user) {
      return {
        errors: {
          email: ["Email not found."],
        },
      };
    }

    // If user is logged in, get user by session
  } else {
    const session = await verifySession();

    const data = await sql`
    SELECT * FROM accounts WHERE account_id = ${session.userId}
    `;
    user = data.rows[0];
  }

  // Check if there is already a expiry token for the user from the last 15 minutes
  const tokenData = await sql`
  SELECT * FROM accounts WHERE account_id = ${user.account_id} AND token_expiry > NOW() - INTERVAL '15 minutes'
  `;
  if (tokenData.rows.length > 0) {
    return {
      errors: {
        submit: ["Please wait before requesting another password change."],
      },
    };
  }

  // Create token that expires in 24 hours
  const token = crypto.randomUUID();
  const token_expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
  await sql`
  UPDATE accounts
  SET token = ${token}, token_expiry = ${token_expiry.toISOString()}
  WHERE account_id = ${user.account_id}
  `;

  // Send email for confirmation
  const tokenizedUrl = `${process.env.PROJECT_URL}/password/change?token=${token}`;
  const { error } = await sendChangePassword([user.email], {
    firstName: user.first_name,
    tokenizedUrl,
  });

  if (error) {
    return {
      errors: {
        submit: ["Failed to send email."],
      },
    };
  }
}

export async function changePassword(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const token = formData.get("token");
  if (!token) {
    return {
      errors: {
        submit: ["A token is required."],
      },
    };
  }

  const validationResult = ChangePasswordFormSchema.safeParse({
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { password, password_confirmation } = validationResult.data;

  if (password !== password_confirmation) {
    return {
      errors: {
        password_confirmation: ["Passwords do not match."],
      },
    };
  }

  const data = await sql`
  SELECT * FROM accounts WHERE token = ${token as string}
  `;
  const user = data.rows[0];

  if (!user) {
    return {
      errors: {
        submit: ["Invalid token."],
      },
    };
  }

  if (user.token_expiry < new Date()) {
    sql`
    UPDATE accounts SET token = NULL, token_expiry = NULL WHERE account_id = ${user.account_id}
    `;
    return {
      errors: {
        submit: ["Token expired."],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  sql`
  UPDATE accounts
  SET hashed_password = ${hashedPassword}, token = NULL, token_expiry = NULL
  WHERE account_id = ${user.account_id}
  `;

  // Redirect to login
  logout();
}

export async function updateProfile(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const session = await verifySession();

  // Validate user
  const validationResult = ProfileFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    birthdate: formData.get("birthdate"),
    email: formData.get("email"),
    city: formData.get("city"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    avatar: formData.get("avatar"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const {
    first_name,
    last_name,
    email,
    birthdate,
    city,
    address,
    phone,
    avatar,
  } = validationResult.data;

  const data = await sql`
  SELECT * FROM accounts WHERE account_id = ${session.userId}
  `;
  const user = data.rows[0];

  if (user.email !== email) {
    // Check if user email exists
    const userExistsCount = await sql`
    SELECT COUNT(*) FROM accounts WHERE email = ${email} AND account_id != ${session.userId}
    `;

    if (userExistsCount.rows[0].count > 0) {
      return {
        errors: {
          email: ["Email already exists."],
        },
      };
    }

    // Create token that expires in 24 hours
    const token = crypto.randomUUID();
    const token_expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
    sql`
    UPDATE accounts
    SET token = ${token}, token_expiry = ${token_expiry.toISOString()}
    WHERE account_id = ${session.userId}
    `;

    // Send email for confirmation
    const tokenizedUrl = `${process.env.PROJECT_URL}/api/change-email?token=${token}&email=${email}`;
    const { error } = await sendChangeEmail([email], {
      firstName: first_name,
      tokenizedUrl,
    });

    if (error) {
      return {
        errors: {
          submit: ["Failed to send email."],
        },
      };
    }
  }

  // Upload avatar
  if (avatar?.size > 0) {
    const filename = crypto.randomUUID();
    const response = await fetch(
      `${process.env.PROJECT_URL}/api/avatar/upload?filename=${filename}`,
      {
        method: "POST",
        body: avatar,
      },
    );
    const newBlob = (await response.json()) as PutBlobResult;
    sql`
    UPDATE accounts
    SET avatar_url = ${newBlob.url}
    WHERE account_id = ${session.userId}
    `;

    // Delete old avatar if exists (not awaiting)
    if (user.avatar_url) {
      fetch(
        `${process.env.PROJECT_URL}/api/avatar/upload?filename=${user.avatar_url.split("/").pop()}`,
        { method: "DELETE" },
      );
    }
  }

  // Update user
  sql`
    UPDATE accounts
    SET first_name = ${first_name}, last_name = ${last_name}, birthdate = ${birthdate}, city = ${city}, address = ${address}, phone = ${phone}
    WHERE account_id = ${session.userId}
  `;
}

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // Validate user
  const validationResult = SignupFormSchema.safeParse({
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { first_name, last_name, email, password } = validationResult.data;

  // Check if user email exists
  const userExistsCount = await sql`
  SELECT COUNT(*) FROM accounts WHERE email = ${email}
  `;

  if (userExistsCount.rows[0].count > 0) {
    return {
      errors: {
        email: ["Email already exists."],
      },
    };
  }

  // Create user with token that expires in 24 hours
  const hashedPassword = await bcrypt.hash(password, 10);
  const token = crypto.randomUUID();
  const token_expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);
  sql`
  INSERT INTO accounts (first_name, last_name, email, hashed_password, token, token_expiry)
  VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${token}, ${token_expiry.toISOString()})
  `;

  // Send email for confirmation
  const tokenizedUrl = `${process.env.PROJECT_URL}/api/verify?token=${token}`;
  const { error } = await sendVerifyEmail([email], {
    firstName: first_name,
    tokenizedUrl,
  });

  if (error) {
    return {
      errors: {
        submit: ["Failed to send email."],
      },
    };
  }

  // Set userEmail cookie
  cookies().set("userEmail", email);
  redirect("/verify");
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  // 1. Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    remember_me: formData.get("remember_me"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (validatedFields.data.remember_me) {
    cookies().set("userEmail", validatedFields.data.email);
  } else {
    cookies().delete("userEmail");
  }

  // 2. Query the database for the user with the given email
  const data = await sql`
  SELECT * FROM accounts WHERE email = ${validatedFields.data.email}
  `;
  const user = data.rows[0];

  // If user is not found, return early
  const invalidCredentialsError = {
    errors: {
      submit: ["Invalid login credentials."],
    },
  };
  if (!user) {
    return invalidCredentialsError;
  }

  // 3. Compare the user's password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    user.hashed_password,
  );

  // If the password does not match, return early
  if (!passwordMatch) {
    return invalidCredentialsError;
  }

  // Check if is verified
  if (!user.enabled) {
    return {
      errors: {
        submit: ["Account is not verified."],
      },
    };
  }

  // 4. If login successful, create a session for the user and redirect
  const sessionData = {
    userId: user.account_id,
    role: user.role,
    avatarUrl: user.avatar_url,
  };
  await createSession(sessionData);
}

export async function logout() {
  deleteSession();
}
