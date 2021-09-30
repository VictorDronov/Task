import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { mongodb, realmApp } from "../../../lib/realm";

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
  const [show, setShow] = useState<boolean>(false);

  const onSubmit: SubmitHandler<Form> = async (data): Promise<void> => {
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
          setShow(false);
          reset();
        });
    }
  };

  return (
    <div className="w-full m-auto">
      <div className="flex-col items-center justify-center max-w-sm m-auto mt-8">
        <div
          onClick={() => setShow(!show)}
          className="flex flex-row p-2 border-2 border-gray-700 border-solid rounded-md cursor-pointer hover:opacity-80"
        >
          <div className="p-2 rounded-lg bg-brand-lightSecondary">
            <FaPlus className="self-center text-green-500" />
          </div>
          <p className="self-center ml-3 text-base font-bold">Add a task.</p>
        </div>
        {show && (
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
            <button
              className="py-3 mt-5 font-bold transition bg-green-400 hover:bg-green-500 text-brand-secondary"
              type="submit"
            >
              Add Task
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default TaskForm;
