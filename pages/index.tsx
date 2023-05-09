import { Inter } from "next/font/google";
import { getCurrentUserData } from '@/lib/session';
import dynamic from 'next/dynamic';


// import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
const AdminHome = dynamic(() => import('../components/Admin/Dashboard'));
const FrontendHome = dynamic(() => import('../components/Frontend/Home'));
const CompanyHome = dynamic(() => import('../components/Company/Dashboard'));
  let current_user = {};
  current_user = getCurrentUserData() || {};
  let Home = FrontendHome; // default layout is Frontendhome
  if (current_user.role === 'admin') {
    Home = AdminHome;
  }else if(current_user.role === 'startup' && current_user.approval_status === 'approved'){
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
