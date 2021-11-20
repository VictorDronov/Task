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
    <div>
      {tasks?.map(({ _id, complete, task, user_id }) => (
        <TaskItem
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
