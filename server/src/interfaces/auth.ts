export interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
}

export interface SigninRequestBody
  extends Omit<SignupRequestBody, "username"> {}
