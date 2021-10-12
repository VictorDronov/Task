import AddButton from "@components/common/AddTaskbutton";
import { CreateTaskForm } from "@components/index";
import React, { Dispatch, SetStateAction } from "react";

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
        <CreateTaskForm
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
