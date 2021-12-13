import React from "react";
import TaskItem from "./TaskItem";
import { ITaskProps } from "./interfaces/TaskItemInterfaces";

const RenderTask = ({
  completeTask,
  deleteTask,
  tasks,
  isRefreshing,
  setRefreshing,
}: ITaskProps): React.ReactElement => {
  return (
    <>
      {tasks?.map(({ _id, complete, task, user_id }) => (
        <TaskItem
          _id={_id}
          complete={complete}
          task={task}
          user_id={user_id}
          completeTask={completeTask}
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
