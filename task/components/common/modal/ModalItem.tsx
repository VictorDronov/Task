import React, { useEffect, useState } from "react";

export const Component = ({
  component: Component,
  closable = true,
  centered = false,
  visible,
  setVisible,
}: ModalProps): React.ReactElement => {
  const [showContents, setShowContents] = useState(visible);

  const closeModal = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) setTimeout(() => setShowContents(false), 500);
    else setShowContents(true);
  }, [visible]);

  return (
    <div
      className={`fixed top-0 left-0 opacity-100 z-50 transition cursor-pointer h-screen w-screen bg-brand-secondary bg-opacity-70 ${
        visible ? "" : "opacity-0 transition -z-1"
      }${centered ? "flex justify-center items-center" : ""}`}
      onClick={closable ? () => setVisible(false) : () => null}
    >
      <div
        className={`cursor-auto w-full mx-auto my-auto rounded-md flex flex-col flex-nowrap relative`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-11/12 m-auto">
          {showContents && <Component closeModal={closeModal} />}
        </div>
      </div>
    </div>
  );
};

interface ModalProps {
  component: React.ComponentType<ModalComponentProps>;
  closable?: boolean;
  centered?: boolean;
  visible: boolean;
  setVisible: React.Dispatch<boolean>;
}

export interface ModalComponentProps {
  closeModal: () => void;
}
