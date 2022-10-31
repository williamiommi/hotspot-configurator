import Footer from './Footer';
import Navigation from './Navigation';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
