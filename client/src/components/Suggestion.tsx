import type { FC } from "react";
import { Link } from "react-router-dom";

interface ISuggestionProps {
  message: string;
  path: string;
  linkText: string;
}

export const Suggestion: FC<ISuggestionProps> = ({
  message,
  path,
  linkText,
}) => {
  return (
    <div className="flex gap-1.5">
      <span>{message}</span>
      <Link className="text-blue-500" to={path}>
        {linkText}
      </Link>
    </div>
  );
};
