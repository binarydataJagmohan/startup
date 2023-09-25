import React, { useEffect, useState } from 'react';
import { getCurrentUserData } from "../../lib/session";
import { getTotalUsers, getInvestorCounts, getStartupCounts,getAllActiveFundsCount } from '@/lib/adminapi';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface UserData {
  id?: string;
}
const Dashboard = () => {
  const [current_user_id, setCurrentUserId] = useState("");
  const [userCount, setUserCount] = useState(0);
  const [investorCount, setInvestorCount] = useState(0);
  const [startupCount, setStartupCount] = useState(0);
  const [activeFundCount, setActiveFundCount] = useState(0);

  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getTotalUsers();
      if (data) {
        setUserCount(data.data);
      }
    };
    fetchUser();

  }, []);


  useEffect(() => {
    const fetchInvestor = async () => {
      const data = await getInvestorCounts();
      if (data) {
        setInvestorCount(data.data);
      }
    };
    fetchInvestor();

  }, []);
  useEffect(() => {
    const fetchStartupCount = async () => {
      const data = await getStartupCounts();
      if (data) {
        setStartupCount(data.data);
      }
    };

    const fetchAllActiveFundsCount = async () => {
      const data = await getAllActiveFundsCount();
      if (data) {
        setActiveFundCount(data.data);
       
      }
    };
    fetchStartupCount();
    fetchAllActiveFundsCount();
  }, []);
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data?.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");

    } else {
      window.location.href = "/login";
    }

    const handleWindowLoad = () => {
      const element = document.getElementById('your-element-id1');
      if (element) {
        element.style.paddingLeft = '40px';
        element.style.transition = 'padding-left 0.5s ease-in-out';
      }
    };

    window.addEventListener('load', handleWindowLoad);

    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);
  return (
    <>
      <div className="main-content" id='your-element-id1'>
        <div className="page-content">
          {
            router.pathname !== '/' ? (
              <div className="container-fluid">
                {/* start page title */}
                <div className="page-title-box">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h6 className="page-title">Dashboard</h6>
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item active">Welcome to Admin Dashboard</li>
                      </ol>
                    </div>
                  </div>
                </div>
                {/* end page title */}
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card mini-stat  dashcard" style={{ backgroundImage: 'linear-gradient(2.97deg, #0EB1D2 17%, #0055BA 76.13%)', color: 'white' }} >
                      <div className="card-body">
                        <div className="mb-4">

                          <h5 className="font-size-16 text-uppercase text-white">Total Fund Raised</h5>
                          <h4 className="fw-medium font-size-24">{activeFundCount} <i className="fa fa-chart-line text-success ms-2 text-white" /></h4>
                          {/* <div className="mini-stat-label" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }}>
                            {  <p className="mb-0 text-white">+ 12%</p>  }
                            { <div className="float-start mini-stat-img me-4">
                            <img src="/assets/images/services-icon/01.png" />
                            </div>  }
                          </div> */}
                        </div>
                        <div className="pt-2">
                          <div className="float-end">
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-active-funds"} className=""><i className="mdi mdi-arrow-right h5 text-white"  /></Link>
                          </div>
                          <p className=" mb-0 mt-1 text-white">Since last month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-xl-3 col-md-6">
                    <div className="card mini-stat  dashcard" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }}>
                      <div className="card-body">
                        <div className="mb-4">
                          <h5 className="font-size-16 text-uppercase text-white">Total Revenue</h5>
                          <h4 className="fw-medium font-size-24">52,368 <i className="mdi mdi-arrow-down text-danger ms-2 text-white" /></h4>
                          <div className="mini-stat-label" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }}>
                            <p className="mb-0 text-white">- 28%</p>
                          </div>
                        </div>
                        <div className="pt-2">
                          <div className="float-end">
                            <Link href="#" className=""><i className="mdi mdi-arrow-right h5 text-white" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }} /></Link>
                          </div>
                          <p className="mb-0 mt-1 text-white">Since last month</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-xl-3 col-md-6">
                    <div className="card mini-stat dashcard " style={{ backgroundImage: 'linear-gradient(2.97deg, rgb(100 187 43) 17%, rgb(69 159 11) 76.13%)', color: 'white' }}>
                      <div className="card-body">
                        <div className="mb-4">
                          <h5 className="font-size-16 text-uppercase ">Total Users</h5>
                          <h4 className="fw-medium font-size-24">{userCount}<i className="fa fa-users text-success ms-2 text-white" /></h4>
                          {/* <div className="mini-stat-label" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }}>
                            {  <p className="mb-0 text-white"> 00%</p>  }
                          </div> */}
                        </div>
                        <div className="pt-2">
                          <div className="float-end">
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-users"} className=""><i className="mdi mdi-arrow-right h5 text-white" style={{  color: 'white' }} /></Link>
                          </div>
                          <p className="mb-0 mt-1 text-white">Since last month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card mini-stat dashcard " style={{ backgroundImage: 'linear-gradient(2.97deg, #1dc4e7 17%, #0a8ba5 76.13%)', color: 'white' }}>
                      <div className="card-body">
                        <div className="mb-4">
                          <h5 className="font-size-16 text-uppercase ">Total Startups</h5>
                          <h4 className="fw-medium font-size-24">{startupCount}<i className="fa fa-user text-success ms-2 text-white" /></h4>
                          {/* <div className="mini-stat-label" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }}>
                            {  <p className="mb-0 text-white "> 00%</p>}
                          </div> */}
                        </div>
                        <div className="pt-2">
                          <div className="float-end">
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-startup-companies"} className=""><i className="mdi mdi-arrow-right h5 " style={{   color: 'white' }} /></Link>
                          </div>
                          <p className=" mb-0 mt-1 text-white">Since last month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card mini-stat dashcard" style={{ backgroundImage: 'linear-gradient(2.97deg, #f78267 17%, #f35836 76.13%)', color: 'white' }}>
                      <div className="card-body">
                        <div className="mb-4">
                          <h5 className="font-size-16 text-uppercase">Total Investers</h5>
                          <h4 className="fw-medium font-size-24">{investorCount} <i className="fa fa-user text-success ms-2 text-white" /></h4>
                          {/* <div className="mini-stat-label" style={{ backgroundImage: 'linear-gradient(2.97deg, #1A2F55 17%, #179980 76.13%)', color: 'white' }}>
                            {  <p className="mb-0 text-white">+ 84%</p>  }
                          </div> */}
                        </div>
                        <div className="pt-2">
                          <div className="float-end">
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-investors"} className=""><i className="mdi mdi-arrow-right h5 " style={{   color: 'white' }} /></Link>
                          </div>
                          <p className="mb-0 mt-1 text-white">Since last month</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end row */}
              </div>
            ) : (
              <div>

              </div>
            )
          }

        </div>
        {/* End Page-content */}
      </div>
    </>
  )
}

export default Dashboard