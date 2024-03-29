import React, { useEffect, useState } from "react";
import {
  getAllActiveFundsCount,
  getTotalCountOfNotifications,
  getCountOfUnreadNotifications,
} from "../../../lib/adminapi";
import Cookies from "js-cookie";
import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useMediaQuery } from 'react-responsive';
import {
  removeToken,
  removeStorageData,
  getCurrentUserData,
} from "../../../lib/session";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { getSingleUserData } from "@/lib/frontendapi";
import Image from "next/image";
interface UserData {
  username?: string;
  role?: string;
  id?: string;
}

const Header = () => {
  const [taggleUserMgmt, settaggleUserMgmt] = useState(true);
  const [current_user_role, setCurrentUserRole] = useState("");
  const pathname = usePathname();
  const [totalActiveFunds, setTotalActiveFunds] = useState("");
  const [totalNotifications, setTotalNotifications] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState("");
  const [users, setUsers] = useState<any>({
    name: "",
    email: "",
    country: "",
    phone: "",
    city: "",
    status: "",
    role: "",
    linkedin_url: "",
    gender: "",
    profile_pic: "",
  });
  const router = useRouter();
  function redirectToLogin() {
    window.location.href = "/login";
  }
  function handleLogout(e: any) {
    e.preventDefault();
    removeToken();
    Cookies.remove("rememberMe");
    removeStorageData();
    redirectToLogin();
  }

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    current_user_data.role
      ? setCurrentUserRole(current_user_data.role)
      : setCurrentUserRole("");

    getAllActiveFundsCount()
      .then((res) => {
        if (res.status == true) {
          setTotalActiveFunds(res.data);
        } else {
        }
      })
      .catch((err) => { });

    getSingleUserData(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setUsers(res.data);
        }
      })
      .catch((err) => { });

    getTotalCountOfNotifications(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setTotalNotifications(res.data);
        } else {
        }
      })
      .catch((err) => { });

    getCountOfUnreadNotifications(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          setUnreadNotifications(res.data);
        } else {
        }
      })
      .catch((err) => { });
  }, []);

  const toggleMenu = (index: number) => {
    if (index === 1) {
      settaggleUserMgmt((prevState) => !prevState);
    } else {
      settaggleUserMgmt(true);
    }
  };

  const isSmallScreen = useMediaQuery({ maxWidth: 991 });

  return (
    <>
      <div id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            {/* LOGO */}
            <div className="navbar-brand-box"></div>
            <div className="d-none d-lg-block">
              <a
                className=""
                data-bs-toggle="offcanvas"
                href="#offcanvasExample"
                role="button"
                aria-controls="offcanvasExample"
              >
                <i className="mdi mdi-menu d-none"></i>
              </a>
              <div className={`offcanvas offcanvas-start ${isSmallScreen ? 'd-block d-lg-none' : 'show'}`} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header p-0">
                  <div className="navbar-brand-box p-0">
                    <Link href="/" className="logo logo-dark">
                      <span className="logo-sm">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                      <span className="logo-lg">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                    </Link>
                    <Link href="/" className="logo logo-light">
                      <span className="logo-sm">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                      <span className="logo-lg">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="btn-close d-none"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="offcanvas-body">
                  <div className="vertical-menu bg-dark text-white">
                    <div className="h-100">
                      {/*- Sidemenu */}
                      <div id="sidebar-menu">
                        {/* Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                          <li
                            className={`nav-item ${router.pathname === "/admin/dashboard"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/dashboard"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-home"></i>
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-investors" ||
                              router.pathname.startsWith("/admin/edit-investor")
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-investors"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-dollar"></i>
                              <span>Investors</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname ===
                              "/admin/all-startup-companies" ||
                              router.pathname.startsWith("/admin/edit-startup")
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-startup-companies"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-building"></i>
                              <span>Startups</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-active-funds"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-active-funds"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-business-time"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                                {totalActiveFunds}
                              </span>
                              <span>Fund Raised</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-active-campaign" ||
                              router.pathname === "/admin/add-company" ||
                              router.pathname === "/admin/add-team" ||
                              router.pathname === "/admin/add-products" ||
                              router.pathname === "/admin/ccsp-detail"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-active-campaign"
                              }
                              className="waves-effect"
                            >
                              <i className="fas fa-poll-h"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                              </span>
                              <span>CCSP Campaign</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-users" ||
                              router.pathname.startsWith("/admin/edit-user")
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-users"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-users"></i>
                              <span>Users</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/chats"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/chats"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-message"></i>
                              <span>Chat</span>
                            </Link>
                          </li>

                          <li
                            className={`nav-item ${router.pathname === "/admin/blog"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/blog"
                              }
                              className="waves-effect"
                            >
                              <i className="fa-solid fa-pen"></i>
                              <span>Blogs</span>
                            </Link>
                          </li>


                          <li
                            className={`nav-item ${router.pathname === "admin/all-notifications"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-notifications"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-bell"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                                {unreadNotifications}
                              </span>
                              <span>Notifications</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "admin/contact-queries"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/contact-queries"
                              }
                              className="waves-effect"
                            >
                              <i className="fa-solid fa-clipboard-question"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                                {unreadNotifications}
                              </span>
                              <span>Contact Queries</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="javascript:void(0)"
                              className="d-flex justify-content-between"
                              onClick={() => toggleMenu(1)}
                            >
                              <i className="fas fa-file-alt icon-width"></i>

                              <span className="page-width">Pages</span>
                              <ChevronDownIcon width={20} color={"#fff"} />
                            </Link>
                            <ul
                              className={`dropdown-menu-list menu-border ${taggleUserMgmt ? "d-none" : ""
                                }`}
                            >
                              {/* Dropdown content */}
                              <li>
                                <Link
                                  className={`nav-item ${pathname.includes(
                                    "admin/terms-and-conditions"
                                  )
                                    ? "active p1"
                                    : ""
                                    }`}
                                  href="/admin/terms-and-conditions"
                                >
                                  <i className="fas fa-file-contract"></i>

                                  <span>Terms and Conditions</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={`nav-item ${pathname.includes("admin/privacy-policy")
                                    ? "active p1"
                                    : ""
                                    }`}
                                  href="/admin/privacy-policy"
                                >
                                  <i className="fas fa-user-secret"></i>

                                  <span>Privacy Policy</span>
                                </Link>
                              </li>
                            </ul>
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
              <a
                className=""
                data-bs-toggle="offcanvas"
                href="#offcanvasExample1"
                role="button"
                aria-controls="offcanvasExample1"
              >
                <i className="mdi mdi-menu"></i>
              </a>
              <div
                className="offcanvas offcanvas-start"
                tabIndex={-1}
                id="offcanvasExample1"
                aria-labelledby="offcanvasExampleLabel"
              >
                <div className="offcanvas-header p-0">
                  <div className="navbar-brand-box p-0">
                    <Link href="/" className="logo logo-dark">
                      <span className="logo-sm">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                      <span className="logo-lg">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                    </Link>
                    <Link href="/" className="logo logo-light">
                      <span className="logo-sm">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                      <span className="logo-lg">
                        <Image
                          src="/assets/images/logo.png"
                          alt="logo-image"
                          width={150}
                          height={70}
                        />
                      </span>
                    </Link>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                  />
                </div>
                <div className="offcanvas-body">
                  <div className="vertical-menu bg-dark text-white">
                    <div className="h-100">
                      {/*- Sidemenu */}
                      <div id="sidebar-menu">
                        {/* Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                          <li
                            className={`nav-item ${router.pathname === "/admin/dashboard"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/dashboard"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-home"></i>
                              <span>Dashboard</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-investors" ||
                              router.pathname.startsWith("/admin/edit-investor")
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-investors"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-dollar"></i>
                              <span>Investors</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname ===
                              "/admin/all-startup-companies" ||
                              router.pathname.startsWith("/admin/edit-startup")
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-startup-companies"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-building"></i>
                              <span>Startups</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-active-funds"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-active-funds"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-business-time"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                                {totalActiveFunds}
                              </span>
                              <span>Fund Raised</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-active-campaign" ||
                              router.pathname === "/admin/add-company" ||
                              router.pathname === "/admin/add-team" ||
                              router.pathname === "/admin/add-products" ||
                              router.pathname === "/admin/ccsp-detail"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-active-campaign"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-business-time"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                              </span>
                              <span>CCSP Campaign</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/all-users" ||
                              router.pathname.startsWith("/admin/edit-user")
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-users"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-users"></i>
                              <span>Users</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "/admin/chats"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/chats"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-message"></i>
                              <span>Chat</span>
                            </Link>
                          </li>

                          <li
                            className={`nav-item ${router.pathname === "/admin/blog"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/blog"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-message"></i>
                              <span>Blogs</span>
                            </Link>
                          </li>


                          <li
                            className={`nav-item ${router.pathname === "admin/all-notifications"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/all-notifications"
                              }
                              className="waves-effect"
                            >
                              <i className="fa fa-bell"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                                {unreadNotifications}
                              </span>
                              <span>Notifications</span>
                            </Link>
                          </li>
                          <li
                            className={`nav-item ${router.pathname === "admin/contact-queries"
                              ? "active p1"
                              : ""
                              }`}
                          >
                            <Link
                              href={
                                process.env.NEXT_PUBLIC_BASE_URL +
                                "admin/contact-queries"
                              }
                              className="waves-effect"
                            >
                              <i className="fa-solid fa-clipboard-question"></i>
                              <span className="badge rounded-pill bg-danger float-end">
                                {unreadNotifications}
                              </span>
                              <span>Contact Queries</span>
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="javascript:void(0)"
                              className="d-flex justify-content-between"
                              onClick={() => toggleMenu(1)}
                            >
                              <i className="fas fa-file-alt icon-width"></i>

                              <span className="page-width">Pages</span>
                              <ChevronDownIcon width={20} color={"#fff"} />
                            </Link>
                            <ul
                              className={`dropdown-menu-list menu-border ${taggleUserMgmt ? "d-none" : ""
                                }`}
                            >
                              {/* Dropdown content */}
                              <li>
                                <Link
                                  className={`nav-item ${pathname.includes(
                                    "admin/terms-and-conditions"
                                  )
                                    ? "active p1"
                                    : ""
                                    }`}
                                  href="/admin/terms-and-conditions"
                                >
                                  <i className="fas fa-file-contract"></i>

                                  <span>Terms and Conditions</span>
                                </Link>
                              </li>
                              <li>
                                <Link
                                  className={`nav-item ${pathname.includes("admin/privacy-policy")
                                    ? "active p1"
                                    : ""
                                    }`}
                                  href="/admin/privacy-policy"
                                >
                                  <i className="fas fa-user-secret"></i>

                                  <span>Privacy Policy</span>
                                </Link>
                              </li>
                            </ul>
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
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-search-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon waves-effect"
                id="page-header-notifications-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i className="mdi mdi-bell-outline" />
                <span className="badge bg-danger rounded-pill">
                  {unreadNotifications}
                </span>
              </button>
              <div
                className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                aria-labelledby="page-header-notifications-dropdown"
              >
                <div className="p-3">
                  <div className="row align-items-center">
                    <div className="col">
                      <h5 className="m-0 font-size-16">
                        {" "}
                        Notifications ({totalNotifications}){" "}
                      </h5>
                    </div>
                  </div>
                </div>
                <div data-simplebar style={{ maxHeight: "230px" }}>
                  <Link
                    href={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "admin/all-notifications"
                    }
                    className="text-reset notification-item"
                  >
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
                              <p className="font-size-11 mb-1">
                                You have {unreadNotifications} unread
                                Notifications
                              </p>
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
                    <Link
                      className="btn btn-sm btn-link font-size-14 text-center"
                      href={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "admin/all-notifications"
                      }
                    >
                      View all
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item waves-effect"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {users && users.profile_pic ? (
                  <Image
                    className="rounded-circle header-profile-user"
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL +
                      "images/profile/" +
                      users.profile_pic
                    }
                    alt=""
                    width={32}
                    height={32}
                  />
                ) : (
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_IMAGE_URL +
                      "images/profile/default.png"
                    }
                    alt="business-logo"
                    width={32}
                    height={32}
                  />
                )}
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <p
                  className="text-center"
                  style={{ fontWeight: "bold", marginBottom: "-8px" }}
                >
                  {current_user_role.slice(0, 1).toUpperCase() +
                    current_user_role.slice(1)}
                </p>
                <div className="dropdown-divider" />
                <Link
                  className="dropdown-item"
                  href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/admin-update`}
                >
                  <i className="mdi mdi-account-circle font-size-17 align-middle me-1" />
                  Profile
                </Link>

                <div className="dropdown-divider" />
                <button
                  className="dropdown-item text-danger"
                  onClick={handleLogout}
                >
                  <i className="bx bx-power-off font-size-17 align-middle me-1 text-danger" />{" "}
                  Logout
                </button>
              </div>
            </div>
            <div className="dropdown d-inline-block">
              <button
                type="button"
                onClick={handleLogout}
                className="btn header-item noti-icon right-bar-toggle waves-effect"
              >
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
