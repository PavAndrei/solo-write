import type { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
  return <div className="max-w-[1460px] px-2.5 mx-auto">{children}</div>;
};
