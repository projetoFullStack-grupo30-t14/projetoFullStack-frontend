import { TLogin } from '@/schemas/login.schema';
import {
  tResetPassword,
  tUserRegister,
  tUserSendMail,
  tUserUpdate,
} from '@/schemas/user.register.schema';
import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface iProps {
  label?: string;
  type: string;
  placeholder: string;
  register?: UseFormRegister<tUserRegister>;
  registerLogin?: UseFormRegister<TLogin>;
  registerSendMail?: UseFormRegister<tUserSendMail>;
  registerResetPassword?: UseFormRegister<tResetPassword>;
  registerUpdateUser?: UseFormRegister<tUserUpdate>;
  db_field?:
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
  db_field_update?:
    | 'name'
    | 'email'
    | 'cpf'
    | 'phone'
    | 'date_of_birth'
    | 'description';
  max?: string | number | undefined;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
  className?: string;
}

export const UserInput = ({
  label,
  type,
  placeholder,
  register,
  registerLogin,
  registerUpdateUser,
  db_field,
  db_field_update,
  max,
  maxLength,
  onChange,
  disabled,
  required,
  defaultValue,
  className
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
        } ${className}`}
        {...(db_field && register && { ...register(db_field) })}
        // {...register?.(db_field? db_field : 'cpf')}
        {...(db_field_update &&
          registerUpdateUser && {
            ...registerUpdateUser(db_field_update),
          })}
        // {...registerUpdateUser?.(
        //   db_field_update ? db_field_update : 'cpf'
        // )}
        {...registerLogin?.(
          type === 'password' ? 'password' : 'email'
        )}
        max={max}
        maxLength={maxLength}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled ? disabled : false}
        required={required ? required : false}
      />
    </>
  );
};
