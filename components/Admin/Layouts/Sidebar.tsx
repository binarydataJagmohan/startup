import React from 'react'

const Sidebar = () => {
  return (
    <>
      <div className="vertical-menu bg-dark text-white">
        <div data-simplebar className="h-100">
          {/*- Sidemenu */}
          <div id="sidebar-menu">
            {/* Left Menu Start */}
            <ul className="metismenu list-unstyled" id="side-menu">
              <li>
                <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"} className="waves-effect">
                  <i className="fa fa-home"></i>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href={process.env.NEXT_PUBLIC_BASE_URL +"/admin/all-investors"} className="waves-effect">
                  <i className="fa fa-dollar"></i>
                  <span>Investors</span>
                </a>
              </li>
              <li>
                <a href={process.env.NEXT_PUBLIC_BASE_URL +"/admin/all-startup-companies"} className="waves-effect">
                  <i className="fa fa-building"></i>
                  <span>Companies</span>
                </a>
              </li>
              <li>
                <a href="#" className="waves-effect">
                  <i className="fa fa-business-time"></i>
                  <span className="badge rounded-pill bg-primary float-end">10</span>
                  <span>Total Active Funds</span>
                </a>
              </li>
              <li>
                <a href="#" className="waves-effect">
                  <i className="fa fa-users"></i>
                  <span>All Users</span>
                </a>
              </li>
              <li>
                <a href="#" className="waves-effect">
                  <i className="fa fa-cogs"></i>
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>
          {/* Sidebar */}
        </div>
      </div>

    </>
  )
}

export default Sidebar