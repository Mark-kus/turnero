import {ProfessionalResultDto} from "@/professional/dtos/professional-result.dto";
import {ProfessionalFilters} from "@/shared/types/professional";
import {DateOnly} from "@/shared/types/common";

export interface ProfessionalReadModel {
  getAllProfessionalsWithProfile(filters: ProfessionalFilters): Promise<ProfessionalResultDto[]>;
  getProfessionalAvailability(
    professionalId: number,
    date: DateOnly,
    appointment_id?: number,
  ): Promise<Record<string, string[]>>;
}
