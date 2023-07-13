import dynamic from 'next/dynamic';

const Layout = ({ children }: any) => {
  const Header = dynamic(() => import('./Header'));
  const Footer = dynamic(() => import('../../Frontend/layouts/Footer'));
  const CopyRight = dynamic(() => import('../../Frontend/layouts/Copyright'));
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
