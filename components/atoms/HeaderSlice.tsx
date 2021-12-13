import React from "react";
import { FaLeaf } from "react-icons/fa";
import { useRouter } from "next/router";
import { realmApp } from "../../lib/realm";

const Header = (): React.ReactElement => {
  const router = useRouter();

  const LogOut = () => {
    realmApp.currentUser?.logOut();
    router.push("/");
  };

  return (
    <div className="flex flex-row justify-between w-full mt-6">
      <div className="flex">
        {/* <FaLeaf className="mt-2 mr-2 text-green-500" size={30} /> */}
        <h1 className="text-4xl font-bold text-center text-transparent cursor-default md:text-5xl bg-clip-text bg-gradient-to-r from-green-500 to-brand-primary">
          Task.
        </h1>
      </div>
      <div>
        <button
          className="border-none text-brand-primary hover:text-brand-primary hover:text-opacity-80"
          onClick={() => LogOut()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
