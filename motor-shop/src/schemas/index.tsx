import { DeepPartial } from "react-hook-form";
import { z } from "zod";

export const userSchema = z.object({
  id: z.string(),
  created_at: z.string().or(z.string().datetime()),
  name: z.string(),
  email: z.string().email(),
  cpf: z.string(),
  phone: z.string(),
  date_of_birth: z.string(),
  description: z.string(),
  address: z.string(),
  seller: z.boolean(),
});

export type UserType = z.infer<typeof userSchema>;

export type UpdateUser = DeepPartial<UserType>;
