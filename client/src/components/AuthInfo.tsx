import type { FC } from "react";

interface IAuthInfoProps {
  variant: "signin" | "signup";
}

export const AuthInfo: FC<IAuthInfoProps> = ({ variant }) => {
  if (variant === "signin") {
    return (
      <div className="w-1/2 p-10 bg-transparent text-basic">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-pink-500 p-1 rounded-4xl">
            Welcome
          </span>
          <span className="bg-gradient-to-r to-yellow-500 p-1 rounded-4xl">
            Back
          </span>
        </h1>
        <p className="text-base md:text-2xl">
          Log in to your account to access personalized content, stay up to date
          with the our platform, and manage your preferences easily. On this
          web-site you will be able to write and edit your own articles and read
          other people's texts. Also, you will be a part of the comminity. Feel
          free to share you interesting thoughts with others.
        </p>
      </div>
    );
  }

  if (variant === "signup") {
    return (
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
    );
  }
};
