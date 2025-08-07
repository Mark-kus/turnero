export type NumberedRole = 0 | 1 | 2;

export type Role = "patient" | "professional" | "provider";

export interface SessionData {
  accountId: string;
  avatarUrl: string | null;
  role: Role;
}

export interface SessionPayload extends SessionData {
  expiresAt: Date;
}

export type LoginFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
        submit?: string[];
      };
      message?: string;
      success?: {
        data?: any;
      };
    }
  | undefined;

export type RegisterFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        submit?: string[];
      };
      message?: string;
      success?: {
        data?: any;
      };
    }
  | undefined;

export type UpdateProfileFormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        birthdate?: string[];
        email?: string[];
        city?: string[];
        address?: string[];
        phone?: string[];
        avatar?: string[];
        submit?: string[];
      };
      message?: string;
      success?: {
        data?: any;
      };
    }
  | undefined;

export type ChangePasswordFormState =
  | {
      errors?: {
        token?: string[];
        password?: string[];
        passwordConfirmation?: string[];
        submit?: string[];
      };
      message?: string;
      success?: {
        data?: any;
      };
    }
  | undefined;

export type ForgotPasswordFormState =
  | {
      errors?: {
        email?: string[];
        submit?: string[];
      };
      message?: string;
      success?: {
        data?: any;
      };
    }
  | undefined;
