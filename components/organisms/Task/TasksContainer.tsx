import React, { useEffect, useState } from "react";
import { TaskProps, TaskStateProps } from "./interfaces/TaskItemInterfaces";
import Image from "next/image";
import RenderTask from "./Tasks";
import getTasks from "pages/api/getTasks";
import deleteTaskById from "pages/api/deleteTask";

const TaskItem = ({
  isRefreshing,
  setRefreshing,
}: TaskStateProps): React.ReactElement => {
  const [tasks, setTasks] = useState<TaskProps[]>();

  useEffect(() => {
    if (isRefreshing === true) {
      getTasks()
        .then((res) => {
          setTasks(res);
          setRefreshing(!isRefreshing);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isRefreshing, setRefreshing]);

  const deleteTask = (id: string) => {
    deleteTaskById(id)
      .then(() => {
        setRefreshing(!isRefreshing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {tasks?.length !== 0 ? (
        <>
          <h2 className="m-auto mt-6 mb-6 text-xl font-semibold text-left text-brand-primary md:w-2/4">
            Tasks - {tasks ? `${tasks?.length}` : 0}
          </h2>
          <div className="task-wrapper">
            <RenderTask
              deleteTask={deleteTask}
              tasks={tasks}
              setRefreshing={setRefreshing}
              isRefreshing={isRefreshing}
            />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/images/plantleaves.png"
            alt=""
            width={300}
            height={300}
          />
          <p className="text-lg">
            Get started by
            <span className="text-brand-primary"> Adding a task</span> above.
          </p>
        </div>
      )}
    </>
  );
};

export default TaskItem;
