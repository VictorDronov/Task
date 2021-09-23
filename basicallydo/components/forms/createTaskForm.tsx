import React, { Dispatch, SetStateAction } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { mongodb, realmApp } from "../../lib/realm";

interface Form {
  title: string;
  description: string;
}

interface Props {
  setRefreshing: Dispatch<SetStateAction<boolean>>;
}

const TaskForm = ({ setRefreshing }: Props): React.ReactElement => {
  const { register, handleSubmit, reset } = useForm<Form>({
    defaultValues: { title: "", description: "" },
  });

  const onSubmit: SubmitHandler<Form> = async (data): Promise<void> => {
    if (realmApp.currentUser) {
      mongodb?.db("user_tasks").collection("tasks").insertOne({
        user_id: realmApp.currentUser.id,
        title: data.title,
        description: data.description,
      });
      setRefreshing(true);
      reset();
    }
  };

  return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
        <label className="mb-3 text-black">
          <input
            placeholder="Title"
            {...register("title", {
              required: "Please enter your Task title.",
            })}
          />
        </label>
        <label className="mb-3 text-black">
          <input
            placeholder="Description"
            {...register("description", {
              required: "Please enter your Task descirption.",
            })}
          />
        </label>
        <button
          className="py-3 mt-5 font-bold transition bg-green-400 hover:bg-green-500 text-brand-secondary"
          type="submit"
        >
          Add Task
        </button>
      </form>
  );
};

export default TaskForm;
