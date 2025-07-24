import {
  SignupFormSchema,
  LoginFormSchema,
  ProfileFormSchema,
  ChangePasswordFormSchema,
  FamilyMemberSchema,
} from "@/app/lib/definitions";

describe("definitions.ts - Zod Schemas", () => {
  describe("SignupFormSchema", () => {
    it("should validate correct signup data", () => {
      const validData = {
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "Password123!",
      };

      const result = SignupFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject invalid first_name", () => {
      const invalidData = {
        first_name: "J", // Too short
        last_name: "Doe",
        email: "john.doe@example.com",
        password: "Password123!",
      };

      const result = SignupFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Name must be at least 2 characters long.");
      }
    });

    it("should reject invalid email", () => {
      const invalidData = {
        first_name: "John",
        last_name: "Doe",
        email: "invalid-email",
        password: "Password123!",
      };

      const result = SignupFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter a valid email.");
      }
    });

    it("should reject weak passwords", () => {
      const testCases = [
        {password: "short", message: "Be at least 8 characters long"},
        {password: "12345678", message: "Contain at least one letter."},
        {password: "password", message: "Contain at least one number."},
        {password: "Password123", message: "Contain at least one special character."},
      ];

      testCases.forEach(({password, message}) => {
        const invalidData = {
          first_name: "John",
          last_name: "Doe",
          email: "john.doe@example.com",
          password,
        };

        const result = SignupFormSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
        if (!result.success) {
          expect(result.error.issues.some((issue) => issue.message === message)).toBe(true);
        }
      });
    });

    it("should trim whitespace from inputs", () => {
      const dataWithWhitespace = {
        first_name: "  John  ",
        last_name: "  Doe  ",
        email: "john.doe@example.com", // Email must be valid format without spaces
        password: "  Password123!  ", // Password can have spaces that get trimmed
      };

      const result = SignupFormSchema.safeParse(dataWithWhitespace);

      expect(result.success).toBe(true);

      if (result.success) {
        expect(result.data.first_name).toBe("John");
        expect(result.data.last_name).toBe("Doe");
        expect(result.data.email).toBe("john.doe@example.com");
        expect(result.data.password).toBe("Password123!");
      }
    });

    it("should reject email with whitespace (email validation runs before trim)", () => {
      const dataWithWhitespaceEmail = {
        first_name: "John",
        last_name: "Doe",
        email: "  john.doe@example.com  ", // This should fail
        password: "Password123!",
      };

      const result = SignupFormSchema.safeParse(dataWithWhitespaceEmail);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter a valid email.");
      }
    });
  });

  describe("LoginFormSchema", () => {
    it("should validate correct login data", () => {
      const validData = {
        email: "john.doe@example.com",
        password: "any-password",
        remember_me: "true",
      };

      const result = LoginFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should validate login data with null remember_me", () => {
      const validData = {
        email: "john.doe@example.com",
        password: "any-password",
        remember_me: null,
      };

      const result = LoginFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject empty password", () => {
      const invalidData = {
        email: "john.doe@example.com",
        password: "",
        remember_me: null,
      };

      const result = LoginFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Password field must not be empty.");
      }
    });

    it("should reject invalid email format", () => {
      const invalidData = {
        email: "invalid-email",
        password: "any-password",
        remember_me: null,
      };

      const result = LoginFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter a valid email.");
      }
    });
  });

  describe("ProfileFormSchema", () => {
    it("should validate complete profile data", () => {
      const validData = {
        first_name: "John",
        last_name: "Doe",
        birthdate: "1990-01-01",
        email: "john.doe@example.com",
        city: "New York",
        address: "123 Main St",
        phone: "+1234567890",
        avatar: null,
      };

      const result = ProfileFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject empty required fields", () => {
      const requiredFields = [
        "first_name",
        "last_name",
        "birthdate",
        "email",
        "city",
        "address",
        "phone",
      ];

      requiredFields.forEach((field) => {
        const invalidData = {
          first_name: "John",
          last_name: "Doe",
          birthdate: "1990-01-01",
          email: "john.doe@example.com",
          city: "New York",
          address: "123 Main St",
          phone: "+1234567890",
          avatar: null,
          [field]: "",
        };

        const result = ProfileFormSchema.safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("ChangePasswordFormSchema", () => {
    it("should validate password change data", () => {
      const validData = {
        password: "NewPassword123!",
        password_confirmation: "NewPassword123!",
      };

      const result = ChangePasswordFormSchema.safeParse(validData);

      expect(result.success).toBe(true);
    });

    it("should reject weak new password", () => {
      const invalidData = {
        password: "weak",
        password_confirmation: "weak",
      };

      const result = ChangePasswordFormSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Be at least 8 characters long");
      }
    });
  });

  describe("FamilyMemberSchema", () => {
    it("should validate family member data", () => {
      const validData = {
        name: "Jane",
        surname: "Doe",
        identification_number: "12345678",
        age: "25",
      };

      const result = FamilyMemberSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.age).toBe(25); // Should be converted to number
      }
    });

    it("should reject invalid age", () => {
      const invalidData = {
        name: "Jane",
        surname: "Doe",
        identification_number: "12345678",
        age: "0",
      };

      const result = FamilyMemberSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter a valid age.");
      }
    });

    it("should reject non-numeric age", () => {
      const invalidData = {
        name: "Jane",
        surname: "Doe",
        identification_number: "12345678",
        age: "not-a-number",
      };

      const result = FamilyMemberSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
    });

    it("should reject empty identification number", () => {
      const invalidData = {
        name: "Jane",
        surname: "Doe",
        identification_number: "",
        age: "25",
      };

      const result = FamilyMemberSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Please enter a valid ID.");
      }
    });
  });
});
