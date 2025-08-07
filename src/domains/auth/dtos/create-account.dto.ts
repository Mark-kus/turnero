export interface CreateAccountDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AccountCreateData extends Omit<CreateAccountDto, "password"> {
  hashedPassword: string;
  token: string;
  tokenExpiry: Date;
}
