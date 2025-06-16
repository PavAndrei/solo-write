import type { FC } from "react";
import type { IForm } from "../pages/SignInPage";
import type { UseFormRegister } from "react-hook-form";

interface ITextFieldProps {
  label: string;
  placeholder: string;
  name: "email" | "password";
  type: string;
  register: UseFormRegister<IForm>;
  error?: string;
}

export const TextField: FC<ITextFieldProps> = ({
  label,
  placeholder,
  name,
  type,
  register,
  error,
}) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="cursor-pointer">{label}</span>
      <input
        className="block border p-2 rounded-md"
        type={type}
        placeholder={placeholder}
        autoComplete="shipping work email"
        {...register(name, {
          required: `The field ${name} must be filled in.`,
        })}
      />
      {error && <span className="text-red-700">{error}</span>}
    </label>
  );
};
