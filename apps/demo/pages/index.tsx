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
      <div className='mt-20 sm:mt-0 sm:grid sm:h-screen sm:place-items-center'>
        <div className='p-2 pb-5 sm:rounded-3xl sm:bg-gray-100 sm:p-20 sm:pb-5 sm:shadow-2xl'>
          <div className='pb-20'>
            <h1 className='mb-4 text-center text-4xl font-bold'>Hotspot Configurator</h1>
            <div className='mt-20 flex flex-col items-center gap-4 text-center'>
              <Link href='/demo'>
                <a className='max-w-96 w-full rounded-lg bg-blue-700 p-4 font-bold text-white transition-colors duration-300 hover:bg-blue-800'>
                  DEMO
                </a>
              </Link>
              <Link href='/playground'>
                <a className='max-w-96 w-full rounded-lg border border-blue-700 p-4 font-bold text-black transition-colors duration-300 hover:bg-white/70'>
                  PLAYGROUND
                </a>
              </Link>
              <Link href='/'>
                <a
                  className='flex items-center justify-center gap-2 underline transition-opacity hover:opacity-70'
                  target='_blank'
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
