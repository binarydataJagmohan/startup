import React from 'react'

const Sidebar = () => {
  return (
    <>
    <div className="vertical-menu">
  <div data-simplebar="" className="h-100">
    {/*- Sidemenu */}
    <div id="sidebar-menu">
      <ul className="metismenu list-unstyled" id="side-menu">
        <li>
          <a href={process.env.NEXT_PUBLIC_BASE_URL+"/"} className="waves-effect">
            <i className="fa fa-home" />
            {/* <span className="badge rounded-pill bg-primary float-end">1</span> */}
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a href={process.env.NEXT_PUBLIC_BASE_URL+"/company/fund-raise"} className=" waves-effect">
            <i className="fa fa-dollar-sign" />
            <span>Fund Raise</span>
          </a>
        </li>
        <li>
          <a href={process.env.NEXT_PUBLIC_BASE_URL+"/company/all-fund-raise-list"} className=" waves-effect">
            <i className="fa fa-list-dots" />
            <span>All Fund Raise</span>
          </a>
        </li>
        <li>
          <a href="" className=" waves-effect">
            <i className="fa fa-cogs" />
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