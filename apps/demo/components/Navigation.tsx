import Link from 'next/link';
import { useRouter } from 'next/router';
import ExternalLink from './icons/ExternalLink';
import LogoIcon from './icons/LogoIcon';

const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <header className="flex items-center justify-between py-4 px-3 mb-10 bg-gray-100/70">
      <Link href="/" className="flex items-center gap-4 w-[300px]">
        <LogoIcon className="w-10" />
        <h1 className="font-bold text-2xl italic">Hotspot Configurator</h1>
      </Link>
      <nav className="flex gap-4 flex-grow justify-center">
        <Link
          href="/playground"
          className={`text-2xl border-b border-b-transparent ${
            pathname === '/playground' ? '!border-b-black' : ''
          }`}
        >
          Playground
        </Link>
        <Link
          href="/demo"
          className={`text-2xl border-b border-b-transparent ${
            pathname === '/demo' ? '!border-b-black' : ''
          }`}
        >
          Demo
        </Link>
      </nav>
      <div className="w-[300px] flex justify-end">
        <Link
          href=""
          target="_blank"
          className="flex items-center gap-2 bg-blue-700 text-white p-4 rounded-lg transition-colors duration-300 font-bold hover:bg-blue-800"
        >
          View the article <ExternalLink />
        </Link>
      </div>
    </header>
  );
};

export default Navigation;
