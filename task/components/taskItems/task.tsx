import React, { Dispatch, SetStateAction, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";

interface ITaskProps {
  details: {
    _id: string;
    description: string;
    title: string;
    user_id: string;
    complete: boolean;
  };
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  isRefreshing: boolean;
  Delete: (id: string) => void;
}

const Task = ({
  Delete,
  details,
  isRefreshing,
  setRefreshing,
}: ITaskProps): React.ReactElement => {
  const [isShowingDetails, setShowingDetails] = useState<boolean>(false);

  return (
    <div className="w-full p-3 m-auto mb-3 bg-gray-800 rounded-xl md:w-6/12">
      <div className="flex flex-row">
        <div className="flex self-center justify-between w-full">
          {details.complete === true ? (
            <h3 className="ml-3 line-through">{details.title}</h3>
          ) : (
            <>
              <div className="p-3 border-2 border-solid rounded-md cursor-pointer border-brand-primary hover:opacity-80" />
              <h3 className="ml-3">{details.title}</h3>
            </>
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
          <p className="mt-3 text-center">{details.description}</p>
          <div className="flex justify-center mt-3">
            {!details.complete && <button> Update</button>}
            <button
              className="ml-3 text-red-600 border-red-600 hover:text-red-700 hover:border-red-700"
              onClick={() => Delete(details._id)}
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
