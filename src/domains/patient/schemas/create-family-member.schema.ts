import z from "zod";

export const CreateFamilyMemberSchema = z.object({
  name: z.string().min(2, {message: "Name must be at least 2 characters long."}).trim(),
  surname: z.string().min(2, {message: "Name must be at least 2 characters long."}).trim(),
  identificationNumber: z.string().min(1, {message: "Please enter a valid ID."}),
  age: z.number().min(0, {message: "Age must be a positive number."}),
});
