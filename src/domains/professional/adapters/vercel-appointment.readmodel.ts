import {sql} from "@vercel/postgres";

import {AppointmentReadModel} from "@/professional/contracts/appointment.readmodel";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {PatientRaw, toPatientDto} from "@/professional/dtos/patient.dto";
import {FamilyMemberRaw, toFamilyMemberDto} from "@/professional/dtos/family-member.dto";
import {toProfessionalResultDto} from "@/professional/dtos/professional-result.dto";
import {ProfessionalResultRaw} from "@/professional/adapters/vercel-professional.readmodel";
import {
  BookedAppointmentDto,
  BookedAppointmentRaw,
  toBookedAppoinmentDto,
} from "@/professional/dtos/booked-appointment.dto";

export class VercelAppointmentReadModel implements AppointmentReadModel {
  async getPremakeAppointment(professionalId: number, familyMemberId?: number) {
    const sessionAdapter = new JoseSessionAdapter();
    const session = await sessionAdapter.verifySession();

    try {
      const professionalAccount = await sql`
        SELECT 
            professionals.professional_id,
            first_name,
            last_name,
            TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate,
            accounts.avatar_url,
            providers.street AS location,
            STRING_AGG(DISTINCT CAST(availabilities.day_of_week AS VARCHAR), ', ') AS days_of_week,
            STRING_AGG(DISTINCT insurances.name, ', ') AS insurances,
            STRING_AGG(DISTINCT specialties.name, ', ') AS specialties,
            STRING_AGG(DISTINCT CAST(availabilities.day_of_week AS VARCHAR), ', ') AS days_of_week
        FROM professionals
            JOIN accounts ON professionals.account_id = accounts.account_id
            JOIN account_insurance ON accounts.account_id = account_insurance.account_id
            JOIN insurances ON account_insurance.insurance_id = insurances.insurance_id
            JOIN professional_specialty ON professionals.professional_id = professional_specialty.professional_id
            JOIN specialties ON professional_specialty.specialty_id = specialties.specialty_id
            JOIN providers ON professionals.provider_id = providers.provider_id
            JOIN availabilities ON professionals.professional_id = availabilities.professional_id
        WHERE
            professionals.professional_id = ${professionalId}
        GROUP BY
            professionals.professional_id, first_name, last_name, birthdate, providers.street, accounts.avatar_url;
  `;

      const patientAccount = await sql`
        SELECT
            accounts.account_id,
            first_name,
            last_name,
            email,
            TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate,
            avatar_url,
            identification_number,
            phone,
            COALESCE(STRING_AGG(DISTINCT insurances.name, ', '), '') AS insurances
        FROM accounts
        LEFT JOIN account_insurance ON accounts.account_id = account_insurance.account_id
        LEFT JOIN insurances ON account_insurance.insurance_id = insurances.insurance_id
        WHERE accounts.account_id = ${session.accountId}
        GROUP BY accounts.account_id;
  `;

      let familyMemberAccount;

      if (familyMemberId) {
        familyMemberAccount = await sql`
      SELECT 
        family_member_id,
        name,
        surname,
        age,
        identification_number
      FROM family_members
      WHERE family_member_id = ${familyMemberId};
    `;
      }

      const professional = toProfessionalResultDto(
        professionalAccount.rows[0] as ProfessionalResultRaw,
      );
      const patient = toPatientDto(patientAccount.rows[0] as PatientRaw);
      const familyMember = familyMemberAccount
        ? toFamilyMemberDto(familyMemberAccount.rows[0] as FamilyMemberRaw)
        : null;

      return {
        professional,
        patient,
        familyMember,
      };
    } catch (error) {
      console.error("Database Error: Failed to Fetch Premake Appointment.", error);
      throw new Error("Database Error: Failed to Fetch Premake Appointment.");
    }
  }

  async getBookedAppointments(): Promise<{
    comingAppointments: BookedAppointmentDto[];
    dueAppointments: BookedAppointmentDto[];
  }> {
    const sessionAdapter = new JoseSessionAdapter();
    const session = await sessionAdapter.verifySession();

    try {
      const bookedAppointmentsRaw = await sql`
      SELECT
        appointments.appointment_id,
        appointments.scheduled_time,
        appointments.status,
        appointments.professional_id,
        professional_accounts.first_name AS professional_first_name,
        professional_accounts.last_name AS professional_last_name,
        patient_accounts.first_name AS patient_first_name,
        patient_accounts.last_name AS patient_last_name,
        patient_accounts.avatar_url AS patient_avatar_url,
        family_members.family_member_id AS family_member_id,
        family_members.name AS family_member_name,
        family_members.surname AS family_member_surname,
        providers.street AS location,
        reviews.rating
      FROM appointments
      JOIN professionals ON appointments.professional_id = professionals.professional_id
      JOIN accounts AS professional_accounts ON professionals.account_id = professional_accounts.account_id
      JOIN accounts AS patient_accounts ON appointments.account_id = patient_accounts.account_id
      LEFT JOIN family_members ON appointments.family_member_id = family_members.family_member_id
      LEFT JOIN reviews ON appointments.appointment_id = reviews.appointment_id
      JOIN providers ON professionals.provider_id = providers.provider_id
      WHERE appointments.account_id = ${session.accountId}
      ORDER BY appointments.scheduled_time ASC;
        `;
      const appoinmentsDto = bookedAppointmentsRaw.rows.map((app) =>
        toBookedAppoinmentDto(app as BookedAppointmentRaw),
      );

      const indexOfDue = appoinmentsDto.findIndex((appointment) => {
        return appointment.scheduledTime > new Date();
      });

      return {
        dueAppointments: indexOfDue > -1 ? appoinmentsDto.slice(0, indexOfDue) : appoinmentsDto,
        comingAppointments: indexOfDue > -1 ? appoinmentsDto.slice(indexOfDue) : [],
      };
    } catch (error) {
      console.error("Database Error: Failed to Fetch Booked Appointments.", error);
      throw new Error("Database Error: Failed to Fetch Booked Appointments.");
    }
  }
}
