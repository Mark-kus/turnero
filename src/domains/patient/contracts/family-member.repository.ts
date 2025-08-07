import {CreateFamilyMemberDto} from "@/patient/dtos/create-family-member.dto";
import {FamilyMemberEntity} from "@/patient/dtos/family-member.entity";

export interface FamilyMemberRepository {
  create(accountId: number, familyMember: CreateFamilyMemberDto): Promise<void>;
  findOneByAccountId(accountId: number): Promise<FamilyMemberEntity[]>;
}
