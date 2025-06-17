import type { UseFormRegister } from "react-hook-form";
import type { SignUpForm } from "../interfaces";
import type { FC } from "react";

interface FileInputProps {
  name: "fileUrl";
  register: UseFormRegister<SignUpForm>;
}

export const FileInput: FC<FileInputProps> = ({ name, register }) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">Avatar</label>
      <input
        type="file"
        className="w-full p-2 border rounded"
        {...register(name)}
      />
    </div>
  );
};
