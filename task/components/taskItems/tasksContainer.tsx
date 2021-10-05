import React, { useEffect, useState } from "react";
import { mongodb, realmApp } from "../../lib/realm";
import RenderTask from "./renderTask";
import { ITasksProps, Task } from "./taskInterfaces";

const Tasks = ({
  isRefreshing,
  setRefreshing,
}: ITasksProps): React.ReactElement => {
  const [tasks, setTasks] = useState<Task[]>();

  useEffect(() => {
    if (isRefreshing === true) {
      mongodb
        ?.db("user_tasks")
        .collection("tasks")
        .find({ user_id: `${realmApp.currentUser?.id}` })
        .then((res) => {
          setTasks(res);
          setRefreshing(!isRefreshing);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isRefreshing, setRefreshing]);

  return (
    <div>
      <h2 className="mt-6 mb-6 font-semibold text-brand-primary">
        Tasks - {tasks ? `${tasks?.length}` : 0}
      </h2>
      <div className="pb-12 task-wrapper">
        <RenderTask
          tasks={tasks}
          setRefreshing={setRefreshing}
          isRefreshing={isRefreshing}
        />
      </div>
    </div>
  );
};

export default Tasks;
