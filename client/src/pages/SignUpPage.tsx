import { FileInput } from "../components/FileInput";
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
import { CheckboxField } from "../components/CheckboxField";
import { Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";

export const SignUpPage: React.FC = () => {
  const { data, isLoading, error, execute } = useFetch(signUp);

  const { register, handleSubmit, formState } = useForm<SignUpForm>({
    mode: "onChange",
    resolver: joiResolver(signUpSchema),
  });

  const onSubmit: SubmitHandler<SignUpForm> = async (formData) => {
    let fileUrl;

    if (formData.fileUrl) {
      fileUrl = formData.fileUrl[0];
    }

    const sentFormData = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      fileUrl: fileUrl,
    };

    console.log(sentFormData);

    await execute(sentFormData);
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
        <AuthInfo variant="signup" />

        <form
          className="w-1/2 p-10 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
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

          <input type="file" {...register("fileUrl")} />

          {/* <FileInput name="fileUrl" register={register} /> */}

          <CheckboxField
            text="I agree with the terms and conditions"
            name="terms"
            register={register}
            error={formState.errors.terms?.message}
          />

          <Button
            // disabled={!formState.isDirty || !formState.isValid}
            disabled={false}
            buttonType="submit"
          >
            {isLoading ? (
              <FaSpinner className="animate-spin"></FaSpinner>
            ) : (
              "Join the platform"
            )}
          </Button>
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
