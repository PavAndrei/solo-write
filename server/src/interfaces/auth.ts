export interface SignupRequestBody {
  username: string;
  email: string;
  password: string;
  fileUrl?: string;
}

export interface SigninRequestBody
  extends Omit<SignupRequestBody, "username"> {}
