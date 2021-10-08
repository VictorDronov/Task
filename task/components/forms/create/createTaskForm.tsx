import ErrorMessage from "@components/common/ErrorMessage";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaSpinner } from "react-icons/fa";
import { mongodb, realmApp } from "../../../lib/realm";
import { CreateTaskModalProps } from "./RenderCreateTaskModal";

interface FormProps {
  task: string;
}

const TaskForm = ({
  isLoading,
  closeModal,
  setLoading,
  setRefreshing,
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
            reset();
            closeModal();
          }
        })
        .catch((err) => {
          console.log("An Error occured when creating a task!", err);
        });
    }
  };

  return !isLoading ? (
    <div className="w-full m-auto">
      <ErrorMessage name={errors.task} message={errors.task?.message} />
      <div className="flex-col items-center justify-center max-w-sm m-auto mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <label className="mb-3 text-black">
            <textarea
              autoComplete="on"
              className="w-full placeholder-gray-500 border-none outline-none resize-none bg-brand-secondary text-brand-text"
              placeholder="Your Task"
              {...register("task", {
                minLength: {
                  value: 8,
                  message: "Task can not be shorter than 8 characters.",
                },
                maxLength: {
                  value: 150,
                  message: "Task can not exceed 150 characters.",
                },
                required: "Please enter your Task descirption.",
              })}
            />
          </label>
          <div className="flex flex-row w-full justify-evenly">
            <button
              className="py-3 mt-5 font-bold transition bg-brand-primary hover:opacity-80 text-brand-secondary"
              onClick={closeModal}
            >
              Never Mind
            </button>
            <button
              className="py-3 mt-5 font-bold transition bg-brand-primary disabled:opacity-80 hover:opacity-80 text-brand-secondary"
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
