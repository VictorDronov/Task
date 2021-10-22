import React from "react";
import Task from "./TaskItem";
import { ITaskProps } from "./TaskItemInterfaces";

const RenderTask = ({
  completeTask,
  deleteTask,
  tasks,
  isRefreshing,
  setRefreshing,
}: ITaskProps): React.ReactElement => {
  return (
    <div>
      {tasks?.map(({ _id, complete, task, user_id }) => (
        <Task
          _id={_id}
          complete={complete}
          task={task}
          user_id={user_id}
          completeTask={completeTask}
          deleteTask={deleteTask}
          key={Math.random()}
          setRefreshing={setRefreshing}
          isRefreshing={isRefreshing}
        />
      ))}
    </div>
  );
};

export default RenderTask;
