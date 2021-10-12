import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { TaskProps } from "./TaskInterfaces";

const Task = ({
  _id,
  complete,
  user_id,
  task,
  deleteTask,
  completeTask,
}: TaskProps): React.ReactElement => {
  // const [isShowingDetails, setShowingDetails] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const DelayDelete = () => {
    if (complete === true) {
      setDeleting(true);
      setTimeout(() => {
        deleteTask(_id, complete === true);
        setDeleting(false);
      }, 5000);
    } else {
      return;
    }
  };

  useEffect(() => {
    DelayDelete();
  });

  return (
    <div
      className={`${
        deleting ? "animate-fade-out" : ""
      } w-full p-3 m-auto mb-3 bg-gray-800 rounded-xl md:w-6/12 `}
    >
      <div className="flex flex-row">
        <div className="flex self-center justify-between w-full">
          <div className="flex flex-row">
            <div
              className={`self-center p-1 border-2 border-solid rounded-lg cursor-pointer border-brand-primary hover:opacity-80 ${
                complete === true && "bg-brand-primary"
              }`}
              onClick={() => completeTask(_id, !complete)}
            >
              <FaCheck
                className={`${
                  complete ? "visible text-brand-secondary" : "invisible"
                }`}
                size="20"
              />
            </div>
            <h3 className="ml-3 font-semibold tracking-wider">{task}</h3>
          </div>
          {/* )} */}
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
