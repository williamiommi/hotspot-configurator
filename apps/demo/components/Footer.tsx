import Link from 'next/link';

const Footer = () => (
  <footer className="flex flex-col items-center justify-center p-5 gap-2 sm:flex-row">
    <span>Copyright &copy; 2022.</span>
    <Link href="https://williamiommi.me">
      <a target="_blank" className="flex items-center hover:opacity-80">
        <span className="underline text-blue-700">William Iommi</span>.
      </a>
    </Link>
    <span>All rights reserved.</span>
  </footer>
);

export default Footer;
