import { UseFormRegisterReturn } from "react-hook-form";
import { ChangeEvent } from "react";

export interface FieldProps {
  type?: string;
  placeholder: string;
  label: string;
  id: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
  textarea?: boolean;
  className?: string;
  error?: string;
  max?: string | number | undefined;
  maxLength?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  defaultValue?: string | number | readonly string[] | undefined;
}

export const Field = ({
  type = "text",
  placeholder,
  id,
  label,
  register,
  disabled,
  textarea,
  className,
  max,
  maxLength,
  onChange,
  required,
  defaultValue,
  error,
}: FieldProps) => {
  return (
    <>
      {label && (
        <label htmlFor="" className="text-inputLabel mb-3">
          {label}
        </label>
      )}

      {textarea ? (
        <textarea
          placeholder={placeholder}
          id={id}
          name={id}
          aria-label={placeholder}
          {...register}
          disabled={disabled}
          className={`mb-8 ${className} ${!disabled && "shadow-webkit"}`}
        />
      ) : (
        <input
          type={type}
          placeholder={placeholder}
          id={id}
          name={id}
          aria-label={placeholder}
          {...register}
          disabled={disabled}
          className={`mb-8 ${className} ${!disabled && "shadow-webkit"} ${
            id.includes("address") && "w-full"
          } ${type === "date" && "date-input--has-value"}`}
          required={required}
          defaultValue={defaultValue}
          onChange={onChange}
          max={max}
          maxLength={maxLength}
        />
      )}
      {error && <small className="error">{error}</small>}
    </>
  );
};
