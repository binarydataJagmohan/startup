import dynamic from 'next/dynamic';
// import Header from "./Header";
// import Footer from "./Footer";
// import CopyRight from "./Copyright";
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
