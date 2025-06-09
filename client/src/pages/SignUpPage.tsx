// import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";
import { GradientButton } from "../components/GradientButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FileInput } from "../components/FileInput";
import { CheckboxInput } from "../components/CheckboxInput";
import { Container } from "../components/Container";

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        return navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <div className="flex min-h- screen">
        <div className="w-1/2 p-10 bg-transparent text-basic">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 p-1 rounded-4xl">
              Sign
            </span>
            <span className="bg-gradient-to-r to-yellow-500 p-1 rounded-4xl">
              Up
            </span>
          </h1>
          <p className="text-base md:text-2xl">
            Welcome to our platform where you can write, share, and discover
            amazing stories from creators all over the world. Join our community
            and start your journey today!
          </p>
        </div>

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
          <FileInput />
          <CheckboxInput />

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
