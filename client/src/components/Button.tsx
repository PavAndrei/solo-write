import type { FC, ReactNode } from "react";

interface IButtonProps {
  children: ReactNode;
  buttonType?: "button" | "submit" | "reset";
  cb?: () => void;
}

export const Button: FC<IButtonProps> = ({
  children,
  buttonType = "button",
  cb,
}) => {
  return (
    <button
      className="flex justify-center items-center gap-2 border p-2"
      onClick={cb}
      type={buttonType}
    >
      {children}
    </button>
  );
};
