import { useState, type FC } from "react";
import { Container } from "../components/Container";
import { TextInput } from "../components/TextInput";
import { GradientButton } from "../components/GradientButton";
import { Link, useNavigate } from "react-router-dom";

export const SignIn: FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        console.log("error");
      }

      if (response.ok) {
        navigate("/dashboard");
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="flex min-h-screen">
        <div className="w-1/2 p-10 bg-transparent text-basic">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 p-1 rounded-4xl">
              Welcome
            </span>
            <span className="bg-gradient-to-r to-yellow-500 p-1 rounded-4xl">
              Back
            </span>
          </h1>
          <p className="text-base md:text-2xl">
            Log in to your account to access personalized content, stay up to
            date with the our platform, and manage your preferences easily. On
            this web-site you will be able to write and edit your own articles
            and read other people's texts. Also, you will be a part of the
            comminity. Feel free to share you interesting thoughts with others.
          </p>
        </div>
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
          <GradientButton type="submit">Sign In</GradientButton>
          <span>
            Don't have an account yet?{" "}
            <Link to="/sign-up" className="text-secondary">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </Container>
  );
};
