import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Layout = ({ children }) => {
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
