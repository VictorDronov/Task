import React from "react";
import { FieldError } from "react-hook-form";

interface ErrorMessageProps {
  name: FieldError | undefined;
  message: string | undefined;
  styles?: string | undefined;
}

const ErrorMessage = ({
  message,
  name,
  styles,
}: ErrorMessageProps): React.ReactElement => {
  return (
    <>
      {name && (
        <p className={`w-full text-center text-red-600 ${styles}`}>{message}</p>
      )}
    </>
  );
};

export default ErrorMessage;
