
import FrontendHome from "../components/Frontend/Home";
import AdminHome from "../components/Admin/Dashboard";
import CompanyHome from "../components/Company/Dashboard"
import { Inter } from "next/font/google";
import { getCurrentUserData } from '@/lib/session';
// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  let current_user = {};
    current_user = getCurrentUserData() || {};
  let Home = FrontendHome; // default layout is Frontendhome
  if (current_user.role === 'admin') {
    Home = AdminHome;
  }else if(current_user.role === 'startup'){
    Home = CompanyHome;
  }else{
    Home = FrontendHome;
  }
  return (
    <>
      <Home/>
    </>
  );
}
