import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import { realmApp } from '../lib/realm';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  console.log(realmApp.currentUser);

  const isAuthenticated = !!realmApp.currentUser;

  return <Component {...pageProps} />;
}

export default MyApp;
