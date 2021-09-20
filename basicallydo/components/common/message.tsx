import React from "react";
import { useForm } from "react-hook-form";

const Message = ({ label, type, rule }: FormProps): React.ReactElement => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <label className="flex flex-col">
      {label} &nbsp;
      <input
        type={type}
        {...register(type, {
          required: rule,
        })}
      />
      <p className="h-3">
        {errors.type && <p className="text-red-600">{errors.type.message}</p>}
      </p>
    </label>
  );
};

interface FormProps {
  name?: string;
  label?: string;
  type: string;
  rule?: string;
}

export default Message;
