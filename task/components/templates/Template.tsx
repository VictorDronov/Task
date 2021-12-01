import React from "react";
import Footer from "../atoms/FooterSlice";
import Header from "../atoms/HeaderSlice";

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
    <div className="flex flex-col items-stretch min-w-full min-h-screen bg-brand-secondary">
      <div className="container flex-grow text-brand-text">
        {header && <Header />}
        {children}
      </div>
      {footer && <Footer />}
    </div>
  );
};
export default ContentWrapper;
