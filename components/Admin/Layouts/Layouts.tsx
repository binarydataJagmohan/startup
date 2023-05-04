import dynamic from 'next/dynamic';

const Layout = ({ children }:any) => {
const Header = dynamic(() => import('./Header'));
const Sidebar = dynamic(() => import('./Sidebar'));
const Footer = dynamic(() => import('./Footer'));
  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Sidebar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;


