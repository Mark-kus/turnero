import {sql} from "@vercel/postgres";

import {ProfessionalReadModel} from "@/professional/contracts/professional.readmodel";
import {
  ProfessionalResultDto,
  toProfessionalResultDto,
} from "@/professional/dtos/professional-result.dto";
import {ProfessionalFilters} from "@/shared/types/professional";
import {DateOnly} from "@/shared/types/common";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";
import {DateUtils} from "@/shared/utils/DateUtils";
import {AvailabilityRaw} from "@/professional/dtos/availability.dto";

const {getFullDateByDateOnly} = DateUtils;

export interface ProfessionalResultRaw {
  professional_id: number;
  first_name: string;
  last_name: string;
  birthdate: string;
  avatar_url: string;
  location: string;
  days_of_week: string;
  insurances: string;
  specialties: string;
}

export class VercelProfessionalReadModel implements ProfessionalReadModel {
  async getAllProfessionalsWithProfile(
    filters: ProfessionalFilters,
  ): Promise<ProfessionalResultDto[]> {
    const {insurance, specialty, name} = filters;

    const {rows} = await sql`
        SELECT 
            professionals.professional_id,
            first_name,
            last_name,
            TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate,
            accounts.avatar_url,
            providers.street AS location,
            STRING_AGG(DISTINCT CAST(availabilities.day_of_week AS VARCHAR), ', ') AS days_of_week,
            STRING_AGG(DISTINCT insurances.name, ', ') AS insurances,
            STRING_AGG(DISTINCT specialties.name, ', ') AS specialties
        FROM professionals
            JOIN accounts ON professionals.account_id = accounts.account_id
            JOIN account_insurance ON accounts.account_id = account_insurance.account_id
            JOIN insurances ON account_insurance.insurance_id = insurances.insurance_id
            JOIN professional_specialty ON professionals.professional_id = professional_specialty.professional_id
            JOIN specialties ON professional_specialty.specialty_id = specialties.specialty_id
            JOIN providers ON professionals.provider_id = providers.provider_id
            JOIN availabilities ON professionals.professional_id = availabilities.professional_id
        WHERE professionals.professional_id
          IN (
              SELECT professionals.professional_id
              FROM professionals
                  JOIN accounts ON professionals.account_id = accounts.account_id
                  JOIN account_insurance ON accounts.account_id = account_insurance.account_id
                  JOIN insurances ON account_insurance.insurance_id = insurances.insurance_id
              WHERE insurances.name ILIKE ${"%" + insurance + "%"}
          )
          AND specialties.name ILIKE ${"%" + specialty + "%"}
          AND (first_name || ' ' || last_name) ILIKE ${"%" + name + "%"}
        GROUP BY professionals.professional_id, first_name, last_name, birthdate, providers.street, accounts.avatar_url;
        `;

    return rows.map((row) => toProfessionalResultDto(row as ProfessionalResultRaw));
  }

  async getProfessionalAvailability(
    professionalId: number,
    dateOnly: DateOnly,
    appointment_id: number = -1,
  ) {
    const sessionAdapter = new JoseSessionAdapter();

    await sessionAdapter.verifySession();

    const fullDate = getFullDateByDateOnly(dateOnly);

    try {
      const availabilities = await sql`
          SELECT 
              availabilities.slot_duration,
              TO_CHAR(start_time, 'HH24:MI:SS') as start_time,
              TO_CHAR(end_time, 'HH24:MI:SS') as end_time
          FROM availabilities
              JOIN time_slots ON availabilities.availability_id = time_slots.availability_id
          WHERE
              professional_id = ${professionalId} 
              AND availabilities.day_of_week = ${fullDate.getDay()}
              AND (
                DATE(availabilities.updated_at) + INTERVAL '1 month' * availabilities.recurrence_period >= ${dateOnly}
              )
    `;

      if (availabilities.rows.length === 0) {
        return {
          morningSlots: [],
          afternoonSlots: [],
        };
      }

      const appointments = await sql`
        SELECT
            TO_CHAR(scheduled_time, 'HH24:MI') as scheduled_time
        FROM appointments
        WHERE
            professional_id = ${professionalId}
            AND scheduled_time::date = ${dateOnly}
            AND status IN (1, 2)
            AND appointment_id != ${appointment_id}
      `;

      const bookedSlots = appointments.rows.map((appointment) => appointment.scheduled_time);

      const slots = availabilities.rows
        .map((availabilities) => calculateSlots(availabilities as AvailabilityRaw))
        .flat()
        .filter((slot) => !bookedSlots.includes(slot));
      const afternoonIndex = slots.findIndex((slot) => slot >= "12:00");

      const morningSlots = afternoonIndex > -1 ? slots.slice(0, afternoonIndex) : slots;
      const afternoonSlots = afternoonIndex > -1 ? slots.slice(afternoonIndex) : [];

      return {
        morningSlots,
        afternoonSlots,
      };
    } catch (error) {
      console.error("Database Error: Failed to Fetch Availabilities.", error);
      throw new Error("Database Error: Failed to Fetch Availabilities.");
    }
  }
}

const calculateSlots = (availability: AvailabilityRaw) => {
  const convertTimeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);

    return hours * 3600 + minutes * 60 + seconds;
  };
  const giveFormat = (time: number) => time.toString().padStart(2, "0");

  const slotDurationSeconds = availability.slot_duration * 60;
  const startTime = convertTimeToSeconds(availability.start_time);
  const endTime = convertTimeToSeconds(availability.end_time);

  const slotCount = Math.floor((endTime - startTime) / slotDurationSeconds);

  const actualTime = new Date().toISOString().slice(11, 16);
  const slots = [];

  for (let i = 0; i < slotCount; i++) {
    const currentTime = startTime + i * slotDurationSeconds;

    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);

    const formattedTime = `${giveFormat(hours)}:${giveFormat(minutes)}`;

    if (formattedTime < actualTime) {
      continue; // Skip past slots
    }

    slots.push(formattedTime);
  }

  return slots;
};
