import React, { Dispatch, SetStateAction, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { mongodb } from "../../lib/realm";

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
}

const Task = ({
  details,
  isRefreshing,
  setRefreshing,
}: ITaskProps): React.ReactElement => {
  const [isShowingDetails, setShowingDetails] = useState<boolean>(false);
  const [isUpdating, showUpdating] = useState<boolean>(false);
  const [updateContent, setUpdatedContent] = useState<{
    title: string;
    description: string;
  }>();

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

  const Update = (
    id: string,
    user_id: string,
    title: string,
    description: string,
    complete: boolean
  ) => {
    mongodb
      ?.db("user_tasks")
      .collection("tasks")
      .updateOne(
        { _id: id },
        {
          user_id: user_id,
          title: title,
          description: description,
          complete: complete,
        }
      )
      .then(() => {
        setRefreshing(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="w-full p-3 m-auto mb-3 bg-gray-800 rounded-xl md:w-6/12">
      <div className="flex flex-row">
        {!details.complete ? (
          <div
            className="flex self-start p-3 border-2 border-red-600 border-solid rounded-lg cursor-pointer"
            onClick={() => {
              Update(
                details._id,
                details.user_id,
                details.title,
                details.description,
                !details.complete
              );
            }}
          />
        ) : (
          <div
            className="flex self-start p-1 border-2 border-green-500 border-solid rounded-lg cursor-pointer"
            onClick={() => {
              Update(
                details._id,
                details.user_id,
                details.title,
                details.description,
                !details.complete
              );
            }}
          >
            <FaCheck className="text-green-500" />
          </div>
        )}
        <div className="flex self-center justify-between w-full">
          {isUpdating ? (
            <label className="m-0 ml-3">
              <input
                className="ml-3"
                value={details.title}
                type="text"
                name="title"
                onChange={(e) => {
                  console.log(e.target.title);
                }}
              />
            </label>
          ) : (
            <>
              {details.complete === true ? (
                <h3 className="ml-3 line-through">{details.title}</h3>
              ) : (
                <h3 className="ml-3">{details.title}</h3>
              )}
            </>
          )}
          {isShowingDetails ? (
            <FaAngleUp
              size={20}
              onClick={() => setShowingDetails(false)}
              className="self-center cursor-pointer text-brand-primary"
            />
          ) : (
            <FaAngleDown
              size={20}
              onClick={() => setShowingDetails(true)}
              className="self-center cursor-pointer text-brand-primary"
            />
          )}
        </div>
      </div>
      {isShowingDetails && (
        <>
          {isUpdating ? (
            <label>
              <textarea
                name="description"
                className="w-full placeholder-gray-500 border-none outline-none resize-none bg-brand-secondary text-brand-text"
                value={details.description}
                // onChange={(e) => {
                //   console.log(e.target.value);
                // }}
              />
            </label>
          ) : (
            <p className="mt-3 text-center">{details.description}</p>
          )}
          <div className="flex justify-center mt-3">
            {isUpdating ? (
              <>
                <button onClick={() => showUpdating(false)}>
                  Cancel Update
                </button>
                <button
                  className="ml-3"
                  onClick={() => {
                    Update(
                      details._id,
                      details.user_id,
                      details.title,
                      details.description,
                      details.complete
                    );
                  }}
                >
                  Submit Update
                </button>
              </>
            ) : (
              <>
                {!details.complete && (
                  <button onClick={() => showUpdating(false)}> Update</button>
                )}
              </>
            )}
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
