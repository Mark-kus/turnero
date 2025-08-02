import {Role} from "@/shared/types";

export interface AccountEntity {
  account_id: string;
  email: string;
  first_name: string;
  last_name: string;
  hashed_password: string;
  role: Role;
  identification_number: number | null;
  avatar_url: string | null;
  birthdate: Date | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  created_at: Date;
  updated_at: Date;
  token: string | null;
  token_expiry: Date | null;
  enabled: boolean;
}

export interface AccountEntityWithToken extends AccountEntity {
  token: string;
  token_expiry: Date;
}
