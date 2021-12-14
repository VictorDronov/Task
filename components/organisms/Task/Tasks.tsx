import React from "react";
import TaskItem from "./TaskItem";
import { ITaskProps } from "./interfaces/TaskItemInterfaces";

const RenderTask = ({
  deleteTask,
  tasks,
  isRefreshing,
  setRefreshing,
}: ITaskProps): React.ReactElement => {
  return (
    <>
      {tasks?.map(({ _id, task, user_id }) => (
        <TaskItem
          _id={_id}
          task={task}
          user_id={user_id}
          deleteTask={deleteTask}
          key={_id}
          setRefreshing={setRefreshing}
          isRefreshing={isRefreshing}
        />
      ))}
    </>
  );
};

export default RenderTask;
