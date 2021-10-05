import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { realmApp } from "../lib/realm";
import { useRouter } from "next/router";
import { useEffect } from "react";

const isAuthenticated = !!realmApp.currentUser;

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const CheckAuth = (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      router.push("/my-tasks");
    } else {
      router.push("/auth");
    }
  };

  useEffect(() => {
    CheckAuth(isAuthenticated);
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
