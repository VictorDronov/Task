import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mongodb, realmApp } from "../../lib/realm";
import Task from "./task";

interface Tasks {
  user_id: string;
  _id: string;
  title: string;
  description: string;
  complete: boolean;
}

interface Props {
  isRefreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
}
const Tasks = ({ isRefreshing, setRefreshing }: Props): React.ReactElement => {
  const [tasks, setTasks] = useState<Tasks[]>();

  useEffect(() => {
    if (isRefreshing === true) {
      mongodb
        ?.db("user_tasks")
        .collection("tasks")
        .find({ user_id: `${realmApp.currentUser?.id}` })
        .then((res) => {
          setTasks(res);
          console.log(res);
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
        {tasks?.map((details) => (
          <Task
            // complete={complete}
            // user_id={user_id}
            key={Math.random()}
            details={details}
            // _id={_id}
            // description={description}
            // title={title}
            setRefreshing={setRefreshing}
            isRefreshing={isRefreshing}
          />
        ))}
      </div>
    </>
  );
};

export default Tasks;
