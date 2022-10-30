import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useInitDemo } from '../lib/hooks/useInitApp';
import ModalsWrapper from '../components/ModalsWrapper';

function MyApp({ Component, pageProps }: AppProps) {
  useInitDemo();
  return (
    <>
      <Component {...pageProps} />
      <ModalsWrapper />
    </>
  );
}

export default MyApp;
