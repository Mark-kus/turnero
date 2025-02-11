import { sql } from "@vercel/postgres";
import { cache } from "react";

import {
  Additional,
  AvailableSlot,
  BookedAppointment,
  ISODate,
  ListedProfessional,
  Patient,
  ProfessionalAvailability,
  ProfessionalsFilters,
} from "@/app/types";

import { verifySession } from "@/app/lib/session";
import {
  bookedAppointmentDTO,
  listedProfessionalDTO,
  accountDTO,
  patientDTO,
  additionalDTO,
} from "@/app/lib/dto";
import { getDateByISODate } from "./utils";

export const fetchAccount = async () => {
  // Verify the session
  const session = await verifySession();

  try {
    // Fetch the account
    const data = await sql`
      SELECT 
          account_id,
          first_name,
          last_name,
          TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate,
          email,
          avatar_url,
          city,
          address,
          phone
      FROM accounts WHERE accounts.account_id = ${session.userId}
    `;
    const filteredAccount = accountDTO(data.rows[0]);

    // Filter user data
    return filteredAccount;
  } catch (error) {
    console.error("Database Error: Failed to Fetch Accounts.", error);
    throw new Error("Database Error: Failed to Fetch Accounts.");
  }
};

export const fetchProfessionals = cache(
  async (filters: ProfessionalsFilters): Promise<ListedProfessional[]> => {
    // Verify the session
    const session = await verifySession();

    const { insurance, specialty, name } = filters;

    try {
      const data = await sql`
        SELECT 
            professionals.professional_id,
            first_name,
            last_name,
            TO_CHAR(birthdate, 'YYYY-MM-DD') AS birthdate,
            accounts.avatar_url,
            establishments.street AS location,
            STRING_AGG(DISTINCT CAST(availabilities.day_of_week AS VARCHAR), ', ') AS days_of_week,
            STRING_AGG(DISTINCT health_insurances.name, ', ') AS insurances,
            STRING_AGG(DISTINCT specialties.name, ', ') AS specialties
        FROM professionals
        JOIN accounts ON professionals.account_id = accounts.account_id
        JOIN health_insurances_accounts ON accounts.account_id = health_insurances_accounts.account_id
        JOIN health_insurances ON health_insurances_accounts.insurance_id = health_insurances.insurance_id
        JOIN specialties_professionals ON professionals.professional_id = specialties_professionals.professional_id
        JOIN specialties ON specialties_professionals.specialty_id = specialties.specialty_id
        JOIN establishments ON professionals.establishment_id = establishments.establishment_id
        JOIN availabilities ON professionals.professional_id = availabilities.professional_id
        WHERE professionals.professional_id IN (
            SELECT professionals.professional_id
            FROM professionals
            JOIN accounts ON professionals.account_id = accounts.account_id
            JOIN health_insurances_accounts ON accounts.account_id = health_insurances_accounts.account_id
            JOIN health_insurances ON health_insurances_accounts.insurance_id = health_insurances.insurance_id
            WHERE health_insurances.name ILIKE ${"%" + insurance + "%"}
        )
        AND specialties.name ILIKE ${"%" + specialty + "%"}
        AND (first_name || ' ' || last_name) ILIKE ${"%" + name + "%"}
        GROUP BY professionals.professional_id, first_name, last_name, birthdate, establishments.street, accounts.avatar_url;
    `;
      const professionals = data.rows.map(listedProfessionalDTO);
      return professionals;
    } catch (error) {
      console.error("Database Error: Failed to Fetch Professionals.", error);
      throw new Error("Database Error: Failed to Fetch Professionals.");
    }
  },
);

export async function fetchBookedAppointments(): Promise<{
  comingAppointments: BookedAppointment[];
  dueAppointments: BookedAppointment[];
}> {
  // Verify the session
  const session = await verifySession();

  try {
    const appoinments = await sql`
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
      additionals.name AS additional_name,
      additionals.surname AS additional_surname,
      establishments.street AS location,
      reviews.rating
    FROM appointments
    JOIN accounts AS professional_accounts ON appointments.professional_id = professional_accounts.account_id
    JOIN accounts AS patient_accounts ON appointments.account_id = patient_accounts.account_id
    LEFT JOIN additionals ON appointments.additional_id = additionals.additional_id
    LEFT JOIN reviews ON appointments.appointment_id = reviews.appointment_id
    JOIN professionals ON appointments.professional_id = professionals.professional_id
    JOIN establishments ON professionals.establishment_id = establishments.establishment_id
    WHERE appointments.account_id = ${session.userId}
    ORDER BY appointments.scheduled_time ASC;
      `;
    const appoinmentsDTO = appoinments.rows.map(bookedAppointmentDTO);

    const indexOfDue = appoinmentsDTO.findIndex((appointment) => {
      return appointment.scheduledTime > new Date();
    });

    return {
      dueAppointments:
        indexOfDue > -1 ? appoinmentsDTO.slice(0, indexOfDue) : appoinmentsDTO,
      comingAppointments:
        indexOfDue > -1 ? appoinmentsDTO.slice(indexOfDue) : [],
    };
  } catch (error) {
    console.error(
      "Database Error: Failed to Fetch Booked Appointments.",
      error,
    );
    throw new Error("Database Error: Failed to Fetch Booked Appointments.");
  }
}

