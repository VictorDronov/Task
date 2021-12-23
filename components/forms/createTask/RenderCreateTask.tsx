import React, { Dispatch, SetStateAction } from "react";
import TaskForm from "./CreateTask";
import AddButton from "@components/atoms/common/CreateTaskButton";

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
