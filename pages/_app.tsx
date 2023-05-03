import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import FrontendLayout from '../components/Frontend/layouts/Layout'
import AdminLayout from '../components/Admin/Layouts/Layouts'
import InvestorLayout from '../components/Investor/Layouts/Layouts'
import { getCurrentUserData } from '@/lib/session';
import 'bootstrap/dist/css/bootstrap.css';

export default function App({ Component, pageProps }: AppProps) {
  let current_user = {};
  try {
    current_user = getCurrentUserData() || {};
  } catch (error) {
    console.error('Error getting current user data:', error);
  }
  let Layout = FrontendLayout; // default layout is FrontendLayout
  if (current_user.role === 'admin') {
    Layout = AdminLayout;
  }

  if (current_user.role === 'investor') {
    Layout = InvestorLayout;
  }
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
