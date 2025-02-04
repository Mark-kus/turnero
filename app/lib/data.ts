import { sql } from "@vercel/postgres";
import { cache } from "react";

import {
  BookedAppointment,
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
  availabilitiesDTO,
  patientDTO,
} from "@/app/lib/dto";

export const fetchAccount = async () => {
  // Verify the session
  const session = await verifySession();

  try {
    // Fetch the account
    const data = await sql`
      SELECT * FROM accounts WHERE accounts.account_id = ${session.userId}
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
            birthdate,
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
    const comingAppointments = await sql`
    SELECT 
      appointments.appointment_id,
      appointments.date,
      appointments.time,
      appointments.status,
      professional_accounts.first_name AS professional_first_name,
      professional_accounts.last_name AS professional_last_name,
      patient_accounts.first_name AS patient_first_name,
      patient_accounts.last_name AS patient_last_name,
      patient_accounts.avatar_url AS patient_avatar_url,
      additionals.first_name AS additional_first_name,
      additionals.last_name AS additional_last_name,
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
    AND appointments.date >= CURRENT_DATE
    AND appointments.time >= CURRENT_TIME
    ORDER BY appointments.date ASC, appointments.time ASC
      `;
    const comingAppointmentsDTO =
      comingAppointments.rows.map(bookedAppointmentDTO);

    const dueAppointments = await sql`
    SELECT 
      appointments.appointment_id,
      appointments.date,
      appointments.time,
      appointments.status,
      professional_accounts.first_name AS professional_first_name,
      professional_accounts.last_name AS professional_last_name,
      patient_accounts.first_name AS patient_first_name,
      patient_accounts.last_name AS patient_last_name,
      additionals.first_name AS additional_first_name,
      additionals.last_name AS additional_last_name,
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
    AND appointments.date <= CURRENT_DATE
    AND appointments.time <= CURRENT_TIME
    ORDER BY appointments.date ASC, appointments.time ASC
      `;
    const dueAppointmentsDTO = dueAppointments.rows.map(bookedAppointmentDTO);

    return {
      comingAppointments: comingAppointmentsDTO,
      dueAppointments: dueAppointmentsDTO,
    };
  } catch (error) {
    console.error(
      "Database Error: Failed to Fetch Booked Appointments.",
      error,
    );
    throw new Error("Database Error: Failed to Fetch Booked Appointments.");
  }
}
export const fetchAvailabilities = async (
  professionalId: number,
  date: Date,
): Promise<{
  morningAvailabilities: ProfessionalAvailability[];
  afternoonAvailabilities: ProfessionalAvailability[];
}> => {
  // Verify the session
  const session = await verifySession();

  try {
    const availabilities = await sql`
    SELECT * FROM availabilities
     JOIN time_slots ON availabilities.availability_id = time_slots.availability_id
    WHERE professional_id = ${professionalId} 
    AND availabilities.day_of_week = ${new Date(date).getDay()}
  `;

    const morningAvailabilitiesDTO = availabilities.rows
      .filter((availability) => {
        const startTime = new Date(
          `1970-01-01T${availability.start_time}Z`,
        ).getUTCHours();
        return startTime < 12;
      })
      .map(availabilitiesDTO);

    const afternoonAvailabilitiesDTO = availabilities.rows
      .filter((availability) => {
        const startTime = new Date(
          `1970-01-01T${availability.start_time}Z`,
        ).getUTCHours();
        return startTime >= 12;
      })
      .map(availabilitiesDTO);

    return {
      morningAvailabilities: morningAvailabilitiesDTO,
      afternoonAvailabilities: afternoonAvailabilitiesDTO,
    };
  } catch (error) {
    console.error("Database Error: Failed to Fetch Availabilities.", error);
    throw new Error("Database Error: Failed to Fetch Availabilities.");
  }
};

export const fetchPremakeAppointment = async (
  professionalId: number,
): Promise<{
  professional: ListedProfessional;
  patient: Patient;
}> => {
  // Verify the session
  const session = await verifySession();

  try {
    const professionalAccounts = await sql`
        SELECT 
            professionals.professional_id,
            first_name,
            last_name,
            birthdate,
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
            birthdate,
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

    const professional = listedProfessionalDTO(professionalAccounts.rows[0]);
    const patient = patientDTO(patientAccounts.rows[0]);

    return {
      professional,
      patient,
    };
  } catch (error) {
    console.error(
      "Database Error: Failed to Fetch Premake Appointment.",
      error,
    );
    throw new Error("Database Error: Failed to Fetch Premake Appointment.");
  }
};
