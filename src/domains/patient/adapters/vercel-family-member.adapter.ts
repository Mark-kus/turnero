import {sql} from "@vercel/postgres";

import {FamilyMemberRepository} from "@/patient/contracts/family-member.repository";
import {CreateFamilyMemberDto} from "@/patient/dtos/create-family-member.dto";
import {FamilyMemberEntity} from "@/patient/dtos/family-member.entity";

export class VercelFamilyMemberRepository implements FamilyMemberRepository {
  async create(accountId: number, familyMember: CreateFamilyMemberDto): Promise<void> {
    await sql`
        INSERT INTO family_members (name, surname, age, identification_number, account_id)
        VALUES (${familyMember.name}, ${familyMember.surname}, ${familyMember.age}, ${familyMember.identificationNumber}, ${accountId})
      `;
  }

  async findOneByAccountId(accountId: number): Promise<FamilyMemberEntity[]> {
    const result = await sql`
      SELECT * FROM family_members WHERE account_id = ${accountId} ORDER BY created_at DESC
    `;

    return result.rows as FamilyMemberEntity[];
  }
}
