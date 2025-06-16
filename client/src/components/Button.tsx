import type { FC, ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  buttonType?: "button" | "submit" | "reset";
  cb?: () => void;
  disabled?: boolean;
}

export const Button: FC<IButtonProps> = ({
  children,
  buttonType = "button",
  cb,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className="flex justify-center items-center gap-2 border p-2"
      onClick={cb}
      type={buttonType}
    >
      {children}
    </button>
  );
};
