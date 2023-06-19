import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email Inválido").nonempty('Campo obrigatório'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres').nonempty('Campo obrigatório'),
});

export type TLogin = z.infer<typeof loginSchema>;
