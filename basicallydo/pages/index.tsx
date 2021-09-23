import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { CreateTaskForm, Tasks } from "../components";

const Home: NextPage = () => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const router = useRouter();

  const LogOut = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <div className="min-h-screen bg-brand-secondary">
      <div className="container flex flex-col justify-center text-center text-brand-text">
        <div className="flex flex-row justify-between w-full mt-6">
          <div className="flex">
            <FaLeaf className="mt-2 mr-2 text-green-500" size={40} />
            <h1 className="text-5xl font-bold text-center text-transparent cursor-default bg-clip-text bg-gradient-to-r from-green-500 to-brand-primary">
              Task.
            </h1>
          </div>
          <div className="">
            <button
              className="border-none text-brand-primary hover:text-brand-primary hover:text-opacity-80"
              onClick={() => LogOut()}
            >
              Log Out
            </button>
          </div>
        </div>
        <div className="w-full m-auto">
          <div className="flex-col items-center justify-center max-w-sm m-auto mt-8">
            <CreateTaskForm setRefreshing={setRefreshing} />
          </div>
        </div>
        <h2 className="mt-6 mb-6 font-semibold text-brand-primary">
          Your Tasks
        </h2>
        <Tasks isRefreshing={isRefreshing} setRefreshing={setRefreshing} />
      </div>
    </div>
  );
};

export default Home;
