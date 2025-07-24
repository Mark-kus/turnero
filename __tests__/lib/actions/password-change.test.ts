import {sql as sqlType} from "@vercel/postgres";
import * as bcryptType from "bcrypt";
import {redirect as redirectType} from "next/navigation";

import {changePassword, startPasswordChange} from "@/app/lib/actions/accounts";
import {FormState} from "@/app/types";
import {sendChangePassword as sendChangePasswordType} from "@/app/lib/email";

// Mock dependencies
jest.mock("@vercel/postgres", () => ({
  sql: jest.fn(),
}));

jest.mock("bcrypt", () => ({
  hash: jest.fn().mockResolvedValue("hashed_password_123"),
}));

jest.mock("crypto", () => ({
  randomUUID: jest.fn().mockReturnValue("test-uuid-token"),
}));

jest.mock("@/app/lib/email", () => ({
  sendChangePassword: jest.fn().mockResolvedValue({error: null}),
}));

jest.mock("@/app/lib/session", () => ({
  verifySession: jest.fn().mockResolvedValue({userId: "user-123"}),
  deleteSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

// Use imports as unknown and cast in tests
const sql = sqlType as unknown as jest.Mock;
const bcrypt = bcryptType as unknown as {hash: jest.Mock};
const sendChangePassword = sendChangePasswordType as unknown as jest.Mock;
const redirect = redirectType as unknown as jest.Mock;

describe("Password Change Actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PROJECT_URL = "https://example.com";

    // Mock global crypto for Node.js environment
    global.crypto = {
      randomUUID: jest.fn().mockReturnValue("test-uuid-token"),
    } as any;
  });

  describe("startPasswordChange", () => {
    const mockUser = {
      account_id: "user-123",
      email: "test@example.com",
      first_name: "John",
    };

    it("should start password change for logged in user", async () => {
      // Mock user found by session
      sql.mockResolvedValueOnce({rows: [mockUser]});
      // Mock no recent token request
      sql.mockResolvedValueOnce({rows: []});
      // Mock token update
      sql.mockResolvedValueOnce({});

      const formData = new FormData();
      const state: FormState = undefined;

      const result = await startPasswordChange(state, formData);

      expect(sql).toHaveBeenCalledTimes(3);
      expect(sendChangePassword).toHaveBeenCalledWith(
        ["test@example.com"],
        expect.objectContaining({
          firstName: "John",
          tokenizedUrl: expect.stringContaining("https://example.com/password/change?token="),
        }),
      );
      expect(result).toBeUndefined();
    });

    it("should start password change for user by email", async () => {
      // Mock user found by email
      sql.mockResolvedValueOnce({rows: [mockUser]});
      // Mock no recent token request
      sql.mockResolvedValueOnce({rows: []});
      // Mock token update
      sql.mockResolvedValueOnce({});

      const formData = new FormData();

      formData.append("email", "test@example.com");
      const state: FormState = undefined;

      const result = await startPasswordChange(state, formData);

      expect(sql).toHaveBeenCalledTimes(3);
      expect(sendChangePassword).toHaveBeenCalled();
      expect(result).toBeUndefined();
    });

    it("should return error for non-existent email", async () => {
      // Mock user not found
      sql.mockResolvedValueOnce({rows: []});

      const formData = new FormData();

      formData.append("email", "nonexistent@example.com");
      const state: FormState = undefined;

      const result = await startPasswordChange(state, formData);

      expect(result).toEqual({
        errors: {
          email: ["Email not found."],
        },
      });
    });

    it("should return error for recent token request", async () => {
      // Mock user found
      sql.mockResolvedValueOnce({rows: [mockUser]});
      // Mock recent token request exists
      sql.mockResolvedValueOnce({rows: [{token: "recent-token"}]});

      const formData = new FormData();

      formData.append("email", "test@example.com");
      const state: FormState = undefined;

      const result = await startPasswordChange(state, formData);

      expect(result).toEqual({
        errors: {
          submit: ["Please wait 15 minutes before requesting another password change."],
        },
      });
    });

    it("should return error when email sending fails", async () => {
      // Mock user found
      sql.mockResolvedValueOnce({rows: [mockUser]});
      // Mock no recent token request
      sql.mockResolvedValueOnce({rows: []});
      // Mock token update
      sql.mockResolvedValueOnce({});
      // Mock email sending failure
      sendChangePassword.mockResolvedValueOnce({error: "Email service error"});

      const formData = new FormData();

      formData.append("email", "test@example.com");
      const state: FormState = undefined;

      const result = await startPasswordChange(state, formData);

      expect(result).toEqual({
        errors: {
          submit: ["Failed to send email."],
        },
      });
    });
  });

  describe("changePassword", () => {
    const mockUser = {
      account_id: "user-123",
      email: "test@example.com",
      token_expiry: new Date(Date.now() + 1000 * 60 * 60), // 1 hour from now
    };

    it("should successfully change password with valid token", async () => {
      // Mock user found with valid token
      sql.mockResolvedValueOnce({rows: [mockUser]});
      // Mock password update
      sql.mockResolvedValueOnce({});

      const formData = new FormData();

      formData.append("token", "valid-token");
      formData.append("password", "NewPassword123!");
      formData.append("password_confirmation", "NewPassword123!");

      const state: FormState = undefined;

      await changePassword(state, formData);

      expect(bcrypt.hash).toHaveBeenCalledWith("NewPassword123!", 10);
      expect(sql).toHaveBeenCalledTimes(2);
      expect(redirect).toHaveBeenCalledWith("/login");
    });

    it("should return error when token is missing", async () => {
      const formData = new FormData();

      formData.append("password", "NewPassword123!");
      formData.append("password_confirmation", "NewPassword123!");

      const state: FormState = undefined;
      const result = await changePassword(state, formData);

      expect(result).toEqual({
        errors: {
          submit: ["A token is required."],
        },
      });
    });

    it("should return validation errors for invalid password", async () => {
      const formData = new FormData();

      formData.append("token", "valid-token");
      formData.append("password", "weak"); // Too weak
      formData.append("password_confirmation", "weak");

      const state: FormState = undefined;
      const result = await changePassword(state, formData);

      expect(result).toBeDefined();
      expect(result).toHaveProperty("errors");
      if (result && "errors" in result) {
        expect(result.errors?.password).toBeDefined();
      }
    });

    it("should return error when passwords do not match", async () => {
      const formData = new FormData();

      formData.append("token", "valid-token");
      formData.append("password", "NewPassword123!");
      formData.append("password_confirmation", "DifferentPassword123!");

      const state: FormState = undefined;
      const result = await changePassword(state, formData);

      expect(result).toEqual({
        errors: {
          password_confirmation: ["Passwords do not match."],
        },
      });
    });

    it("should return error for invalid token", async () => {
      // Mock user not found
      sql.mockResolvedValueOnce({rows: []});

      const formData = new FormData();

      formData.append("token", "invalid-token");
      formData.append("password", "NewPassword123!");
      formData.append("password_confirmation", "NewPassword123!");

      const state: FormState = undefined;
      const result = await changePassword(state, formData);

      expect(result).toEqual({
        errors: {
          submit: ["Invalid token."],
        },
      });
    });

    it("should return error for expired token", async () => {
      const expiredUser = {
        ...mockUser,
        token_expiry: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      };

      // Mock user found with expired token
      sql.mockResolvedValueOnce({rows: [expiredUser]});
      // Mock token cleanup
      sql.mockResolvedValueOnce({});

      const formData = new FormData();

      formData.append("token", "expired-token");
      formData.append("password", "NewPassword123!");
      formData.append("password_confirmation", "NewPassword123!");

      const state: FormState = undefined;
      const result = await changePassword(state, formData);

      expect(result).toEqual({
        errors: {
          submit: ["Token expired."],
        },
      });
    });
  });
});
