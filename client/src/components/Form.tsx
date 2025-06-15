import { useForm, SubmitHandler } from "react-hook-form";

interface IForm {
  email: string;
  password: string;
}

export const Form = ({ children }) => {
  const { handleSubmit } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(data);
  };

  return <form onSubmit={handleSubmit(onSubmit)}>{children}</form>;
};
