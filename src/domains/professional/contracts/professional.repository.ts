import {ProfessionalResultDto} from "@/professional/dtos/professional-result.dto";
import {ProfessionalFilters} from "@/shared/types/professional";

export interface ProfessionalRepository {
  findAllProfessionals(filters: ProfessionalFilters): Promise<ProfessionalResultDto[]>;
}
