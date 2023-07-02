import ModalProvider from '@/contexts/modalContext';
import { AuthProvider } from '@/contexts/authContext';
import { UserProvider } from '@/contexts/userContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CarProvider } from '@/contexts/carContext';
import CommentProvider from '@/contexts/commentContext';

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
