import { FaLeaf } from "react-icons/fa";
import React from "react";
import AuthForm from "./Authentication";

const RenderAuth = (): React.ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-md min-h-screen m-auto">
      <div className="flex flex-row ">
        <FaLeaf className="mt-2 mr-2 text-green-500" size={60} />
        <h1 className="font-bold text-center text-transparent cursor-default text-7xl bg-clip-text bg-gradient-to-r from-green-500 to-brand-primary">
          Task.
        </h1>
      </div>
      <AuthForm />
    </div>
  );
};

export default RenderAuth;
