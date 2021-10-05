import React from "react";
import Task from "./task";
import { TaskItem } from "./taskInterfaces";
import { mongodb } from "../../lib/realm";

const RenderTask = ({
  tasks,
  isRefreshing,
  setRefreshing,
}: TaskItem): React.ReactElement => {
  const Delete = (id: string) => {
    mongodb
      ?.db("user_tasks")
      .collection("tasks")
      .deleteOne({ _id: id })
      .then(() => {
        setRefreshing(!isRefreshing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {tasks?.map((details) => (
        <Task
          Delete={Delete}
          key={Math.random()}
          details={details}
          setRefreshing={setRefreshing}
          isRefreshing={isRefreshing}
        />
      ))}
    </>
  );
};

export default RenderTask;
