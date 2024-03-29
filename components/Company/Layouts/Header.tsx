import React, { useEffect, useState } from "react";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../../lib/session";
import { useRouter } from 'next/router';
import { getSingleUserData } from '@/lib/frontendapi';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

import { getTotalCountOfNotifications, getCountOfUnreadNotifications } from '../../../lib/adminapi';
interface UserData {
  id?: string;
  username?: string;
  role?: string;
}
const Header = () => {
  const [totalNotifications, setTotalNotifications] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState("");
  const [users, setUsers] = useState<any>(
    { name: '', email: '', country: '', phone: '', city: '', status: '', role: '', linkedin_url: '', gender: '', profile_pic: '' });
  const router = useRouter();
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
    const current_user_data: UserData = getCurrentUserData();
    getSingleUserData(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setUsers(res.data);
        }
      })
      .catch((err) => {
      });

    getTotalCountOfNotifications(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setTotalNotifications(res.data);
        } else {
        }
      })
      .catch((err) => {
      });

    getCountOfUnreadNotifications(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setUnreadNotifications(res.data);
        } else {
        }
      })
      .catch((err) => {
      });

  }, []);

  const isSmallScreen = useMediaQuery({ maxWidth: 991 });

  return (
    <>
      <div id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            {/* LOGO */}
            <div className="navbar-brand-box d-block d-lg-none d-md-none">
              <Link href='/' className="logo logo-dark">
                <span className="logo-sm class-as">
                  <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                </span>
                <span className="logo-lg">
                  <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                </span>
              </Link>
              <Link href='/' className="logo logo-light">
                <span className="logo-sm">
                  <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                </span>
                <span className="logo-lg">
                  <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                </span>
              </Link>
            </div>
            <div className="d-none d-lg-block">
              <Link className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i className="mdi mdi-menu d-none"></i>
              </Link>
              <div className={`offcanvas offcanvas-start ${isSmallScreen ? 'd-block d-lg-none' : 'show'}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header p-0">
                  <div className="navbar-brand-box p-0">
                    <Link href='/' className="logo logo-dark">
                      <span className="logo-sm">
                        <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                      </span>
                      <span className="logo-lg">
                        <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                      </span>
                    </Link>
                    <Link href='/' className="logo logo-light">
                      <span className="logo-sm">
                        <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                      </span>
                      <span className="logo-lg">
                        <Image src="/assets/images/logo.png" alt="" width={190} height={53} />
                      </span>
                    </Link>
                  </div>
                  <button type="button" className="btn-close d-none" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                  <div className="vertical-menu bg-dark text-white">
                    <div className="h-100">
                      {/*- Sidemenu */}
                      <div id="sidebar-menu">
                        {/* Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                          <li className={`nav-item ${router.pathname === '/company/dashboard' ? 'active p1' : ''}`}>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/company/dashboard"} className="waves-effect" >
                              <i className="fa fa-home"></i>
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li className={`nav-item ${router.pathname === '/company/all-fund-raise-list' ? 'active p1' : ''}`}>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/all-fund-raise-list"} className="waves-effect">
                              <i className="fa fa-building"></i>
                              <span>All Fund Raise</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/all-notifications"} className={`nav-item waves-effect ${router.pathname === '/company/all-notifications' ? 'active p1' : ''}`} >
                              <i className="fa fa-bell"></i>
                              <span>Notifications</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/company/chats"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "company/chats"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-message"></i>
                              <span>Chat</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/ccsp-request"} className={`nav-item waves-effect ${router.pathname === '/company/ccsp-request' ? 'active p1' : ''}`}>
                              <i className="fa fa-business-time"></i>
                              <span>CCSP Request</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/ccsp-campaign"} className={`nav-item waves-effect ${router.pathname === '/company/ccsp-campaign' ? 'active p1' : ''}`}>
                              <i className="fa fa-business-time"></i>
                              <span>CCSP Campaign</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Sidebar */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-block d-lg-none">
              <Link className="" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">
                <i className="mdi mdi-menu"></i>
              </Link>
              <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample1" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header p-0">
                  <div className="navbar-brand-box p-0">
                    <Link href='/' className="logo logo-dark">
                      <span className="logo-sm">
                        <Image src="/assets/images/logo.png" alt="" width={150} height={53} />
                      </span>
                      <span className="logo-lg">
                        <Image src="/assets/images/logo.png" alt="" width={150} height={53} />
                      </span>
                    </Link>
                    <Link href='/' className="logo logo-light">
                      <span className="logo-sm">
                        <Image src="/assets/images/logo.png" alt="" width={150} height={53} />
                      </span>
                      <span className="logo-lg">
                        <Image src="/assets/images/logo.png" alt="" width={150} height={53} />
                      </span>
                    </Link>
                  </div>
                  <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                  <div className="vertical-menu bg-dark text-white">
                    <div className="h-100">
                      {/*- Sidemenu */}
                      <div id="sidebar-menu">
                        {/* Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"} className="waves-effect">
                              <i className="fa fa-home"></i>
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/all-fund-raise-list"} className="waves-effect">
                              <i className="fa fa-building"></i>
                              <span>All Fund Raise</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/all-notifications"} className={`nav-item waves-effect ${router.pathname === '/company/all-notifications' ? 'active p1' : ''}`} >
                              <i className="fa fa-bell"></i>
                              <span>Notifications</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/ccsp-request"} className={`nav-item waves-effect ${router.pathname === '/company/ccsp-request' ? 'active p1' : ''}`}>
                              <i className="fa fa-business-time"></i>
                              <span>CCSP Request</span>
                            </Link>
                          </li>
                          <li>
                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/ccsp-campaign"} className={`nav-item waves-effect ${router.pathname === '/company/ccsp-campaign' ? 'active p1' : ''}`}>
                              <i className="fa fa-business-time"></i>
                              <span>CCSP Campaign</span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                      {/* Sidebar */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block">
              <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="mdi mdi-bell-outline" />
                <span className="badge bg-danger rounded-pill">{unreadNotifications}</span>
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="m-0 font-size-16"> Notifications ({totalNotifications}) </h5>
                    </div>
                  </div>
                </div>
                <div data-simplebar style={{ maxHeight: '230px' }}>
                  <Link href={process.env.NEXT_PUBLIC_BASE_URL + "company/all-notifications"} className="text-reset notification-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar-xs">
                          <span className="avatar-title bg-danger rounded-circle font-size-16">
                            <i className="mdi mdi-message-text-outline" />
                          </span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        {parseInt(unreadNotifications) > 0 ? (
                          <>
                            <h6 className="mb-1">New Notification received</h6>
                            <div className="font-size-10 text-muted">
                              <p className="font-size-11 mb-1">You have {unreadNotifications} unread Notifications</p>
                            </div>
                          </>
                        ) : (
                          <p>There are no new notifications.</p>
                        )}
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="p-2 border-top">
                  <div className="d-grid">
                    <Link className="btn btn-sm btn-link font-size-14 text-center" href={process.env.NEXT_PUBLIC_BASE_URL + "company/all-notifications"}>
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown d-inline-block">
              <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <Image className="rounded-circle header-profile-user" src={process.env.NEXT_PUBLIC_IMAGE_URL + "images/profile/" + (users.profile_pic || 'default.png')} alt="" width={32} height={32} />
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <p className="text-center" style={{ fontWeight: 'bold', marginBottom: '-8px' }}>{users.name}</p>
                <div className="dropdown-divider" />
                <Link className="dropdown-item" href={process.env.NEXT_PUBLIC_BASE_URL + "company/profile"}><i className="mdi mdi-account-circle font-size-17 align-middle me-1" /> Profile</Link>
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
  )
}

export default Header