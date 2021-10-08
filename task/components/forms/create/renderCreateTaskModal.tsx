import AddButton from "@components/common/AddTaskbutton";
import { ModalComponentProps } from "@components/common/modal/Modal";
import { CreateTaskForm } from "@components/index";
import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "../../common/modal";

export interface CreateTaskModalProps extends ModalComponentProps {
  isVisibile: boolean;
  setIsVisibile: Dispatch<SetStateAction<boolean>>;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}

const RenderCreateTaskModal = ({
  isLoading,
  isVisibile,
  setIsVisibile,
  closeModal,
  setLoading,
  setRefreshing,
}: CreateTaskModalProps): React.ReactElement => {
  return (
    <>
      {isVisibile && (
        <Modal.Component
          centered
          visible={isVisibile}
          setVisible={setIsVisibile}
          component={() => (
            <CreateTaskForm
              isVisibile={isVisibile}
              setLoading={setLoading}
              isLoading={isLoading}
              setRefreshing={setRefreshing}
              closeModal={closeModal}
              setIsVisibile={setIsVisibile}
            />
          )}
        />
      )}
      <AddButton setIsVisibile={setIsVisibile} />
    </>
  );
};

export default RenderCreateTaskModal;
