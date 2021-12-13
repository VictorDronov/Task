import React, { useEffect, useState } from "react";
import { FaAngleDown, FaAngleUp, FaCheck } from "react-icons/fa";
import { TaskProps } from "./interfaces/TaskItemInterfaces";

const TaskItem = ({
  _id,
  complete,
  task,
  deleteTask,
  completeTask,
}: TaskProps): React.ReactElement => {
  const [show, setShow] = useState<boolean>(true);
  const [deleting, setDeleting] = useState<boolean>(false);

  const delayDelete = () => {
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
    if (typeof window === "object") {
      const e = document.getElementById(`${_id}`);
      const toggle = document.getElementById(`toggle${_id}`);
      const isEllipsisActive = (e: HTMLElement | null) => {
        if (e && toggle) {
          if (e.offsetWidth < e.scrollWidth === false) {
            toggle.classList.add("hide");
          }
        }
      };
      isEllipsisActive(e);
    }
  }, [_id]);

  useEffect(() => {
    delayDelete();
  });

  return (
    <div
      className={`${
        deleting ? "animate-fade-out" : ""
      } w-full p-3 m-auto mb-3 bg-gray-800  rounded-xl md:w-6/12 `}
    >
      <div className="relative flex flex-row">
        <div className="flex self-center justify-between w-full ">
          <div className="flex flex-row ">
            <div
              className={` absolute top-0 left-0 self-center p-1 border-2 border-solid rounded-lg cursor-pointer border-brand-primary hover:opacity-80  ${
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
            <h3
              id={_id}
              className={`ml-10 overflow-hidden font-semibold tracking-wider tablet:w-full w-36 text-left ${
                show ? "whitespace-nowrap overflow-ellipsis " : "break-words"
              }`}
            >
              {task}
            </h3>
            {show ? (
              <FaAngleUp
                id={`toggle${_id}`}
                className="show text-brand-primary"
                onClick={() => setShow(false)}
                size={30}
              />
            ) : (
              <FaAngleDown
                className="show text-brand-primary"
                onClick={() => setShow(true)}
                size={30}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
