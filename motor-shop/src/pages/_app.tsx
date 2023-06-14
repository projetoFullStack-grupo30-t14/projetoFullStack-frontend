import ModalProvider from "@/contexts/modalContext";
import { AuthProvider } from "@/contexts/authContext";
import { UserProvider } from "@/contexts/userContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <AuthProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </AuthProvider>
    </ModalProvider>
  );
}
