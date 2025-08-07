import z from "zod";

export const ProfessionalFiltersSchema = z.object({
  specialty: z.string().optional(),
  name: z
    .string()
    .regex(/^[a-zA-Z\s]*$/, "Name must contain only letters and spaces")
    .optional(),
  insurance: z.string().optional(),
});
