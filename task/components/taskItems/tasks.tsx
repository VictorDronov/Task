import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { mongodb, realmApp } from "../../lib/realm";
import Task from "./task";
import Image from "next/image";

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
  plant: string;
}
const Tasks = ({
  isRefreshing,
  setRefreshing,
  plant,
}: Props): React.ReactElement => {
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
        <h3 className="mb-3">Unfinished Tasks</h3>
        {tasks && tasks?.length > 0 ? (
          tasks?.map((details) => (
            <>
              {details.complete === false ? (
                <Task
                  key={Math.random()}
                  details={details}
                  setRefreshing={setRefreshing}
                  isRefreshing={isRefreshing}
                />
              ) : (
                <div className="relative flex items-center justify-center w-6/12 m-auto mb-5">
                  {plant && (
                    <Image src={plant} alt="sprout" width={200} height={200} />
                  )}
                  <p className="absolute bottom-0 ">No Tasks To Complete</p>
                </div>
              )}
            </>
          ))
        ) : (
          <div className="relative flex items-center justify-center w-6/12 m-auto mb-5">
            {plant && (
              <Image src={plant} alt="sprout" width={200} height={200} />
            )}
            <p className="absolute bottom-0 ">No Tasks To Complete</p>
          </div>
        )}
        <h3 className="mb-3">Finished Tasks</h3>
        {tasks && tasks?.length ? (
          tasks?.map((details) => (
            <>
              {details.complete === true ? (
                <Task
                  key={Math.random()}
                  details={details}
                  setRefreshing={setRefreshing}
                  isRefreshing={isRefreshing}
                />
              ) : (
                <div className="relative flex items-center justify-center w-6/12 m-auto mb-5">
                  {plant && (
                    <Image src={plant} alt="sprout" width={200} height={200} />
                  )}
                  <p className="absolute bottom-0 ">No Tasks Complete</p>
                </div>
              )}
            </>
          ))
        ) : (
          <div className="relative flex items-center justify-center w-6/12 m-auto mb-5">
            {plant && (
              <Image src={plant} alt="sprout" width={200} height={200} />
            )}
            <p className="absolute bottom-0 ">No Tasks Complete</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
