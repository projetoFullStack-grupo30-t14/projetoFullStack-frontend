import ModalProvider from "@/contexts/modalContext";
import { AuthProvider } from "@/contexts/authContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ModalProvider>
  );
}
