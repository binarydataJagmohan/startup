import Header from "../../Frontend/layouts/Header";
import Footer from "./Footer";
const Layout = ({ children }:any) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
