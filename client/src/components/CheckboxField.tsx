import type { FC } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { SignUpForm } from "../interfaces";

interface CheckboxFieldProps {
  text: string;
  name: "terms";
  error?: string;
  register: UseFormRegister<SignUpForm>;
}

export const CheckboxField: FC<CheckboxFieldProps> = ({
  text,
  name,
  error,
  register,
}) => {
  return (
    <label className="cursor-pointer">
      <div className="flex gap-2 items-center">
        <input type="checkbox" {...register(name)} />
        <span>{text}</span>
      </div>
      {error && <span className="text-red-700">{error}</span>}
    </label>
  );
};
