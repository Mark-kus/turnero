import {SessionAdapter} from "@/auth/contracts/session.port";
import {AppointmentRepository} from "@/professional/contracts/appointment.repository";

export class CancelAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private sessionAdapter: SessionAdapter,
  ) {}

  async execute(appointmentId: number): Promise<void> {
    await this.sessionAdapter.verifySession();

    await this.appointmentRepository.updateStatus(appointmentId, 5);
  }
}
