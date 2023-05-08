import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
const Layout = ({ children}:any) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
