import React from "react";
import Task from "./task";
import { ITaskProps } from "./taskInterfaces";

const RenderTask = ({
  updateTask,
  deleteTask,
  tasks,
  isRefreshing,
  setRefreshing,
}: ITaskProps): React.ReactElement => {
  return (
    <div>
      {tasks?.map(({ _id, complete, description, title, user_id }) => (
        <Task
          _id={_id}
          complete={complete}
          description={description}
          title={title}
          user_id={user_id}
          updateTask={updateTask}
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
