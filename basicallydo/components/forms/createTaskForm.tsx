import axios from "axios";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const TaskForm = (): React.ReactElement => {
  const { register, handleSubmit, reset } = useForm<Form>({
    defaultValues: { title: "", description: "" },
  });

  interface Form {
    title: string;
    description: string;
  }

  const onSubmit: SubmitHandler<Form> = async (data): Promise<void> => {
    axios
      .post("http://localhost:3000/api/tasks", {
        title: data.title,
        description: data.description,
      })
      .then(() => {
        // console.log("Task Successfully Created!");
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
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
