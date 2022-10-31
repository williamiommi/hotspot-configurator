import Link from 'next/link';
import { useRouter } from 'next/router';
import ExternalLink from './icons/ExternalLink';
import LogoIcon from './icons/LogoIcon';
import { Menu, IconButton } from '@contentful/f36-components';
import { MenuIcon } from '@contentful/f36-icons';

const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <header className="flex items-center justify-between py-4 px-3 mb-10 bg-gray-100/70">
      <Link href="/" className="flex items-center gap-4 w-[300px]">
        <LogoIcon className="w-7 lg:w-10" />
        <h1 className="font-bold italic lg:text-2xl">Hotspot Configurator</h1>
      </Link>
      <nav className="hidden gap-4 flex-grow justify-center lg:flex">
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
      <div className="hidden w-[300px] justify-end lg:flex">
        <Link
          href=""
          target="_blank"
          className="flex items-center gap-2 bg-blue-700 text-white p-4 rounded-lg transition-colors duration-300 font-bold hover:bg-blue-800"
        >
          View the article <ExternalLink />
        </Link>
      </div>
      <nav className="lg:hidden">
        <Menu>
          <Menu.Trigger>
            <IconButton variant="transparent" icon={<MenuIcon />} aria-label="toggle menu" />
          </Menu.Trigger>
          <Menu.List>
            <Menu.Item>
              <Link
                href="/playground"
                className={`text-lg border-b border-b-transparent ${
                  pathname === '/playground' ? '!border-b-black' : ''
                }`}
              >
                Playground
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                href="/demo"
                className={`text-lg border-b border-b-transparent ${
                  pathname === '/demo' ? '!border-b-black' : ''
                }`}
              >
                Demo
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                href=""
                target="_blank"
                className="flex items-center gap-2 bg-blue-700 text-white p-4 rounded-lg transition-colors duration-300 font-bold hover:bg-blue-800"
              >
                View the article <ExternalLink />
              </Link>
            </Menu.Item>
          </Menu.List>
        </Menu>
      </nav>
    </header>
  );
};

export default Navigation;
