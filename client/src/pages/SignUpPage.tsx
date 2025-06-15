import { TextInput } from "../components/TextInput";
import { GradientButton } from "../components/GradientButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FileInput } from "../components/FileInput";
import { CheckboxInput } from "../components/CheckboxInput";
import { Container } from "../components/Container";
import { OAuth } from "../components/OAuth";
import { signUp } from "../api/apiAuth";
import { useFetch } from "../hooks/useFetch";
import { AuthInfo } from "../components/AuthInfo";

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const { data, isLoading, error, execute } = useFetch(signUp);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    const result = await execute(formData);
    console.log(result);
  };

  return (
    <Container>
      <div className="flex min-h- screen">
        <AuthInfo variant="signup" />

        <form
          className="w-1/2 p-10 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Username"
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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

          <TextInput
            label="Repeat password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />

          <FileInput />
          <CheckboxInput />

          <OAuth />

          <div className="flex space-x-4">
            <GradientButton type="submit" disabled={false}>
              Join The Platform
            </GradientButton>
            <button
              type="button"
              className="bg-gray-300 text-basic px-4 py-2 rounded"
              onClick={() => navigate("/")}
            >
              Back To The Main Page
            </button>
          </div>
          <span>
            Already have an account?{" "}
            <Link to="/sign-in" className="text-secondary">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </Container>
  );
};
