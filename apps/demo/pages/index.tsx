import type { NextPage } from 'next';
import Link from 'next/link';
import ExternalLink from '../components/icons/ExternalLink';
import Logo from '../components/icons/Logo';

const Home: NextPage = () => {
  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-gray-100 p-20 rounded-3xl shadow-2xl">
        <Logo className="max-w-xs mx-auto py-10" />
        <h1 className="font-bold text-4xl mb-4 text-center">Hotspot Configurator</h1>
        <div className="flex flex-col text-center items-center gap-4 mt-20">
          <Link href="/demo">
            <a className="bg-blue-700 text-white p-4 rounded-lg w-96 transition-colors duration-300 font-bold hover:bg-blue-800">
              DEMO
            </a>
          </Link>
          <Link href="/playground">
            <a className="border border-blue-700 text-black p-4 rounded-lg w-96 transition-colors duration-300 font-bold hover:bg-white/70">
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
    </div>
  );
};

export default Home;
