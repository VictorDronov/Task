import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { ITaskProps, TaskProps } from "./taskInterfaces";

const Task = ({
  _id,
  complete,
  description,
  user_id,
  title,
  deleteTask,
  updateTask,
}: TaskProps): React.ReactElement => {
  const [isShowingDetails, setShowingDetails] = useState<boolean>(false);

  return (
    <div className="w-full p-3 m-auto mb-3 bg-gray-800 rounded-xl md:w-6/12">
      <div className="flex flex-row">
        <div className="flex self-center justify-between w-full">
          {complete === true ? (
            <div className="flex flex-row">
              <div
                className="self-center p-1 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80 bg-brand-primary"
                onClick={() => updateTask(_id, !complete)}
              >
                <FaCheck className="text-brand-secondary" />
              </div>
              <h3 className="ml-3 font-semibold tracking-wider line-through">
                {title}
              </h3>
            </div>
          ) : (
            <div className="flex flex-row">
              <div
                className="p-3 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80"
                onClick={() => updateTask(_id, !complete)}
              />
              <h3 className="ml-3 font-semibold tracking-wider">{title}</h3>
            </div>
          )}
          {isShowingDetails ? (
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
          )}
        </div>
      </div>
      {isShowingDetails && (
        <>
          <p className="mt-3 text-base text-center">{description}</p>
          <div className="flex justify-center mt-3">
            {!complete && <button> Update</button>}
            <button
              className="ml-3 text-red-600 border-red-600 hover:text-red-700 hover:border-red-700"
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
