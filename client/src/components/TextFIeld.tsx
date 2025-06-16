import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { CombinedForm, SignUpForm } from "../interfaces";

interface TextFieldProps {
  label: string;
  placeholder: string;
  name: "email" | "password" | "username" | "repeatPassword";
  type: string;
  register: UseFormRegister<CombinedForm> | UseFormRegister<SignUpForm>;
  error?: string;
}

export const TextField: FC<TextFieldProps> = ({
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
        {...register(name)}
      />
      {error && <span className="text-red-700">{error}</span>}
    </label>
  );
};
