import {AccountEntity} from "@/auth/entities/account.entity";
import {Role} from "@/shared/types";

export interface AccountDTO {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  identificationNumber: number | null;
  avatarUrl: string | null;
  birthdate: Date | null;
  phone: string | null;
  city: string | null;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
  enabled: boolean;
}

export function toAccountDTO(data: AccountEntity): AccountDTO {
  return {
    accountId: data.account_id,
    email: data.email,
    firstName: data.first_name,
    lastName: data.last_name,
    role: data.role,
    identificationNumber: data.identification_number,
    avatarUrl: data.avatar_url,
    birthdate: data.birthdate,
    phone: data.phone,
    city: data.city,
    address: data.address,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    enabled: data.enabled,
  };
}
