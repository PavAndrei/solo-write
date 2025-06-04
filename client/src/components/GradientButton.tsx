import type { FC, ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
}

export const GradientButton: FC<GradientButtonProps> = ({
  children,
  disabled,
  type,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="relative overflow-hidden group bg-back rounded p-1.5 sm:p-2 md:p-3 text-sm md:text-base"
    >
      <span className="text-sm relative z-10 text-basic font-medium">
        {children}
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 bg-[length:200%_100%] bg-[position:-100%_0] opacity-0 group-hover:opacity-100 group-hover:[animation:gradient-slide_0.7s_ease-out_forwards]"></span>
    </button>
  );
};
