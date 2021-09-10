import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { CreateTaskForm, Tasks } from "../components";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const [isSignedIn, setSignedIn] = useState(false);
  const router = useRouter();

  const check = () => {
    if (localStorage.getItem("Token")) {
      setSignedIn(true);
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    check();
  }, []);

  const logOut = () => {
    localStorage.removeItem("Token");
    setSignedIn(false);
    router.push("/auth");
  };

  return (
    <div>
      {isSignedIn && (
        <>
          <button onClick={() => logOut()}>Log Out</button>
          <div className="flex flex-col justify-center text-center">
            <h1 className="mt-3 font-extrabold">Task</h1>
            <CreateTaskForm />
            <h2 className="mt-6 mb-6 font-semibold">Your Tasks</h2>
            <Tasks />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
