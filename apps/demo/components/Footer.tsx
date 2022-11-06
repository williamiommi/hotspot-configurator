import Link from 'next/link';

const Footer = () => (
  <footer className='flex flex-col items-center justify-center gap-2 p-5 sm:flex-row'>
    <span>
      Copyright &copy; 2022<span className='hidden sm:inline-block'>.</span>
    </span>
    <Link href='https://williamiommi.me'>
      <a target='_blank' className='flex items-center hover:opacity-80'>
        <span className='text-blue-700 underline'>William Iommi</span>
        <span className='hidden sm:inline-block'>.</span>
      </a>
    </Link>
    <span>
      All rights reserved<span className='hidden sm:inline-block'>.</span>
    </span>
  </footer>
);

export default Footer;
