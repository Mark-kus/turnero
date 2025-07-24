import {randomUUID} from "crypto";

import {sql} from "@vercel/postgres";
import {hash} from "bcrypt";

import {sendVerifyEmail} from "@/app/lib/email";
import {signup} from "@/app/lib/actions/accounts";
import {FormState} from "@/app/types";
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
  sendVerifyEmail: jest.fn().mockResolvedValue({error: null}),
}));

jest.mock("next/headers", () => ({
  cookies: jest.fn(() => ({
    set: jest.fn(),
    delete: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("@/app/lib/session", () => ({
  createSession: jest.fn(),
  deleteSession: jest.fn(),
  verifySession: jest.fn(),
}));

describe("Signup Action", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.PROJECT_URL = "https://example.com";
  });

  it("should successfully create a new user account", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce({rows: [{count: "0"}]});
    (sql as unknown as jest.Mock).mockResolvedValueOnce({});

    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "john.doe@example.com");
    formData.append("password", "Password123!");

    const state: FormState = undefined;

    await signup(state, formData);

    expect(hash as unknown as jest.Mock).toHaveBeenCalledWith("Password123!", 10);
    expect(randomUUID as unknown as jest.Mock).toHaveBeenCalled();
    expect(sql as unknown as jest.Mock).toHaveBeenCalledTimes(2);
  });

  it("should return validation errors for invalid input", async () => {
    const formData = new FormData();

    formData.append("first_name", "J"); // Too short
    formData.append("last_name", ""); // Empty
    formData.append("email", "invalid-email"); // Invalid format
    formData.append("password", "weak"); // Too weak

    const state: FormState = undefined;
    const result = await signup(state, formData);

    expect(result).toBeDefined();
    expect(result).toHaveProperty("errors");

    if (result && "errors" in result) {
      expect(result.errors).toBeDefined();
      expect(result.errors?.first_name).toBeDefined();
      expect(result.errors?.last_name).toBeDefined();
      expect(result.errors?.email).toBeDefined();
      expect(result.errors?.password).toBeDefined();
    }
  });

  it("should return error when email already exists", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce({rows: [{count: "1"}]});

    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "existing@example.com");
    formData.append("password", "Password123!");

    const state: FormState = undefined;
    const result = await signup(state, formData);

    expect(result).toBeDefined();

    if (result && "errors" in result) {
      expect(result.errors).toBeDefined();
      expect(result.errors?.email).toEqual(["Email already exists."]);
    }
  });

  it("should return error when email sending fails", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce({rows: [{count: "0"}]});
    (sql as unknown as jest.Mock).mockResolvedValueOnce({});
    (sendVerifyEmail as unknown as jest.Mock).mockResolvedValueOnce({error: "Email service error"});

    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "john.doe@example.com");
    formData.append("password", "Password123!");

    const state: FormState = undefined;
    const result = await signup(state, formData);

    expect(result).toBeDefined();

    if (result && "errors" in result) {
      expect(result.errors).toBeDefined();
      expect(result.errors?.submit).toEqual(["Failed to send email."]);
    }
  });

  it("should validate first name correctly", async () => {
    const formData = new FormData();

    formData.append("first_name", "A"); // Too short
    formData.append("last_name", "Doe");
    formData.append("email", "test@example.com");
    formData.append("password", "Password123!");

    const state: FormState = undefined;
    const result = await signup(state, formData);

    expect(result).toBeDefined();

    if (result && "errors" in result) {
      expect(result.errors?.first_name).toBeDefined();
    }
  });

  it("should validate email format correctly", async () => {
    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "invalid-email");
    formData.append("password", "Password123!");

    const state: FormState = undefined;
    const result = await signup(state, formData);

    expect(result).toBeDefined();

    if (result && "errors" in result) {
      expect(result.errors?.email).toBeDefined();
    }
  });

  it("should validate password strength correctly", async () => {
    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "test@example.com");
    formData.append("password", "weak");

    const state: FormState = undefined;
    const result = await signup(state, formData);

    expect(result).toBeDefined();

    if (result && "errors" in result) {
      expect(result.errors?.password).toBeDefined();
    }
  });

  it("should hash passwords before storing", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce({rows: [{count: "0"}]});
    (sql as unknown as jest.Mock).mockResolvedValueOnce({});

    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "john@example.com");
    formData.append("password", "Password123!");

    const state: FormState = undefined;

    await signup(state, formData);

    expect(hash as unknown as jest.Mock).toHaveBeenCalledWith("Password123!", 10);
  });

  it("should generate verification tokens", async () => {
    (sql as unknown as jest.Mock).mockResolvedValueOnce({rows: [{count: "0"}]});
    (sql as unknown as jest.Mock).mockResolvedValueOnce({});

    const formData = new FormData();

    formData.append("first_name", "John");
    formData.append("last_name", "Doe");
    formData.append("email", "john@example.com");
    formData.append("password", "Password123!");

    const state: FormState = undefined;

    await signup(state, formData);

    expect(randomUUID as unknown as jest.Mock).toHaveBeenCalled();
  });
});