const calculateSlots = (availability: ProfessionalAvailability) => {
  const convertTimeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };
  const giveFormat = (time: number) => time.toString().padStart(2, "0");

  const slotDurationSeconds = availability.slot_duration * 60;
  const startTime = convertTimeToSeconds(availability.start_time);
  const endTime = convertTimeToSeconds(availability.end_time);

  const slotCount = Math.floor((endTime - startTime) / slotDurationSeconds);

  const slots = [];
  for (let i = 0; i < slotCount; i++) {
    const currentTime = startTime + i * slotDurationSeconds;

    const hours = Math.floor(currentTime / 3600);
    const minutes = Math.floor((currentTime % 3600) / 60);

    const formattedTime = `${giveFormat(hours)}:${giveFormat(minutes)}`;
    slots.push(formattedTime);
  }
  return slots as AvailableSlot[];
};

export const fetchAvailableSlots = async (
  professionalId: number,
  date: ISODate,
): Promise<{
  morningSlots: AvailableSlot[];
  afternoonSlots: AvailableSlot[];
}> => {
  // Verify the session
  const session = await verifySession();
  const dateObj = getDateByISODate(date);

  try {
    const availabilities = await sql`
    SELECT 
      availabilities.slot_duration,
      time_slots.start_time,
      time_slots.end_time
    FROM availabilities
    JOIN time_slots ON availabilities.availability_id = time_slots.availability_id
    WHERE professional_id = ${professionalId} 
    AND availabilities.day_of_week = ${dateObj.getDay()}
    AND (
      DATE(availabilities.updated_at) + INTERVAL '1 month' * availabilities.recurrence_period >= ${date}
    )
    `;

    if (availabilities.rows.length === 0) {
      return {
        morningSlots: [],
        afternoonSlots: [],
      };
    }

    const appointments = await sql`
    SELECT TO_CHAR(scheduled_time, 'HH24:MI') as scheduled_time
    FROM appointments
    WHERE professional_id = ${professionalId}
    AND scheduled_time::date = ${date}
    AND status IN (1, 2)
  `;
    const bookedSlots = appointments.rows.map(
      (appointment) => appointment.scheduled_time,
    );

    const slots = availabilities.rows
      .map((availabilities) =>
        calculateSlots(availabilities as ProfessionalAvailability),
      )
      .flat()
      .filter((slot) => !bookedSlots.includes(slot));
    const afternoonIndex = slots.findIndex((slot) => slot >= "12:00");

    const morningSlots =
      afternoonIndex > -1 ? slots.slice(0, afternoonIndex) : slots;
    const afternoonSlots =
      afternoonIndex > -1 ? slots.slice(afternoonIndex) : [];

    return {
      morningSlots,
      afternoonSlots,
    };
  } catch (error) {
    console.error("Database Error: Failed to Fetch Availabilities.", error);
    throw new Error("Database Error: Failed to Fetch Availabilities.");
  }
};

export const fetchPremakeAppointment = async (
  professionalId: number,
  additionalId?: number,
): Promise<{
  professional: ListedProfessional;
  patient: Patient;
  additional: Additional | null;
}> => {
  // Verify the session
  const session = await verifySession();

  try {
    const professionalAccounts = await sql`
        SELECT 
            professionals.professional_id,
            first_name,
            last_name,
            TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate,
            accounts.avatar_url,
            establishments.street AS location,
            STRING_AGG(DISTINCT CAST(availabilities.day_of_week AS VARCHAR), ', ') AS days_of_week,
            STRING_AGG(DISTINCT health_insurances.name, ', ') AS insurances,
            STRING_AGG(DISTINCT specialties.name, ', ') AS specialties,
            STRING_AGG(DISTINCT CAST(availabilities.day_of_week AS VARCHAR), ', ') AS days_of_week
        FROM professionals
        JOIN accounts ON professionals.account_id = accounts.account_id
        JOIN health_insurances_accounts ON accounts.account_id = health_insurances_accounts.account_id
        JOIN health_insurances ON health_insurances_accounts.insurance_id = health_insurances.insurance_id
        JOIN specialties_professionals ON professionals.professional_id = specialties_professionals.professional_id
        JOIN specialties ON specialties_professionals.specialty_id = specialties.specialty_id
        JOIN establishments ON professionals.establishment_id = establishments.establishment_id
        JOIN availabilities ON professionals.professional_id = availabilities.professional_id
        WHERE professionals.professional_id = ${professionalId}
        GROUP BY professionals.professional_id, first_name, last_name, birthdate, establishments.street, accounts.avatar_url;
  `;

    const patientAccounts = await sql`
        SELECT
            accounts.account_id,
            first_name,
            last_name,
            email,
            TO_CHAR(birthdate, 'YYYY-MM-DD') as birthdate,
            avatar_url,
            identification_number,
            phone,
            COALESCE(STRING_AGG(DISTINCT health_insurances.name, ', '), '') AS insurances
        FROM accounts
        LEFT JOIN health_insurances_accounts ON accounts.account_id = health_insurances_accounts.account_id
        LEFT JOIN health_insurances ON health_insurances_accounts.insurance_id = health_insurances.insurance_id
        WHERE accounts.account_id = ${session.userId}
        GROUP BY accounts.account_id;
  `;

    let adittionalAccounts;
    if (additionalId) {
      adittionalAccounts = await sql`
      SELECT 
        additional_id,
        name,
        surname,
        age,
        identification_number
      FROM additionals
      WHERE additional_id = ${additionalId};
    `;
    }

    const professional = listedProfessionalDTO(professionalAccounts.rows[0]);
    const patient = patientDTO(patientAccounts.rows[0]);
    const additional = adittionalAccounts
      ? additionalDTO(adittionalAccounts.rows[0])
      : null;

    return {
      professional,
      patient,
      additional,
    };
  } catch (error) {
    console.error(
      "Database Error: Failed to Fetch Premake Appointment.",
      error,
    );
    throw new Error("Database Error: Failed to Fetch Premake Appointment.");
  }
};
