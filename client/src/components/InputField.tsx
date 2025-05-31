import type { UseFormRegister, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  label: string;
  type: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  required?: boolean;
}

export const InputField = <T extends FieldValues>({
  label,
  type,
  name,
  register,
  required,
}: InputFieldProps<T>) => (
  <label className="text-sm font-medium flex flex-col gap-2">
    <span className="cursor-pointer">{label}</span>
    <input
      type={type}
      {...register(name, { required })}
      className="w-full p-2 border rounded"
    />
  </label>
);
