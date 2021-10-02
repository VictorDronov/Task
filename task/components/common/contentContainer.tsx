import React from "react";
import Footer from "./footer";
import Header from "./header";

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
    <div className="min-h-screen bg-brand-secondary">
      <div className="container flex flex-col justify-center text-center text-brand-text">
        {header && <Header />}
        {children}
        {footer && <Footer />}
      </div>
    </div>
  );
};
export default ContentWrapper;
