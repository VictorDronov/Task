import { ErrorMessage } from "@components/atoms";
import { useClickOutside } from "helpers";
import { dbInsertOne } from "helpers";
import React, { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { realmApp } from "../../../lib/realm";
import { CreateTaskModalProps } from "./RenderCreateTask";

interface FormProps {
  task: string;
}

const TaskForm = ({
  isVisibile,
  isLoading,
  setLoading,
  setRefreshing,
  setIsVisibile,
}: CreateTaskModalProps): React.ReactElement => {
  const closeInput = useCallback(() => setIsVisibile(false), [setIsVisibile]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: "onChange",
    defaultValues: { task: "" },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data): Promise<void> => {
    setLoading(true);
    //TODO: Move This to API
    if (realmApp.currentUser) {
      dbInsertOne("user_tasks", "tasks", data.task)
        ?.then((res: any) => {
          if (res) {
            setLoading(false);
            setRefreshing(true);
            setIsVisibile(false);
            reset();
          }
        })
        .catch((err: any) => {
          console.log("An Error occured when creating a task!", err);
        });
    }
  };

  const [ref] = useClickOutside({
    onClick: closeInput,
    isActive: isVisibile,
  });

  return !isLoading ? (
    <div className="w-full m-auto mt-2">
      <ErrorMessage
        name={errors.task}
        message={errors.task?.message}
        styles="bg-brand-secondary h-8 flex justify-center text-center"
      />
      <div
        className="flex-col items-center justify-center m-auto md:w-2/4"
        ref={ref}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-center w-full p-2 align-middle border-2 border-solid rounded-md border-brand-primary bg-brand-secondary">
            <label className="flex w-full text-black align-middle">
              <input
                autoFocus
                autoComplete="on"
                placeholder="Your Task"
                {...register("task", {
                  minLength: {
                    value: 3,
                    message: "Task can not be shorter than 3 characters.",
                  },
                  maxLength: {
                    value: 64,
                    message: "Break your task down.",
                  },
                  required: "Please enter your Task.",
                })}
              />
            </label>
            <button
              className="z-50 w-1/4 py-1 font-bold transition bg-brand-primary disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 text-brand-secondary"
              type="submit"
              disabled={!isValid}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex justify-center align-middle">
      <FaSpinner className="animate-spin text-brand-text" size={50} />
    </div>
  );
};

export default TaskForm;
