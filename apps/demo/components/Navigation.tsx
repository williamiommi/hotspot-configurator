import Link from 'next/link';
import { useRouter } from 'next/router';
import ExternalLink from './icons/ExternalLink';
import LogoIcon from './icons/LogoIcon';
import { Menu, IconButton } from '@contentful/f36-components';
import { MenuIcon } from '@contentful/f36-icons';

const Navigation = () => {
  const { pathname } = useRouter();
  return (
    <header className='mb-10 flex items-center justify-between bg-gray-100/70 py-4 px-3'>
      <Link href='/'>
        <a className='flex w-[300px] items-center gap-4'>
          <h1 className='font-bold italic lg:text-2xl'>Hotspot Configurator</h1>
        </a>
      </Link>
      <nav className='hidden flex-grow justify-center gap-4 lg:flex'>
        <Link href='/playground'>
          <a
            className={`border-b border-b-transparent text-2xl ${
              pathname === '/playground' ? '!border-b-black' : ''
            }`}
          >
            Playground
          </a>
        </Link>
        <Link href='/demo'>
          <a
            className={`border-b border-b-transparent text-2xl ${
              pathname === '/demo' ? '!border-b-black' : ''
            }`}
          >
            Demo
          </a>
        </Link>
      </nav>
      <div className='hidden w-[300px] justify-end lg:flex'>
        <Link href=''>
          <a
            target='_blank'
            className='flex items-center gap-2 rounded-lg bg-blue-700 p-4 font-bold text-white transition-colors duration-300 hover:bg-blue-800'
          >
            View the article <ExternalLink />
          </a>
        </Link>
      </div>
      <Menu>
        <Menu.Trigger>
          <IconButton
            className='lg:!hidden'
            variant='transparent'
            icon={<MenuIcon />}
            aria-label='toggle menu'
          />
        </Menu.Trigger>
        <Menu.List className='!p-0 lg:!hidden'>
          <Menu.Item className='!p-0'>
            <Link href='/playground'>
              <a
                className={`block w-full p-3 text-lg ${
                  pathname === '/playground' ? 'bg-blue-600/10' : ''
                }`}
              >
                Playground
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item className='!p-0'>
            <Link href='/demo'>
              <a
                className={`block w-full p-3 text-lg ${
                  pathname === '/demo' ? 'bg-blue-600/10' : ''
                }`}
              >
                Demo
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item className='!py-5 hover:!cursor-auto hover:!bg-transparent'>
            <Link href=''>
              <a
                target='_blank'
                className='flex items-center gap-2 rounded-lg bg-blue-700 p-4 font-bold text-white transition-colors duration-300 hover:bg-blue-800'
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
