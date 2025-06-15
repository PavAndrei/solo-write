interface IAuthParams {
  email: string;
  password: string;
}

export const signIn = async (formData: IAuthParams) => {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const signUp = async (formData: IAuthParams) => {
  try {
    const response = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};
