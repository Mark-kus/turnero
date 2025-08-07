import {SessionAdapter} from "@/auth/contracts/session.port";
import {AppointmentRepository} from "@/professional/contracts/appointment.repository";
import {RescheduleAppointmentDto} from "@/professional/dtos/reschedule-appointment.dto";

export class RescheduleAppointmentUseCase {
  constructor(
    private repository: AppointmentRepository,
    private sessionAdapter: SessionAdapter,
  ) {}

  async execute(dto: RescheduleAppointmentDto) {
    await this.sessionAdapter.verifySession();

    await this.repository.updateSchedule(dto.appointmentId, dto.scheduledTime);
  }
}
