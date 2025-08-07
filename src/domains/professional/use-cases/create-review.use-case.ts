import {SessionAdapter} from "@/auth/contracts/session.port";
import {ReviewRepository} from "@/professional/contracts/review.repository";
import {CreateReviewDto} from "@/professional/dtos/create-review.dto";

export class CreateReviewUseCase {
  constructor(
    private repository: ReviewRepository,
    private sessionAdapter: SessionAdapter,
  ) {}

  async execute(dto: CreateReviewDto) {
    await this.sessionAdapter.verifySession();

    await this.repository.create(dto.rating, dto.comment, dto.appointmentId);
  }
}
