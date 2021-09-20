import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mongodb, realmApp } from "../../lib/realm";
import { useRouter } from "next/router";

interface Tasks {
  user_id: string;
  _id: string;
  title: string;
  description: string;
}

interface Props {
  isRefreshing: boolean;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
}
const Tasks = ({ isRefreshing, setRefreshing }: Props): React.ReactElement => {
  const [tasks, setTasks] = useState<Tasks[]>();
  const router = useRouter();

  useEffect(() => {
    if (isRefreshing) {
      console.log(realmApp.currentUser?.id);
      mongodb
        ?.db("user_tasks")
        .collection("tasks")
        .find({ sort: realmApp.currentUser?.id })
        .then((res) => {
          setTasks(res);
          console.log(res);
          setRefreshing(!isRefreshing);
        });
    }
  }, [isRefreshing, setRefreshing]);

  const Delete = (title: string) => {
    mongodb?.db("user_tasks").collection("tasks").findOneAndDelete({ title });
    console.log("DEleted", title);
  };

  return (
    <div className="container task-wrapper">
      {tasks &&
        tasks.map(({ user_id, _id, description, title }) => (
          <div key={_id} className="mx-3 mb-3 md:w-2/6">
            <h3>{title}</h3>
            <p className="text-center">{description}</p>
            <button onClick={() => Delete(title)}>Delete</button>
          </div>
        ))}
    </div>
  );
};

export default Tasks;
