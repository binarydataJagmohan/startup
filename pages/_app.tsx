import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import FrontendLayout from '../components/Frontend/layouts/Layout'
import AdminLayout from '../components/Admin/Layouts/Layouts'
import CompanyLayout from "../components/Company/Layouts/Layouts"
import { getCurrentUserData } from '@/lib/session';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ Component, pageProps }: AppProps) {
  let current_user: { role?: string } = {}; // define type of current_user to include "role" property
  try {
    current_user = getCurrentUserData() || {};
  } catch (error) {
    console.error('Error getting current user data:', error);
  }

  let Layout; // default layout is FrontendLayout
  if (current_user && current_user.role === 'admin') {
    Layout = AdminLayout;
  } else if(current_user && current_user.approval_status === 'approved'){
     Layout=  CompanyLayout;
  }else {
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
