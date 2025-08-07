import {sql} from "@vercel/postgres";

import {ReviewRepository} from "@/professional/contracts/review.repository";
import {Rating} from "@/shared/types/patient";

export class VercelReviewRepository implements ReviewRepository {
  async create(rating: Rating, comment: string | null, appointmentId: number): Promise<void> {
    await sql`
    INSERT INTO reviews (rating, comment, appointment_id)
    VALUES (${rating}, ${comment}, ${appointmentId})
  `;
  }
}
