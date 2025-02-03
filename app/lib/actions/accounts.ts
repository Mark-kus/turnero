"use server";

import { cookies } from "next/headers";

import {
  LoginFormSchema,
  ProfileFormSchema,
  SignupFormSchema,
} from "@/app/lib/definitions";
import type { FormState } from "@/app/types";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { createSession, deleteSession, verifySession } from "@/app/lib/session";
import { sendVerifyEmail } from "@/app/lib/email";
import { redirect } from "next/navigation";

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
  });

  console.log({
    formData: {
      first_name: formData.get("first_name"),
      last_name: formData.get("last_name"),
      birthdate: formData.get("birthdate"),
      email: formData.get("email"),
      city: formData.get("city"),
      address: formData.get("address"),
      phone: formData.get("phone"),
    },
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { first_name, last_name, email, birthdate, city, address, phone } =
    validationResult.data;

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

  // Update user
  sql`
    UPDATE accounts
    SET first_name = ${first_name}, last_name = ${last_name}, email = ${email}, birthdate = ${birthdate}, city = ${city}, address = ${address}, phone = ${phone}
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

  // Send email for confirmation
  const { error } = await sendVerifyEmail([email], "verifyEmail", {
    first_name,
  });

  if (error) {
    return {
      errors: {
        submit: ["Failed to send email."],
      },
    };
  }

  // Create user
  const hashedPassword = await bcrypt.hash(password, 10);
  sql`
    INSERT INTO accounts (first_name, last_name, email, hashed_password)
    VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword})
  `;

  // Set userEmail cookie
  cookies().set("userEmail", email);

  // Redirect to verify email page
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
  };
  await createSession(sessionData);
}

export async function logout() {
  deleteSession();
}
