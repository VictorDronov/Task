import React from "react";
import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  name: FieldError | undefined;
  message: string | undefined;
}

const ErrorMessage = ({
  message,
  name,
}: ErrorMessageProps): React.ReactElement => {
  return (
    <>{name && <p className="w-full text-center text-red-600">{message}</p>}</>
  );
};

export default ErrorMessage;
