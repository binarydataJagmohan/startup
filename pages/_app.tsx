import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { getCurrentUserData } from '@/lib/session';
import 'bootstrap/dist/css/bootstrap.css';
import dynamic from 'next/dynamic';
import { CheckUserApprovalStatus } from "../lib/frontendapi";
import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const AdminLayout = dynamic(() => import('../components/Admin/Layouts/Layouts'));
  const FrontendLayout = dynamic(() => import('../components/Frontend/layouts/Layout'));
  const InvestorLayout = dynamic(() => import('../components/Investor/Layouts/Layouts'));
  const CompanyLayout = dynamic(() => import('../components/Company/Layouts/Layouts'));
  let current_user: { id?: string, role?: string, approval_status?: string } = {}; // define type of current_user "role"
  const [users, setUsers] = useState<any>({});

  const router = useRouter();
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
  
// default layout is FrontendLayout
  let Layout = FrontendLayout; 

  // admin header
  if (current_user && current_user.role === 'admin') {
    Layout = AdminLayout;
  }
  if (current_user && current_user.role === 'admin' && (router.pathname === '/' ||
    router.pathname === '/about' ||
    router.pathname === '/services' || router.pathname === '/blogs' || router.pathname === '/contact' || router.pathname === '/terms-condition' 
    || router.pathname === '/privacy-policy' || router.pathname === '/business-planning' || router.pathname === '/website-development'
    || router.pathname === '/company-incorporation' || router.pathname === '/app-development' || router.pathname === '/marketing-branding' || router.pathname === '/cfo-services'
    || router.pathname === '/faq' || router.pathname === '/single-blog' || router.pathname === '/team')
  ) {
    Layout = FrontendLayout;
  }

  // investor header
  if (current_user.role === 'investor' && users.approval_status === 'approved') {
    Layout = InvestorLayout;
  }
  if (current_user && current_user.role === 'investor' && (router.pathname === '/' ||
    router.pathname === '/about' ||
    router.pathname === '/services' || router.pathname === '/blogs' || router.pathname === '/contact' || router.pathname === '/terms-condition' 
    || router.pathname === '/privacy-policy' || router.pathname === '/business-planning' || router.pathname === '/website-development' || router.pathname === '/company-incorporation'
    || router.pathname === '/app-development' || router.pathname === '/marketing-branding' || router.pathname === '/cfo-services' || router.pathname === '/faq' || router.pathname === '/single-blog'
    || router.pathname === '/team')
  ) {
    Layout = FrontendLayout;
  }


  // startup header
  if (users.role === 'startup' && users.approval_status === 'approved') {
    Layout = CompanyLayout;
  }
  if (current_user && current_user.role === 'startup' && (router.pathname === '/' ||
    router.pathname === '/about' ||
    router.pathname === '/services' || router.pathname === '/blogs' || router.pathname === '/contact' || router.pathname === '/steps/findbusiness' || router.pathname === '/steps/businessinfo' || router.pathname === '/steps/customizereview' || router.pathname === '/steps/adharinformation' || router.pathname === '/terms-condition' 
    || router.pathname === '/privacy-policy' || router.pathname === '/business-planning' || router.pathname === '/website-development'  || router.pathname === '/company-incorporation' 
    || router.pathname === '/app-development' || router.pathname === '/marketing-branding' || router.pathname === '/cfo-services' || router.pathname === '/faq' || router.pathname === '/single-blog'
    || router.pathname === '/team')
  ) {
    Layout = FrontendLayout;
  }
  return (
    <>
      {Layout && <Layout> {/* check if Layout is defined before rendering */}
        <Component {...pageProps} />
      </Layout>}
    </>
  );
}
