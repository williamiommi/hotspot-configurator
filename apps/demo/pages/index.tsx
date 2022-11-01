import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Footer from '../components/Footer';
import ExternalLink from '../components/icons/ExternalLink';
import Logo from '../components/icons/Logo';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Contentful Hotspot Configurator</title>
      </Head>
      <div className="mt-20 sm:mt-0 sm:grid sm:place-items-center sm:h-screen">
        <div className="p-2 pb-5 sm:bg-gray-100 sm:rounded-3xl sm:shadow-2xl sm:p-20 sm:pb-5">
          <div className="pb-20">
            <Logo className="max-w-xs mx-auto pb-10" />
            <h1 className="font-bold text-4xl mb-4 text-center">Hotspot Configurator</h1>
            <div className="flex flex-col text-center items-center gap-4 mt-20">
              <Link href="/demo">
                <a className="bg-blue-700 text-white p-4 rounded-lg w-full max-w-96 transition-colors duration-300 font-bold hover:bg-blue-800">
                  DEMO
                </a>
              </Link>
              <Link href="/playground">
                <a className="border border-blue-700 text-black p-4 rounded-lg w-full max-w-96 transition-colors duration-300 font-bold hover:bg-white/70">
                  PLAYGROUND
                </a>
              </Link>
              <Link href="/">
                <a
                  className="underline transition-opacity hover:opacity-70 flex items-center justify-center gap-2"
                  target="_blank"
                >
                  Visit the article <ExternalLink />
                </a>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
