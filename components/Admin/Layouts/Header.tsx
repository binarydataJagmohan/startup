import React, { useEffect, useState } from "react";
import {
  removeToken,
  removeStorageData,
  getCurrentUserData,
} from "../../../lib/session";

interface UserData {
  id: number | string;
}
const Header = () => {
  const [current_user_id, setCurrentUserId] = useState(false);

  function redirectToLogin() {
    window.location.href = "/login";
  }
  function handleLogout(e: any) {
    e.preventDefault();
    removeToken();
    removeStorageData();
    redirectToLogin();
  }
  useEffect(() => {
    const current_user_data = getCurrentUserData() || { id: "" };
    current_user_data.id ? setCurrentUserId(true) : setCurrentUserId(false);
  }, [setCurrentUserId]);

  return (
    <>
       <div id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            {/* LOGO */}
            <div className="navbar-brand-box">
              <a href="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="/assets/img/logo.png" alt="" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="/assets/img/logo.png" alt="" height={17} />
                </span>
              </a>
              <a href="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src="/assets/img/logo.png" alt="" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="/assets/img/logo.png" alt="" height={18} />
                </span>
              </a>
            </div>
          </div>
          <div className="d-flex">
            {/* App Search*/}
            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="fa fa-search" />
              </div>
            </form>
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="mdi mdi-magnify" />
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify" /></button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
     
            <div className="dropdown d-inline-block">
              <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="mdi mdi-bell-outline" />
                <span className="badge bg-danger rounded-pill">3</span>
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="m-0 font-size-16"> Notifications (258) </h5>
                    </div>
                  </div>
                </div>
                <div data-simplebar style={{maxHeight: '230px'}}>
                  <a href="#" className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-danger rounded-circle font-size-16">
                            <i className="mdi mdi-message-text-outline" />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="mb-1">New Message received</h6>
                        <div className="font-size-12 text-muted">
                          <p className="mb-1">You have 87 unread messages</p>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className="p-2 border-top">
                  <div className="d-grid">
                    <a className="btn btn-sm btn-link font-size-14 text-center" href="javascript:void(0)">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown d-inline-block">
              <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="rounded-circle header-profile-user" src="/assets/images/users/user-4.jpg" alt="Header Avatar" />
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                {/* item*/}
                <a className="dropdown-item" href="#"><i className="mdi mdi-account-circle font-size-17 align-middle me-1" /> Profile</a>
                <a className="dropdown-item" href="#"><i className="mdi mdi-wallet font-size-17 align-middle me-1" /> My Wallet</a>
                <a className="dropdown-item d-flex align-items-center" href="#"><i className="mdi mdi-cog font-size-17 align-middle me-1" /> Settings<span className="badge bg-success ms-auto">11</span></a>
                <div className="dropdown-divider" />
                <button className="dropdown-item text-danger" onClick={handleLogout}><i className="bx bx-power-off font-size-17 align-middle me-1 text-danger" /> Logout</button>
              </div>
            </div>
            <div className="dropdown d-inline-block">
              <button type="button" onClick={handleLogout} className="btn header-item noti-icon right-bar-toggle waves-effect">
                <i className="fa fa-power-off" />
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
