import RenderAuth from "@components/forms/authentication/RenderAuthForm";
import { Template } from "@components/templates";
import React from "react";

const Login = (): React.ReactElement => {
  return (
    <Template>
      <RenderAuth />
    </Template>
  );
};

export default Login;
