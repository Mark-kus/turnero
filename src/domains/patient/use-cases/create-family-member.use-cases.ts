import {SessionAdapter} from "@/auth/contracts/session.port";
import {FamilyMemberRepository} from "@/patient/contracts/family-member.repository";
import {CreateFamilyMemberDto} from "@/patient/dtos/create-family-member.dto";
import {FamilyMemberDto, toFamilyMemberDto} from "@/professional/dtos/family-member.dto";

export class CreateFamilyMemberUseCase {
  constructor(
    private repository: FamilyMemberRepository,
    private sessionAdapter: SessionAdapter,
  ) {}

  async execute(familyMember: CreateFamilyMemberDto): Promise<FamilyMemberDto> {
    const {accountId} = await this.sessionAdapter.verifySession();
    const parsedAccountId = Number(accountId);

    await this.repository.create(parsedAccountId, familyMember);

    const familyMembers = await this.repository.findOneByAccountId(parsedAccountId);

    // Take the last created family member
    return toFamilyMemberDto(familyMembers[0]);
  }
}
