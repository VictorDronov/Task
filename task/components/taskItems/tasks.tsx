import React, { useEffect, useState } from "react";
import { mongodb, realmApp } from "../../lib/realm";
import RenderTask from "./renderTask";
import { TaskProps, TaskStateProps } from "./taskInterfaces";
import Image from "next/image";

const Tasks = ({
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

  const Delete = (id: string) => {
    mongodb
      ?.db("user_tasks")
      .collection("tasks")
      .deleteOne({ _id: id })
      .then(() => {
        setRefreshing(!isRefreshing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Update = (id: string, complete: boolean) => {
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
          console.log(`Successfully updated the item.`);
          setRefreshing(!isRefreshing);
        }
      })
      .catch((err) => console.error(`Failed to update the item: ${err}`));
  };

  return (
    <div>
      {tasks?.length !== 0 ? (
        <div>
          <h2 className="mt-6 mb-6 font-semibold text-brand-primary">
            Tasks - {tasks ? `${tasks?.length}` : 0}
          </h2>
          <div className="pb-12 task-wrapper">
            <RenderTask
              updateTask={Update}
              deleteTask={Delete}
              tasks={tasks}
              setRefreshing={setRefreshing}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>
      ) : (
        <div>
          <h2 className="mt-6 mb-6 font-semibold text-brand-primary">
            You have no tasks!
          </h2>
          <Image
            src="/images/plantleaves.png"
            alt=""
            width={300}
            height={300}
          />
          <p className="text-lg">
            Get started by clicking on{" "}
            <span className="text-brand-primary">Add a task</span> above.
          </p>
        </div>
      )}
    </div>
  );
};

export default Tasks;
