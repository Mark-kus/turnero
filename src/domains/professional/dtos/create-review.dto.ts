import {Rating} from "@/shared/types/patient";

export interface CreateReviewDto {
  rating: Rating;
  comment: string | null;
  appointmentId: number;
}
