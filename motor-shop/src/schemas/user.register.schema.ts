import { DeepPartial } from 'react-hook-form';
import { z } from 'zod';

export const addressSchema = z.object({
  cep: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(/\d{5}-\d{3}/, 'CEP deve obedecer o formato 00000-000'),
  complement: z.string().optional().default(''),
  city: z.string(),
  street: z.string(),
  state: z.string(),
  number: z.string().nonempty('Campo obrigatório'),
});

export const addressResponseSchema = addressSchema.extend({
  id: z.string(),
  user_id: z.string(),
});

export const userSchema = z.object({
  name: z
    .string()
    .nonempty('Campo obrigatório')
    .min(8, 'Nome deve ter no mínimo 8 caracteres')
    .regex(
      /^[a-zA-Z]+(([\'\,\.\- ][a-zA-Z ])?[a-zA-Z]*)*$/,
      'Caracteres especiais não são permitidos'
    ),
  email: z
    .string()
    .nonempty('Campo obrigatório')
    .email('Email inválido'),
  password: z
    .string()
    .nonempty('Senha obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  cpf: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(
      /^(([0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2})|([0-9]{11}))$/,
      'CPF deve obedecer o formato 000.000.000-00'
    ),
  phone: z
    .string()
    .nonempty('Campo obrigatório')
    .regex(
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\s?\d|[2-9])\d{3})\-?(\d{4}))$/,
      'Telefone deve obedecer o formato DD 90000-0000'
    ),
  date_of_birth: z.string().nonempty('Selecione uma data válida'),
  description: z
    .string()
    .nonempty('Fale um pouco sobre você!')
    .min(20, 'Fale um pouco mais sobre você!'),
  address: addressSchema,
  seller: z.boolean().default(false),
});

export const userUpdateSchema = userSchema
  .omit({ address: true, password: true })
  .partial();

export const userRegisterSchema = userSchema
  .extend({
    confirm: z
      .string()
      .nonempty('As senhas não correspondem')
      .min(8, 'Senha deve ter no mínimo 8 caracteres'),
  })
  .superRefine(({ confirm, password }, ctx) => {
    if (confirm !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export const userSendMailPassSchema = z.object({
  email: z
    .string()
    .nonempty('Campo obrigatório')
    .email('Email inválido'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .nonempty('Senha obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres'),
});

export type tUserRequest = z.infer<typeof userSchema>;

export type tUserUpdate = z.infer<typeof userUpdateSchema>;

export type tUserUpdateRequest = DeepPartial<tUserUpdate>;

export type tUserRegister = z.infer<typeof userRegisterSchema>;

export type tUserSendMail = z.infer<typeof userSendMailPassSchema>;

export type tResetPassword = z.infer<typeof resetPasswordSchema>;

export type tAddress = z.infer<typeof addressSchema>;

export type tAddressResponse = z.infer<typeof addressResponseSchema>;
