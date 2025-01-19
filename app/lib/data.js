import { sql } from "@vercel/postgres";

export async function fetchAccounts() {
  try {
    const data = await sql`
      SELECT * FROM accounts
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error: Failed to Fetch Accounts.", error);
    throw new Error("Database Error: Failed to Fetch Accounts.");
  }
}

export async function fetchProfessionals() {
  try {
    return [];
    const data = await sql`
      SELECT * FROM professionals
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error: Failed to Fetch Professionals.", error);
    throw new Error("Database Error: Failed to Fetch Professionals.");
  }
}

export async function fetchInsurances() {
  try {
    return [];
    const data = await sql`
      SELECT * FROM insurances
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error: Failed to Fetch Insurances.", error);
    throw new Error("Database Error: Failed to Fetch Insurances.");
  }
}

export async function fetchSpecialties() {
  try {
    return [];
    const data = await sql`
      SELECT * FROM specialties
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error: Failed to Fetch Specialties.", error);
    throw new Error("Database Error: Failed to Fetch Specialties.");
  }
}
