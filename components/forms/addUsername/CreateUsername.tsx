import { dbInsertOne } from "helpers";
import { mongodb, realmApp } from "lib/realm";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormProps {
  user_name: string;
}
export default function AddUsername(): React.ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: { user_name: "" },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data): Promise<void> => {
    //TODO: Move This to API

    dbInsertOne("users", "usernames", data.user_name)
      ?.then((res) => {
        if (res) {
          reset();
        }
      })
      .catch((err) => {
        console.log("An Error occured when creating your Username!", err);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-center w-full p-2 align-middle border-2 border-solid rounded-md border-brand-primary bg-brand-secondary md:w-2/4 m-auto">
        <label className="flex w-full">
          <input
            {...register("user_name", {
              minLength: {
                value: 3,
                message: "Username can not be shorter than 3 characters.",
              },
              maxLength: {
                value: 32,
                message: "Username is to long.",
              },
              required: "Please enter your username.",
            })}
          />
          <button
            className="z-50 w-1/4 py-1 font-bold transition bg-brand-primary disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 text-brand-secondary"
            type="submit"
            disabled={!isValid}
          >
            Add
          </button>
        </label>
      </div>
    </form>
  );
}
