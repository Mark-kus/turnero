export interface CreateAccountDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AccountCreateData extends Omit<CreateAccountDTO, "password"> {
  hashedPassword: string;
  token: string;
  tokenExpiry: Date;
}
