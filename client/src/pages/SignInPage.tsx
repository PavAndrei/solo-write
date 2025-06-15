import { useState, type FC } from "react";
import { Container } from "../components/Container";
import { TextInput } from "../components/TextInput";
import { GradientButton } from "../components/GradientButton";
import { Link, useNavigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";
import { signIn } from "../api/apiAuth";
import { useFetch } from "../hooks/useFetch";
import { AuthInfo } from "../components/AuthInfo";

export const SignIn: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { data, isLoading, error, execute } = useFetch(signIn);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await execute({ email, password });
    console.log(result);
  };

  return (
    <Container>
      <div className="flex min-h-screen">
        <AuthInfo variant="signin" />

        <form
          className="w-1/2 p-10 flex flex-col gap-2 max-h-[500px]"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <OAuth />

          <GradientButton type="submit">Sign In</GradientButton>
          <span>
            Don't have an account yet?
            <Link to="/sign-up" className="text-secondary">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </Container>
  );
};
