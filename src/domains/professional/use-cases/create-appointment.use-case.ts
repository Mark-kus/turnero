import {SessionAdapter} from "@/auth/contracts/session.port";
import {AppointmentRepository} from "@/professional/contracts/appointment.repository";
import {CreateAppointmentDto} from "@/professional/dtos/create-appoinment.dto";

export class CreateAppointmentUseCase {
  constructor(
    private repository: AppointmentRepository,
    private sessionAdapter: SessionAdapter,
  ) {}

  async execute(dto: CreateAppointmentDto) {
    await this.sessionAdapter.verifySession();

    await this.repository.create(
      dto.scheduledTime,
      dto.accountId,
      dto.professionalId,
      dto.familyMemberId,
    );
  }
}
