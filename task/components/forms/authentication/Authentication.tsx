import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Realm from "realm-web";
import { mongodb, realmApp } from "../../../lib/realm";
import { useRouter } from "next/router";
import { ErrorMessage } from "components";

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
    setError,
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
      if ((err as { error: string }).error === "name already in use") {
        setError("email", {
          type: "manual",
          message: "Email is already in use.",
        });
      } else {
        setCustomError({
          bool: true,
          message: "Incorrect email or password *",
        });
      }
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
        <ErrorMessage name={errors.email} message={errors.email?.message} />
        <ErrorMessage
          name={errors.password}
          message={errors.password?.message}
        />
        <ErrorMessage
          name={errors.confirmPassword}
          message={errors.confirmPassword?.message}
        />
        <label className="label-preset">
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Please enter your email!",
              // validate: { checkAvalability: async (value) => {} },
            })}
          />
        </label>
        <label className="label-preset">
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Please enter your password!",
            })}
          />
        </label>
        {signUp && (
          <label className="label-preset">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                validate: (value) =>
                  value === watch("password") || "Passwords must match",
                required: "Passwords do not match!",
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
