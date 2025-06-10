import type { FC } from "react";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";

export const OAuth: FC = () => {
  const handleGoogleAuth = async (userData: CredentialResponse) => {
    try {
      const { credential } = userData;

      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ credential }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <GoogleLogin
      onSuccess={(credentialsResponse) => handleGoogleAuth(credentialsResponse)}
      onError={() => console.log("Login failed")}
    />
  );
};
