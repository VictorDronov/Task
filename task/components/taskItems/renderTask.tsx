import React from "react";
import Task from "./task";
import { TaskItem } from "./taskInterfaces";

const RenderTask = ({
  tasksComplete,
  tasks,
  isRefreshing,
  setRefreshing,
}: TaskItem): React.ReactElement => {
  return (
    <>
      {tasksComplete ? (
        <>
          {tasks?.map((details) => (
            <>
              {details.complete === true && (
                <Task
                  key={Math.random()}
                  details={details}
                  setRefreshing={setRefreshing}
                  isRefreshing={isRefreshing}
                />
              )}
            </>
          ))}
        </>
      ) : (
        <>
          {tasks?.map((details) => (
            <>
              {details.complete === false && (
                <Task
                  key={Math.random()}
                  details={details}
                  setRefreshing={setRefreshing}
                  isRefreshing={isRefreshing}
                />
              )}
            </>
          ))}
        </>
      )}
    </>
  );
};

export default RenderTask;
