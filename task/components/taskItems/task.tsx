import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { ITaskProps, TaskProps } from "./TaskInterfaces";

const Task = ({
  _id,
  complete,
  user_id,
  task,
  deleteTask,
  completeTask,
}: TaskProps): React.ReactElement => {
  // const [isShowingDetails, setShowingDetails] = useState<boolean>(false);

  const DelayDelete = (comp: boolean) => {
    if (complete === true) {
      console.log("called");
      setTimeout(() => {
        deleteTask(_id, complete === true);
      }, 5000);
    } else {
      return;
    }
  };

  useEffect(() => {
    DelayDelete(complete);
  });

  return (
    <div
      className={`${
        complete
          ? "opacity-0 delay-700 transition-all duration-1000 ease-in-out"
          : ""
      } w-full p-3 m-auto mb-3 bg-gray-800 rounded-xl md:w-6/12 `}
    >
      <div className="flex flex-row">
        <div className="flex self-center justify-between w-full">
          {complete === true ? (
            <div className="flex flex-row">
              <div
                className="self-center p-1 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80 bg-brand-primary"
                onClick={() => completeTask(_id, !complete)}
              >
                <FaCheck className="text-brand-secondary" />
              </div>
              <h3 className="ml-3 font-semibold tracking-wider line-through">
                {task}
              </h3>
            </div>
          ) : (
            <div className="flex flex-row">
              <div
                className="p-3 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80"
                onClick={() => completeTask(_id, !complete)}
              />
              <h3 className="ml-3 font-semibold tracking-wider">{task}</h3>
            </div>
          )}
          {/* {isShowingDetails ? (
            <FaAngleUp
              size={20}
              onClick={() => setShowingDetails(false)}
              className="self-center cursor-pointer text-brand-primary hover:opacity-80"
            />
          ) : (
            <FaAngleDown
              size={20}
              onClick={() => setShowingDetails(true)}
              className="self-center cursor-pointer text-brand-primary hover:opacity-80"
            />
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Task;
