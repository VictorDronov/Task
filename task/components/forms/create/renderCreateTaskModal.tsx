import AddButton from "@components/common/addTaskbutton";
import { ModalComponentProps } from "@components/common/modal/modal";
import { CreateTaskForm } from "@components/index";
import React, { Dispatch, SetStateAction } from "react";
import { Modal } from "../../common/modal";

export interface CreateTaskModalProps extends ModalComponentProps {
  isVisibile?: boolean;
  setIsVisibile: Dispatch<SetStateAction<boolean>>;
  setRefreshing: Dispatch<SetStateAction<boolean>>;
  closeModal: () => void;
}

const RenderCreateTaskModal = ({
  isVisibile,
  setIsVisibile,
  closeModal,
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
