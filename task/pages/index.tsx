import { ContentWrapper } from "@components/index";
import { useRouter } from "next/router";
import React from "react";

const Landing = (): React.ReactElement => {
  const router = useRouter();

  return (
    <ContentWrapper header={false}>
      <div className="flex flex-col items-center justify-center max-w-md min-h-screen m-auto ">
        <div className="font-bold text-center text-transparent cursor-default">
          <h1 className="mb-6 text-4xl md:text-5xl bg-clip-text bg-gradient-to-r from-green-500 to-brand-primary">
            Welcome to Task.
          </h1>
        </div>
        <div className="text-brand-primary">
          <p className="mb-6 text-lg text-center md:text-xl">
            Task is a app for you to make a list of tasks to complete. (duh)
          </p>
          <p className="text-lg text-center ">
            To get started
            <a
              className="ml-2 font-bold text-green-500 cursor-pointer hover:opacity-80"
              onClick={() => router.push("/auth")}
            >
              Sign In!
            </a>
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default Landing;
