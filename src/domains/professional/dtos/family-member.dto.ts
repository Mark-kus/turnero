export interface FamilyMemberRaw {
  family_member_id: number;
  name: string;
  surname: string;
  age: number;
  identification_number: string | null;
}

export interface FamilyMemberDto {
  familyMemberId: number;
  name: string;
  surname: string;
  age: number;
  identificationNumber: string | null;
}

export function toFamilyMemberDto(row: FamilyMemberRaw): FamilyMemberDto {
  return {
    familyMemberId: row.family_member_id,
    name: row.name,
    surname: row.surname,
    age: row.age,
    identificationNumber: row.identification_number,
  };
}
