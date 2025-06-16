import { FileInput } from "../components/FileInput";
import { CheckboxInput } from "../components/CheckboxInput";
import { Container } from "../components/Container";
import { OAuth } from "../components/OAuth";
import { signUp } from "../api/apiAuth";
import { useFetch } from "../hooks/useFetch";
import { AuthInfo } from "../components/AuthInfo";
import { Suggestion } from "../components/Suggestion";
import { SIGN_UP_MESSAGE } from "../constants/messages";
import { Button } from "../components/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { SignUpForm } from "../interfaces";
import { joiResolver } from "@hookform/resolvers/joi";
import { signUpSchema } from "../utils/schemas/authSchema";
import { TextField } from "../components/TextFIeld";

export const SignUpPage: React.FC = () => {
  const { data, isLoading, error, execute } = useFetch(signUp);

  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    mode: "onChange",
    resolver: joiResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (formData) => {
    console.log(formData);
  };

  return (
    <Container>
      <div className="flex min-h-screen">
        <AuthInfo variant="signup" />

        <form
          className="w-1/2 p-10 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FileInput />

          <TextField
            label="Username"
            placeholder="username"
            name="username"
            type="text"
            register={register}
            error={formState.errors.username?.message}
          />

          <TextField
            label="Email"
            placeholder="user@gmail.com"
            name="email"
            type="email"
            register={register}
            error={formState.errors.email?.message}
          />

          <TextField
            label="Password"
            placeholder="********"
            name="password"
            type="password"
            register={register}
            error={formState.errors.password?.message}
          />

          <TextField
            label="Repeat password"
            placeholder="********"
            name="repeatPassword"
            type="password"
            register={register}
            error={formState.errors.repeatPassword?.message}
          />

          <FileInput />

          <input type="checkbox" {...register("terms")} />

          {/* <CheckboxInput /> */}

          <Button buttonType="submit">Join the platform</Button>
          <OAuth />

          <Suggestion
            message={SIGN_UP_MESSAGE}
            path="/sign-in"
            linkText="Sign In"
          />
        </form>
      </div>
    </Container>
  );
};
