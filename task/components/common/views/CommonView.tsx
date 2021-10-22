import React from "react";
import Footer from "../FooterSlice";
import Header from "../HeaderSlice";

interface IProps {
  header?: boolean;
  footer?: boolean;
  children?: JSX.Element | JSX.Element[];
}

const ContentWrapper = ({
  children,
  footer = false,
  header = false,
}: IProps): React.ReactElement => {
  return (
    <div className="h-screen min-h-screen bg-brand-secondary">
      <div className="container flex flex-col justify-center text-center text-brand-text">
        {header && <Header />}
        {children}
      </div>
      {footer && <Footer />}
    </div>
  );
};
export default ContentWrapper;
