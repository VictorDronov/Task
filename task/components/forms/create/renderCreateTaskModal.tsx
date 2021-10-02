import { ModalComponentProps } from "@components/common/modal/modal";
import { CreateTaskForm } from "@components/index";
import React, { Dispatch, SetStateAction, useState } from "react";
import { FaPlus } from "react-icons/fa";
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
  return isVisibile ? (
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
  ) : (
    <div
      className="flex flex-row p-2 border-2 border-gray-700 border-solid rounded-md cursor-pointer hover:opacity-80"
      onClick={() => setIsVisibile(true)}
    >
      <div className="p-2 rounded-lg bg-brand-lightSecondary">
        <FaPlus className="self-center text-green-500" />
      </div>
      <p className="self-center ml-3 text-base font-bold">Add a task.</p>
    </div>
  );
};

export default RenderCreateTaskModal;
