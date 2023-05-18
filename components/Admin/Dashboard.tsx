import React from 'react'
import { useEffect } from 'react';
const Dashboard = () => {
  useEffect(() => {
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
                <div className="card mini-stat bg-primary text-white">
                  <div className="card-body">
                    <div className="mb-4">
                    
                      <h5 className="font-size-16 text-uppercase text-white-50">Total Fund Raised</h5>
                      <h4 className="fw-medium font-size-24">1,685 <i className="mdi mdi-arrow-up text-success ms-2" /></h4>
                      <div className="mini-stat-label bg-success">
                        <p className="mb-0 text-white">+ 12%</p>
                          {/* <div className="float-start mini-stat-img me-4">
                        <img src="/assets/images/services-icon/01.png" />
                      </div> */}
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a href="#" className="text-white-50"><i className="mdi mdi-arrow-right h5 text-white-50" /></a>
                      </div>
                      <p className="text-white-50 mb-0 mt-1">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card mini-stat bg-primary text-white">
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase text-white-50">Total Revenue</h5>
                      <h4 className="fw-medium font-size-24">52,368 <i className="mdi mdi-arrow-down text-danger ms-2" /></h4>
                      <div className="mini-stat-label bg-danger">
                        <p className="mb-0 text-white">- 28%</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a href="#" className="text-white-50"><i className="mdi mdi-arrow-right h5 text-white-50" /></a>
                      </div>
                      <p className="text-white-50 mb-0 mt-1">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card mini-stat bg-primary text-white">
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase text-white-50">Total Users</h5>
                      <h4 className="fw-medium font-size-24">15.8 <i className="mdi mdi-arrow-up text-success ms-2" /></h4>
                      <div className="mini-stat-label bg-info">
                        <p className="mb-0 text-white"> 00%</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a href="#" className="text-white-50"><i className="mdi mdi-arrow-right h5 text-white-50" /></a>
                      </div>
                      <p className="text-white-50 mb-0 mt-1">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="card mini-stat bg-primary text-white">
                  <div className="card-body">
                    <div className="mb-4">
                      <h5 className="font-size-16 text-uppercase text-white-50">Investers</h5>
                      <h4 className="fw-medium font-size-24">2436 <i className="mdi mdi-arrow-up text-success ms-2" /></h4>
                      <div className="mini-stat-label bg-warning">
                        <p className="mb-0 text-white">+ 84%</p>
                      </div>
                    </div>
                    <div className="pt-2">
                      <div className="float-end">
                        <a href="#" className="text-white-50"><i className="mdi mdi-arrow-right h5 text-white-50" /></a>
                      </div>
                      <p className="text-white-50 mb-0 mt-1">Since last month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end row */}
          </div> {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </>
  )
}

export default Dashboard