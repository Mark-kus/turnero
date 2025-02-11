"use server";

import { sql } from "@vercel/postgres";
import { verifySession } from "@/app/lib/session";
import { FormState } from "@/app/types";
import { FamilyMemberSchema } from "@/app/lib/definitions";

export async function createAdditional(formData: FormData): Promise<FormState> {
  const session = await verifySession();

  // Validate user
  const validationResult = FamilyMemberSchema.safeParse({
    name: formData.get("name"),
    surname: formData.get("surname"),
    age: formData.get("age"),
    identification_number: formData.get("identification_number"),
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { name, surname, age, identification_number } = validationResult.data;

  await sql`
        INSERT INTO additionals (name, surname, age, identification_number, account_id)
        VALUES (${name}, ${surname}, ${age}, ${identification_number}, ${session.userId})
      `;

  const results = await sql`
        SELECT additional_id
        FROM additionals
        WHERE account_id = ${session.userId}
        ORDER BY created_at DESC
        LIMIT 1
      `;
  const additional_id = results.rows[0].additional_id;

  return { success: { data: additional_id } };
}
