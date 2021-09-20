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

const TaskForm = ({
  setRefreshing,
}: Props): React.ReactElement => {
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
    <div className="flex justify-center mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Title:&nbsp;
          <input
            {...register("title", {
              required: "Please enter your Task title.",
            })}
          />
        </label>
        <label>
          Task Description:&nbsp;
          <input
            {...register("description", {
              required: "Please enter your Task descirption.",
            })}
          />
        </label>
        <button className="flex justify-items-end" type="submit">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
