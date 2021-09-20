import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { CreateTaskForm, Tasks } from "../components";

const Home: NextPage = () => {
  const [isRefreshing, setRefreshing] = useState<boolean>(true);
  const router = useRouter();

  const LogOut = () => {
    localStorage.clear();
    router.push("/auth");
  };

  return (
    <div>
      <>
        <button onClick={() => LogOut()}>Log Out</button>
        <div className="flex flex-col justify-center text-center">
          <h1 className="mt-3 font-extrabold">Task</h1>
          <CreateTaskForm setRefreshing={setRefreshing} />
          <h2 className="mt-6 mb-6 font-semibold">Your Tasks</h2>
          <Tasks isRefreshing={isRefreshing} setRefreshing={setRefreshing} />
        </div>
      </>
    </div>
  );
};

export default Home;
