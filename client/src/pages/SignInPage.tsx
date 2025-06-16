import { useEffect, type FC } from "react";
import { Container } from "../components/Container";
import { Navigate } from "react-router-dom";
import { OAuth } from "../components/OAuth";
import { signIn } from "../api/apiAuth";
import { useFetch } from "../hooks/useFetch";
import { AuthInfo } from "../components/AuthInfo";
import { TextField } from "../components/TextFIeld";
import { Button } from "../components/Button";
import { Suggestion } from "../components/Suggestion";
import { SIGN_IN_MESSAGE } from "../constants/messages";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signInSchema } from "../utils/schemas/authSchema";
import { joiResolver } from "@hookform/resolvers/joi";
import { FaSpinner } from "react-icons/fa";

export interface IForm {
  email: string;
  password: string;
}

export const SignIn: FC = () => {
  const { data, isLoading, error, execute } = useFetch(signIn);

  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: "onChange",
    resolver: joiResolver(signInSchema),
  });

  const onSubmit: SubmitHandler<IForm> = async (formData) => {
    await execute(formData);
  };

  useEffect(() => {
    if (data?.success === false) {
      alert(data?.message);
    }

    if (error) {
      alert(error?.message);
    }
  }, [data, error]);

  if (data?.success) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <div className="flex min-h-screen">
        <AuthInfo variant="signin" />

        <form
          className="w-1/2 p-10 flex flex-col gap-2 max-h-[500px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Enter your email"
            placeholder="user@gmail.com"
            name="email"
            type="email"
            register={register}
            error={formState.errors.email?.message}
          />
          <TextField
            label="Enter your password"
            placeholder="********"
            name="password"
            type="password"
            register={register}
            error={formState.errors.password?.message}
          />

          <Button buttonType="submit">
            {isLoading ? (
              <FaSpinner className="animate-spin"></FaSpinner>
            ) : (
              "Sign In"
            )}
          </Button>

          <Suggestion
            message={SIGN_IN_MESSAGE}
            path="/sign-up"
            linkText="Sign Up"
          />
          <OAuth />
        </form>
      </div>
    </Container>
  );
};
