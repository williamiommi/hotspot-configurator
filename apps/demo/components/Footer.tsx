import Link from 'next/link';
import ExternalLink from './icons/ExternalLink';

const Footer = () => (
  <footer className="flex flex-col items-center justify-center p-5 gap-2 sm:flex-row">
    <span>All rights reserved &copy; 2022</span>
    <span className="hidden lg:initial">|</span>
    <Link href="https://williamiommi.me">
      <a target="_blank" className="flex items-center gap-1 underline hover:opacity-80">
        William Iommi <ExternalLink />
      </a>
    </Link>
  </footer>
);

export default Footer;