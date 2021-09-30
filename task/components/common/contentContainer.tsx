import React from "react";
import Header from "./header";

interface IProps {
  children?: JSX.Element | JSX.Element[];
}

const ContentWrapper = ({ children }: IProps): React.ReactElement => {
  return (
    <div className="min-h-screen bg-brand-secondary">
      <div className="container flex flex-col justify-center text-center text-brand-text">
        <Header />
        {children}
      </div>
    </div>
  );
};
export default ContentWrapper;
