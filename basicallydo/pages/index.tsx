import { useRouter } from "next/router";
import React from "react";

const Landing = (): React.ReactElement => {
  const router = useRouter();

  return (
    <div className="bg-brand-secondary ">
      <div className="flex flex-col items-center justify-center max-w-sm min-h-screen m-auto ">
        <h1 className="mb-6 text-5xl font-bold text-center text-transparent cursor-default bg-clip-text bg-gradient-to-r from-green-500 to-brand-primary">
          Welcome to Task
        </h1>
        <div className="text-brand-primary">
          <p className="mb-6 text-xl text-center">
            Task is a app for you to make a list of tasks to complete. (duh)
          </p>
          <p className="text-lg text-center ">
            To get started
            <a
              className="font-bold text-green-500 cursor-pointer hover:opacity-80"
              onClick={() => router.push("/auth")}
            >
              Sign In!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
