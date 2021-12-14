import React from "react";
import { Footer, Header } from "../atoms";

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
