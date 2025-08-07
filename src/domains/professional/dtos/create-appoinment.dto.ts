export interface CreateAppointmentDto {
  scheduledTime: Date;
  accountId: number;
  professionalId: number;
  familyMemberId: number | null;
}
