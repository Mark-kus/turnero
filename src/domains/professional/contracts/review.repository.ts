import {Rating} from "@/shared/types/patient";

export interface ReviewRepository {
  create(rating: Rating, comment: string | null, appointmentId: number): Promise<void>;
}
