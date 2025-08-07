export interface UpdateProfileDto {
  accountId: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: File | null;
  birthdate: string | null;
  phone: string | null;
  city: string | null;
  address: string | null;
}
