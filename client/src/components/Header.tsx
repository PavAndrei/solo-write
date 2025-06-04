import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";

import { Container } from "./Container";
import { GradientButton } from "./GradientButton";

export const Header: FC = () => {
  const { pathname } = useLocation();

  return (
    <header className="bg-primary">
      <Container>
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="flex font-bold text-2xl md:text-3xl lg:text-4xl"
          >
            <span className="bg-gradient-to-r from-pink-500 p-1 rounded-4xl">
              Solo
            </span>
            <span className="bg-gradient-to-r to-yellow-500 p-1 rounded-4xl ml-[-8px]">
              Write
            </span>
          </Link>
          <div className="flex gap-1.5">
            <Link to="/sign-up">
              <GradientButton disabled={pathname === "/sign-up"}>
                Sign Up
              </GradientButton>
            </Link>
            <Link to="/sign-in">
              <GradientButton disabled={pathname === "/sign-in"}>
                Sign In
              </GradientButton>
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
};
