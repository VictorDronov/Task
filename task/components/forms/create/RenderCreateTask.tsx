import React, { Dispatch, SetStateAction } from "react";
import AddButton from "@components/atoms/CreateTaskButton";
import TaskForm from "./CreateTask";

export interface CreateTaskModalProps {
  isVisibile: boolean;
  setIsVisibile: Dispatch<SetStateAction<boolean>>;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const RenderCreateTaskModal = ({
  isLoading,
  isVisibile,
  setIsVisibile,
  setLoading,
  setRefreshing,
}: CreateTaskModalProps): React.ReactElement => {
  return (
    <>
      {isVisibile ? (
        <TaskForm
          isVisibile={isVisibile}
          setLoading={setLoading}
          isLoading={isLoading}
          setRefreshing={setRefreshing}
          setIsVisibile={setIsVisibile}
        />
      ) : (
        <AddButton setIsVisibile={setIsVisibile} />
      )}
    </>
  );
};

export default RenderCreateTaskModal;
