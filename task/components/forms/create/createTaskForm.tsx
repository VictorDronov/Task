import ErrorMessage from "@components/common/errorMessage";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { mongodb, realmApp } from "../../../lib/realm";
import { CreateTaskModalProps } from "./renderCreateTaskModal";

interface FormProps {
  title: string;
  description: string;
}

const TaskForm = ({
  closeModal,
  setRefreshing,
}: CreateTaskModalProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormProps>({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit: SubmitHandler<FormProps> = async (data): Promise<void> => {
    if (realmApp.currentUser) {
      mongodb
        ?.db("user_tasks")
        .collection("tasks")
        .insertOne({
          user_id: realmApp.currentUser.id,
          title: data.title,
          description: data.description,
          complete: false,
        })
        .then(() => {
          setRefreshing(true);
          reset();
          closeModal();
        });
    }
  };

  return (
    <div className="w-full m-auto">
      <ErrorMessage name={errors.title} message={errors.title?.message} />
      <ErrorMessage
        name={errors.description}
        message={errors.description?.message}
      />
      <div className="flex-col items-center justify-center max-w-sm m-auto mt-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full"
        >
          <label className="mb-3 text-black">
            <input
              autoComplete="on"
              placeholder="Title"
              {...register("title", {
                required: "Please enter your Task title.",
              })}
            />
          </label>
          <label className="mb-3 text-black">
            <textarea
              autoComplete="on"
              className="w-full placeholder-gray-500 border-none outline-none resize-none bg-brand-secondary text-brand-text"
              placeholder="Description"
              {...register("description", {
                required: "Please enter your Task descirption.",
              })}
            />
          </label>
          <div className="flex flex-row w-full justify-evenly">
            <button
              // disabled
              className="py-3 mt-5 font-bold transition bg-green-400 disabled:cursor-default hover:bg-green-500 text-brand-secondary disabled:bg-green-500"
              onClick={closeModal}
            >
              Never Mind
            </button>
            <button
              className="py-3 mt-5 font-bold transition bg-green-400 hover:bg-green-500 text-brand-secondary"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
