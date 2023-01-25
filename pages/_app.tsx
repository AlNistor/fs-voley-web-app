import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import { AppContextProvider } from '../context/ContextProvider';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <AppContextProvider>
      <SessionProvider {...{ session }}>
        <ChakraProvider>
          <Component {...pageProps} />
          <ToastContainer />
        </ChakraProvider>
      </SessionProvider>
    </AppContextProvider>
  );
}
