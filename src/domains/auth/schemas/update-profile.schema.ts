import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

function formatBytes(bytes: number): string {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${Math.round(size)}${units[unitIndex]}`;
}

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(2, {message: "Name must be at least 2 characters long."}).trim(),
  lastName: z.string().min(2, {message: "Name must be at least 2 characters long."}).trim(),
  email: z.string().email({message: "Please enter a valid email."}).trim(),
  birthdate: z.string(),
  city: z.string().trim().optional(),
  address: z.string().trim().optional(),
  phone: z.string().trim().optional(),
  avatar: z
    .instanceof(File, {message: "Please select an image file."})
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `The image is too large. Please choose an image smaller than ${formatBytes(MAX_FILE_SIZE)}.`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Please upload a valid image file (JPEG, PNG).",
    })
    .optional(),
});
