import React from 'react'

const Sidebar = () => {
  return (
    <>
    <div className="vertical-menu">
  <div data-simplebar="" className="h-100">
    {/*- Sidemenu */}
    <div id="sidebar-menu">
      {/* Left Menu Start */}
      <ul className="metismenu list-unstyled" id="side-menu">
        {/* <li className="menu-title">Main</li> */}
        <li>
          <a href={process.env.NEXT_PUBLIC_BASE_URL+"/"} className="waves-effect">
            <i className="ti-home" />
            <span className="badge rounded-pill bg-primary float-end">1</span>
            <span>Dashboard</span>
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