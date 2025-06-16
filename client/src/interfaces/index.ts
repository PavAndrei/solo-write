export type SignUpForm = {
  username: string;
  email: string;
  password: string;
  repeatPassword: string;
  fileUrl?: string;
  terms: boolean;
};

export type SignInForm = Pick<SignUpForm, "email" | "password">;

export type CombinedForm = Pick<SignUpForm, "email" | "password"> &
  Partial<Omit<SignUpForm, "email" | "password">>;
