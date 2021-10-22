import ErrorMessage from "@components/common/ErrorItem";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { mongodb, realmApp } from "../../../lib/realm";
import { CreateTaskModalProps } from "./RenderCreateTask";

interface FormProps {
  task: string;
}

const TaskForm = ({
  isLoading,
  setLoading,
  setRefreshing,
  setIsVisibile,
}: CreateTaskModalProps): React.ReactElement => {
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
    if (realmApp.currentUser) {
      mongodb
        ?.db("user_tasks")
        .collection("tasks")
        .insertOne({
          user_id: realmApp.currentUser.id,
          task: data.task,
          complete: false,
        })
        .then((res) => {
          if (res) {
            setLoading(false);
            setRefreshing(true);
            setIsVisibile(false);
            reset();
          }
        })
        .catch((err) => {
          console.log("An Error occured when creating a task!", err);
        });
    }
  };

  return !isLoading ? (
    <div className="w-full m-auto">
      <ErrorMessage
        name={errors.task}
        message={errors.task?.message}
        styles="bg-brand-secondary h-8 flex justify-center text-center"
      />
      <div className="flex-col items-center justify-center m-auto md:w-2/4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-row justify-center w-full p-2 align-middle border-2 border-solid rounded-md border-brand-primary bg-brand-secondary">
            <label className="flex w-full text-black align-middle">
              <input
                autoComplete="on"
                placeholder="Your Task"
                {...register("task", {
                  minLength: {
                    value: 8,
                    message: "Task can not be shorter than 8 characters.",
                  },
                  maxLength: {
                    value: 20,
                    message: "Task can not exceed 20 characters.",
                  },
                  required: "Please enter your Task.",
                })}
              />
            </label>
            <button
              className="z-50 w-2/4 py-2 font-bold transition bg-brand-primary disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 text-brand-secondary"
              type="submit"
              disabled={!isValid}
            >
              Add Task
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
