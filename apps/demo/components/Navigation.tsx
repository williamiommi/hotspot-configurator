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
      <Link href="/">
        <a className="flex items-center gap-4 w-[300px]">
          <LogoIcon className="w-7 lg:w-10" />
          <h1 className="font-bold italic lg:text-2xl">Hotspot Configurator</h1>
        </a>
      </Link>
      <nav className="hidden gap-4 flex-grow justify-center lg:flex">
        <Link href="/playground">
          <a
            className={`text-2xl border-b border-b-transparent ${
              pathname === '/playground' ? '!border-b-black' : ''
            }`}
          >
            Playground
          </a>
        </Link>
        <Link href="/demo">
          <a
            className={`text-2xl border-b border-b-transparent ${
              pathname === '/demo' ? '!border-b-black' : ''
            }`}
          >
            Demo
          </a>
        </Link>
      </nav>
      <div className="hidden w-[300px] justify-end lg:flex">
        <Link href="">
          <a
            target="_blank"
            className="flex items-center gap-2 bg-blue-700 text-white p-4 rounded-lg transition-colors duration-300 font-bold hover:bg-blue-800"
          >
            View the article <ExternalLink />
          </a>
        </Link>
      </div>
      <Menu>
        <Menu.Trigger>
          <IconButton
            className="lg:!hidden"
            variant="transparent"
            icon={<MenuIcon />}
            aria-label="toggle menu"
          />
        </Menu.Trigger>
        <Menu.List className="!p-0 lg:!hidden">
          <Menu.Item className="!p-0">
            <Link href="/playground">
              <a
                className={`p-3 block w-full text-lg ${
                  pathname === '/playground' ? 'bg-blue-600/10' : ''
                }`}
              >
                Playground
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item className="!p-0">
            <Link href="/demo">
              <a
                className={`p-3 block w-full text-lg ${
                  pathname === '/demo' ? 'bg-blue-600/10' : ''
                }`}
              >
                Demo
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item className="!py-5 hover:!bg-transparent hover:!cursor-auto">
            <Link href="">
              <a
                target="_blank"
                className="flex items-center gap-2 bg-blue-700 text-white p-4 rounded-lg transition-colors duration-300 font-bold hover:bg-blue-800"
              >
                View the article <ExternalLink />
              </a>
            </Link>
          </Menu.Item>
        </Menu.List>
      </Menu>
    </header>
  );
};

export default Navigation;
