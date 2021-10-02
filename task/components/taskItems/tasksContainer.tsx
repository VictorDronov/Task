import React, { useEffect, useState } from "react";
import { mongodb, realmApp } from "../../lib/realm";
import RenderTask from "./renderTask";
import { ITasksProps, Task } from "./taskInterfaces";
import Image from "next/image";

const Tasks = ({
  isRefreshing,
  setRefreshing,
  plant,
}: ITasksProps): React.ReactElement => {
  const [tasks, setTasks] = useState<Task[]>();
  const [complete, setComplete] = useState<number>(0);

  useEffect(() => {
    if (isRefreshing === true) {
      mongodb
        ?.db("user_tasks")
        .collection("tasks")
        .find({ user_id: `${realmApp.currentUser?.id}` })
        .then((res) => {
          setTasks(res);
          mongodb
            ?.db("user_tasks")
            .collection("tasks")
            .count({ complete: true })
            .then((res) => {
              setComplete(res);
            });
          setRefreshing(!isRefreshing);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isRefreshing, setRefreshing]);

  return (
    <>
      <h2 className="mt-6 mb-6 font-semibold text-brand-primary">Your Tasks</h2>
      <div className="task-wrapper">
        <h3 className="mb-3">Unfinished Tasks</h3>
        <RenderTask
          tasks={tasks}
          setRefreshing={setRefreshing}
          isRefreshing={isRefreshing}
        />
        {tasks && tasks?.length === complete && (
          <div className="relative flex items-center justify-center w-6/12 m-auto mb-5">
            {plant && (
              <Image src={plant} alt="sprout" width={200} height={200} />
            )}
            <p className="absolute bottom-0 ">No Tasks To Complete</p>
          </div>
        )}
        <h3 className="mb-3">Finished Tasks</h3>
        <RenderTask
          tasksComplete
          tasks={tasks}
          setRefreshing={setRefreshing}
          isRefreshing={isRefreshing}
        />
        {complete === 0 && (
          <div className="relative flex items-center justify-center w-6/12 m-auto mb-5">
            {plant && (
              <Image src={plant} alt="sprout" width={200} height={200} />
            )}
            <p className="absolute bottom-0 ">No Tasks Completed</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
