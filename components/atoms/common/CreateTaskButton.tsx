import React, { Dispatch, SetStateAction } from "react";
import { FaPlus } from "react-icons/fa";

interface AddButtonProps {
  setIsVisibile: Dispatch<SetStateAction<boolean>>;
}

const AddButton = ({ setIsVisibile }: AddButtonProps): React.ReactElement => {
  return (
    <div
      className="flex flex-row w-full p-2 m-auto mt-3 mb-4 border-2 border-gray-700 border-solid rounded-md cursor-pointer hover:opacity-80 md:w-2/4"
      onClick={() => setIsVisibile(true)}
    >
      <div className="p-2 rounded-lg bg-brand-lightSecondary">
        <FaPlus className="self-center text-brand-primary" />
      </div>
      <p className="self-center ml-3 text-base font-bold">Add a task.</p>
    </div>
  );
};

export default AddButton;
