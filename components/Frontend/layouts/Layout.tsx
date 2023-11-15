import dynamic from 'next/dynamic';
const Layout = ({ children }: any) => {
  const Header = dynamic(() => import('./Header'));
  const Footer = dynamic(() => import('./Footer'));
  const CopyRight = dynamic(() => import('./Copyright'));
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <CopyRight />
    </>
  );
};

export default Layout;
