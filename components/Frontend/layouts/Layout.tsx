import Header from "./Header";
import Footer from "./Footer";
import CopyRight from "./Copyright";
const Layout = ({ children }:any) => {
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
