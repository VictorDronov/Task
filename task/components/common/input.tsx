import React, { useState } from "react";
import { FieldErrors } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Input = ({
  id,
  name,
  label,
  rule = {},
  register,
  type = "text",
  errors = {},
  showPassword,
  placeholder = "",
  ...rest
}: InputProps): React.ReactElement => {
  // store the type prop in state so that it can be changed to show/hide the value in a password input
  const [inputType, setInputType] = useState(type);
  /**
   * Reveals or hides the value in a password input by toggling
   * the 'type' on the input between 'text' and 'password'
   */
  const toggleHiddenPassword = (event: React.MouseEvent) => {
    event.preventDefault();
    setInputType((prevType) => (prevType === "password" ? "text" : "password"));
  };
  return (
    <div className={`form-input${errors[name] ? " error" : ""}`}>
      {label && <label htmlFor={id}>{label} :</label>}
      <div className="input-field">
        <input
          id={id}
          type={inputType}
          {...register(rule)}
          autoComplete="off"
          autoCapitalize="off"
          placeholder={placeholder}
          {...rest}
        />
        {showPassword ? (
          <button
            type="button"
            className="show-hide-btn"
            tabIndex={-1} // Prevents button from being selected while tabbing
            onClick={toggleHiddenPassword}
          >
            {inputType === "password" ? (
              <AiOutlineEye />
            ) : (
              <AiOutlineEyeInvisible />
            )}
          </button>
        ) : null}
      </div>
      {errors[name] && (
        <div>
          <span>*</span> {errors[name].message}
        </div>
      )}
    </div>
  );
};

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  id: string;
  name: string;
  label?: string;
  register?: any;
  rule?: {};
  type?: string;
  errors?: FieldErrors;
  showPassword?: boolean;
  placeholder?: string;
}

export default Input;
