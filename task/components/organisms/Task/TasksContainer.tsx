import React, { useEffect, useState } from "react";
import { mongodb, realmApp } from "../../../lib/realm";
import { TaskProps, TaskStateProps } from "./interfaces/TaskItemInterfaces";
import Image from "next/image";
import RenderTask from "./Tasks";

const TaskItem = ({
  isRefreshing,
  setRefreshing,
}: TaskStateProps): React.ReactElement => {
  const [tasks, setTasks] = useState<TaskProps[]>();

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

  const Delete = (id: string, complete: boolean) => {
    mongodb
      ?.db("user_tasks")
      .collection("tasks")
      .deleteOne({ _id: id, complete: complete === true })
      .then(() => {
        setRefreshing(!isRefreshing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const UpdateComplete = (id: string, complete: boolean) => {
    const query = { _id: id };
    const update = {
      $set: {
        complete: complete,
      },
    };
    mongodb
      ?.db("user_tasks")
      .collection("tasks")
      .updateOne(query, update)
      .then((result) => {
        const { matchedCount, modifiedCount } = result;
        if (matchedCount && modifiedCount) {
          setRefreshing(!isRefreshing);
        }
      })
      .catch((err) => console.error(`Failed to update the item: ${err}`));
  };

  return (
    <div>
      {tasks?.length !== 0 ? (
        <div>
          <h2 className="m-auto mt-6 mb-6 text-xl font-semibold text-left text-brand-primary md:w-2/4">
            Tasks - {tasks ? `${tasks?.length}` : 0}
          </h2>
          <div className="task-wrapper">
            <RenderTask
              completeTask={UpdateComplete}
              deleteTask={Delete}
              tasks={tasks}
              setRefreshing={setRefreshing}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>
      ) : (
        <div>
          <Image
            src="/images/plantleaves.png"
            alt=""
            width={300}
            height={300}
          />
          <p className="text-lg">
            Get started by{" "}
            <span className="text-brand-primary">Adding a task</span> above.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
