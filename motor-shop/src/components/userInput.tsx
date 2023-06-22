import { TLogin } from '@/schemas/login.schema';
import { tUserRegister, tUserSendMail } from '@/schemas/user.register.schema';
import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface iProps {
  label?: string;
  type: string;
  placeholder: string;
  register?: UseFormRegister<tUserRegister>;
  registerLogin?: UseFormRegister<TLogin>;
  registerSendMail?: UseFormRegister<tUserSendMail>;
  db_field:
    | 'name'
    | 'email'
    | 'password'
    | 'cpf'
    | 'phone'
    | 'date_of_birth'
    | 'description'
    | 'confirm'
    | 'address.state'
    | 'address.street'
    | 'address.complement'
    | 'address.city'
    | 'address.cep'
    | 'address.number';
  max?: string | number | undefined;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export const UserInput = ({
  label,
  type,
  placeholder,
  register,
  registerLogin,
  db_field,
  max,
  maxLength,
  onChange,
  disabled,
}: iProps) => {
  return (
    <>
      {label && (
        <label htmlFor="" className="text-inputLabel mb-3">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        className={`mb-8 ${
          db_field?.includes('address') ? 'w-full' : ''
        } ${type == 'date' ? 'date-input--has-value' : ''} ${
          !disabled && 'shadow-webkit'
        }`}
        {...register?.(db_field)}
        {...registerLogin?.(
          type === 'password' ? 'password' : 'email'
        )}
        max={max}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled ? disabled : false}
        required={type === 'date' ? true : false}
      />
    </>
  );
};
