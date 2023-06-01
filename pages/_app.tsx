import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { getCurrentUserData } from '@/lib/session';
import 'bootstrap/dist/css/bootstrap.css';
import dynamic from 'next/dynamic';
import {CheckUserApprovalStatus} from "../lib/frontendapi";
import React,{useEffect,useState} from 'react'

export default function App({ Component, pageProps }: AppProps) {
const AdminLayout = dynamic(() => import('../components/Admin/Layouts/Layouts'));
const FrontendLayout = dynamic(() => import('../components/Frontend/layouts/Layout'));
const InvestorLayout = dynamic(() => import('../components/Investor/Layouts/Layouts'));
const CompanyLayout = dynamic(() => import('../components/Company/Layouts/Layouts'));
let current_user: {id?:string, role?: string,approval_status?:string } = {}; // define type of current_user "role"
const [users, setUsers] = useState({});

useEffect(() => {

  const checkUserStatus = async () => {
      try {
        const res = await CheckUserApprovalStatus(current_user.id);
        if (res.status === true) {
          setUsers(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    checkUserStatus();

}, []);

//  console.log(users);
  try {
    current_user = getCurrentUserData() || {};
  } catch (error) {
    console.error('Error getting current user data:', error);
  }

  let Layout=FrontendLayout; // default layout is FrontendLayout
  if (current_user && current_user.role === 'admin') {
    Layout = AdminLayout;
   } 
 
  if (current_user.role === 'investor') {
       Layout = InvestorLayout;
  }
  if (users.role === 'startup' && users.approval_status === 'approved') {
    Layout = CompanyLayout;
}

  return (
    <>
      {Layout && <Layout> {/* check if Layout is defined before rendering */}
        <Component {...pageProps} />
      </Layout>}
    </>
  );
}
