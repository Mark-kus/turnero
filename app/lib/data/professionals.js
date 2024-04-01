import { specialists } from "@/app/seeds";
import { sql } from "@vercel/postgres";

export async function fetchProfessionals(query) {
  try {
    const professionals = await sql`SELECT *
      FROM professionals
      `;
    // WHERE
    // (first_name ILIKE ${`${query.name}%`} OR
    //   last_name ILIKE ${`${query.name}%`})
    //   Agregar que coincida con insurance name y specialty name

    return professionals.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch professionals.");
  }
}
