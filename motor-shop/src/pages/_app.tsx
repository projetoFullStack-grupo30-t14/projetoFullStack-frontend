import ModalProvider from "@/contexts/modalContext";
import { AuthProvider } from "@/contexts/authContext";
import { UserProvider } from "@/contexts/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CarProvider } from "@/contexts/carContext";
import CommentProvider from "@/contexts/commentContext";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MotorShop</title>
      </Head>
      <ModalProvider>
        <ToastContainer autoClose={1600} />
        <CarProvider>
          <AuthProvider>
            <UserProvider>
              <CommentProvider>
                <Component {...pageProps} />
              </CommentProvider>
            </UserProvider>
          </AuthProvider>
        </CarProvider>
      </ModalProvider>
    </>
  );
}
