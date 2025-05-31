import { useForm } from "react-hook-form";
import { InputField } from "../components/InputField";
import { GradientButton } from "../components/GradientButton";
import { useNavigate } from "react-router-dom";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
  avatar: FileList;
  agree: boolean;
}

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen">
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputField<SignupFormValues>
          label="Username"
          type="text"
          name="username"
          register={register}
          required
        />
        <InputField<SignupFormValues>
          label="Email"
          type="email"
          name="email"
          register={register}
          required
        />
        <InputField<SignupFormValues>
          label="Password"
          type="password"
          name="password"
          register={register}
          required
        />

        <div>
          <label className="block mb-1 text-sm font-medium">Avatar</label>
          <input
            type="file"
            {...register("avatar")}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register("agree", { required: true })}
              className="mr-2"
            />
            I agree to the terms and conditions
          </label>
          {errors.agree && (
            <p className="text-red-500 text-sm">You must accept the terms</p>
          )}
        </div>

        <div className="flex space-x-4">
          <GradientButton type="submit" disabled={false}>
            Submit
          </GradientButton>
          <button
            type="button"
            className="bg-gray-300 text-basic px-4 py-2 rounded"
            onClick={() => navigate("/")}
          >
            Back to the main page
          </button>
        </div>
      </form>
    </div>
  );
};
