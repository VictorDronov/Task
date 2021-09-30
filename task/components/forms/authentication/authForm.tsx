import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Realm from "realm-web";
import { realmApp } from "../../../lib/realm";
import { useRouter } from "next/router";

interface LoginForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AuthForm = (): React.ReactElement => {
  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({});
  const [error, setCustomError] = useState<{ bool: boolean; message: string }>({
    bool: false,
    message: "",
  });
  const [signUp, setSignUp] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      if (signUp) {
        await realmApp.emailPasswordAuth.registerUser(
          data.email,
          data.password
        );

        const credentials = Realm.Credentials.emailPassword(
          data.email,
          data.password
        );
        const user: Realm.User = await realmApp.logIn(credentials);
        if (user) {
          router.push("/my-tasks");
        }
      } else {
        const credentials = Realm.Credentials.emailPassword(
          data.email,
          data.password
        );
        const user: Realm.User = await realmApp.logIn(credentials);
        if (user) {
          router.push("/my-tasks");
        }
      }
    } catch (err) {
      setCustomError({
        bool: true,
        message: "Incorrect email or password *",
      });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col w-full text-brand-text"
      >
        {error?.bool === true && (
          <p className="w-full text-center text-red-600">{error.message}</p>
        )}
        {errors.password && (
          <p className="w-full text-center text-red-600">
            {errors.password.message}
          </p>
        )}
        {errors.email && (
          <p className="w-full text-center text-red-600">
            {errors.email.message}
          </p>
        )}
        {errors.confirmPassword && (
          <p className="w-full text-center text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
        {/* {signUp && (
          <label>
            <input
              placeholder="Your Name"
              {...register("username", {
                required: "Please enter your name *",
              })}
            />
          </label>
        )} */}
        <label>
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Please enter your email *",
            })}
          />
        </label>
        <label>
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Please enter your password *",
            })}
          />
        </label>
        {signUp && (
          <label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords must match",
                required: "Passwords must be the same!",
              })}
            />
          </label>
        )}
        <button
          className="py-3 mt-5 font-bold text-gray-900 hover:opacity-80 bg-gradient-to-r from-brand-primary via-green-300 to-green-500"
          type="submit"
        >
          {!signUp ? "Sign In" : "Sign Up"}
        </button>
      </form>
      {!signUp ? (
        <p className="mt-4 font-bold text-brand-text">
          Don&apos;t have an account? &nbsp;
          <a
            className="cursor-pointer text-brand-primary"
            onClick={() => setSignUp(true)}
          >
            Create Account
          </a>
        </p>
      ) : (
        <p className="mt-4 font-bold text-brand-text">
          Already have an account? &nbsp;
          <a
            className="cursor-pointer text-brand-primary"
            onClick={() => setSignUp(false)}
          >
            Sign In
          </a>
        </p>
      )}
    </>
  );
};

export default AuthForm;
