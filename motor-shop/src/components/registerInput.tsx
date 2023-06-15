import { tUserRegister } from '@/schemas/user.register.schema';
import { ChangeEvent } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface iProps {
  label?: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<tUserRegister>;
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

export const RegisterInput = ({
  label,
  type,
  placeholder,
  register,
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
        } ${type == 'date' ? 'date-input--has-value' : ''}`}
        {...register(db_field)}
        max={max}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled ? disabled : false}
        autoComplete={db_field}
      />
    </>
  );
};
