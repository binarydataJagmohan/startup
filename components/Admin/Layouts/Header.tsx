import React, { useEffect, useState } from "react";
import { getAllActiveFundsCount,getAllNotifications } from "../../../lib/adminapi";
import Cookies from "js-cookie";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from 'react-hook-form';


import {
  removeToken,
  removeStorageData,
  getCurrentUserData,
} from "../../../lib/session";
import { useRouter } from 'next/router';
import { getSingleUserData,saveContact } from '@/lib/frontendapi';

interface UserData {
  username?: string;
  role?: string;
  id?: string;
}

const Header = () => {
  const [current_user_id, setCurrentUserId] = useState("");
  const [current_user_name, setCurrentUserName] = useState("");
  const [current_user_role, setCurrentUserRole] = useState("");
  const [totalActiveFunds, setTotalActiveFunds] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
 
  function myFunction() {
    setDropdownVisible(!dropdownVisible);
  }
  
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    current_user_data.username
      ? setCurrentUserName(current_user_data.username)
      : setCurrentUserName("");
    current_user_data.role
      ? setCurrentUserRole(current_user_data.role)
      : setCurrentUserRole("");
    current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const SubmitForm = () => {
    const logindata = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    };
    saveContact(logindata)
      .then((res) => {
        if (res.status == true) {
          toast.success("Contact has been submitted succesfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "success",
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error("Contact has been not submitted succesfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
      })
      .catch((err) => {
        toast.error("Contact has been not submitted succesfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      });
  };
  const [users, setUsers] = useState<any>(
      {
      name: '', 
      email: '', 
      country: '', 
      phone: '', 
      city: '', 
      status: '', 
      role: '', 
      linkedin_url: '', 
      gender: '', 
      profile_pic: ''
     });
  const [notifications,setNotifications]=useState({});
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
    current_user_data.username
      ? setCurrentUserName(current_user_data.username)
      : setCurrentUserName("");
    current_user_data.role
      ? setCurrentUserRole(current_user_data.role)
      : setCurrentUserRole("");
    current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");

    getAllActiveFundsCount()
      .then((res) => {
        if (res.status == true) {
          // Set the businessUnits state
          setTotalActiveFunds(res.data);
        } else {
        }
      })
      .catch((err) => {
      });

    getSingleUserData(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          // Set the businessUnits state
          setUsers(res.data);
        }
      })
      .catch((err) => {
      });

      getAllNotifications(current_user_data.id)
      .then((res) => {
        if (res.status == true) {
          // Set the businessUnits state
          console.log(res);
          setNotifications(res.data);
        }
      })
      .catch((err) => {
      });

  }, []);

  function collapseSidebar() {
    $('.vertical-menu').toggle();
  }
  return (
    <>
    {router.pathname !== '/' ? (
  <div id="page-topbar">
   <div id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex align-items-center">
            {/* LOGO */}
            <div className="navbar-brand-box">
              {/* <a href="/" className="logo logo-dark">
                <span className="logo-sm class-as">
                  <img src="/assets/img/logo2.png" alt="" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="/assets/img/logo2.png" alt="" height={17} />
                </span>
              </a> */}
              {/* <a href="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src="/assets/img/logo2.png" alt="" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="/assets/img/logo2.png" alt="" height={18} />
                </span>
              </a> */}
            </div>
            <div className="d-none d-lg-block">
              <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
                <i className="mdi mdi-menu d-none"></i>
              </a>
              <div className="offcanvas offcanvas-start show" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header p-0">
                  <div className="navbar-brand-box p-0">
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
                  <button type="button" className="btn-close d-none" data-bs-dismiss="offcanvas" aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                  <div className="vertical-menu bg-dark text-white">
                    <div className="h-100">
                      {/*- Sidemenu */}
                      <div id="sidebar-menu">
                        {/* Left Menu Start */}
                        <ul className="metismenu list-unstyled" id="side-menu">
                          <li className={`nav-item ${router.pathname === '/admin/dashboard' ? 'active p1' : ''}`}>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"} className="waves-effect" >
                              <i className="fa fa-home"></i>
                              <span>Dashboard</span>
                            </a>
                          </li>
                          <li className={`nav-item ${router.pathname === '/admin/all-investors' || router.pathname.startsWith('/admin/edit-investor') ? 'active p1' : ''}`}>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-investors"} className="waves-effect">
                              <i className="fa fa-dollar"></i>
                              <span>Investors</span>
                            </a>
                          </li>
                          <li className={`nav-item ${router.pathname === '/admin/all-startup-companies' || router.pathname.startsWith('/admin/edit-startup')  ? 'active p1' : ''}`}>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-startup-companies"} className="waves-effect">
                              <i className="fa fa-building"></i>
                              <span>All Startups</span>
                            </a>
                          </li>
                          <li className={`nav-item ${router.pathname === '/admin/all-active-funds'? 'active p1' : ''}`}>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-active-funds"} className="waves-effect">
                              <i className="fa fa-business-time"></i>
                              <span className="badge rounded-pill bg-danger float-end">{totalActiveFunds}</span>
                              <span>Total Active Funds</span>
                            </a>
                          </li>
                          <li className={`nav-item ${router.pathname === '/admin/all-users' || router.pathname.startsWith('/admin/edit-user') ? 'active p1' : ''}`}>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-users"} className="waves-effect">
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
                </div>
              </div>
            </div>
            <div className="d-block d-lg-none">
              <a className="" data-bs-toggle="offcanvas" href="#offcanvasExample1" role="button" aria-controls="offcanvasExample1">
                <i className="mdi mdi-menu"></i>
              </a>
              <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasExample1" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header p-0">
                  <div className="navbar-brand-box p-0">
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
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"} className="waves-effect">
                              <i className="fa fa-home"></i>
                              <span>Dashboard</span>
                            </a>
                          </li>
                          <li>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-investors"} className="waves-effect">
                              <i className="fa fa-dollar"></i>
                              <span>Investors</span>
                            </a>
                          </li>
                          <li>
                            <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/all-startup-companies"} className="waves-effect">
                              <i className="fa fa-building"></i>
                              <span>All Startups</span>
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
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            {/* App Search*/}
            {/* <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input type="text" className="form-control" placeholder="Search..." />
                <span className="fa fa-search" />
              </div>
            </form> */}
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="mdi mdi-magnify" />
              </button>
              <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                      <div className="input-group-append" >
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
                <div data-simplebar style={{ maxHeight: '230px' }}>
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
                    <a className="btn btn-sm btn-link font-size-14 text-center" href="#">
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown d-inline-block">
              <button type="button" className="btn header-item waves-effect" id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img className="rounded-circle header-profile-user" src={process.env.NEXT_PUBLIC_IMAGE_URL + "images/profile/" + users.profile_pic} alt="" />
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <p className="text-center" style={{ fontWeight: 'bold', marginBottom: '-8px' }}>{current_user_role.slice(0, 1).toUpperCase() + current_user_role.slice(1)}</p>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/admin-update`}><i className="mdi mdi-account-circle font-size-17 align-middle me-1" />Profile</a>
                <a className="dropdown-item" href="#"><i className="mdi mdi-wallet font-size-17 align-middle me-1" /> My Wallet</a>
                {/* <a className="dropdown-item d-flex align-items-center" href="#"><i className="mdi mdi-cog font-size-17 align-middle me-1" /> Settings<span className="badge bg-success ms-auto">11</span></a> */}
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
  </div>
) : (
  <div>
      <div className="navbar-area">
        <div className="fria-responsive-nav">
          <div className="container">
            <div className="fria-responsive-menu">
              <div className="logo">
                <a href="/">
                  <img
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"
                    }
                    className="black-logo"
                    alt="image"
                  />
                  {/* <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo-2.png"}
                    className="white-logo"
                    alt="image"
                  /> */}
                </a>
              </div>
              <div className="burger-menu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                <span />
                <span />
                <span />
                <img src="https://cdn0.iconfinder.com/data/icons/user-interface-150/24/List_menu_toggle-512.png" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div className="fria-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <a className="navbar-brand" href="/">
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                  className="black-logo"
                  alt="image"
                />
                {/* <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo-2.png"}
                  className="white-logo"
                  alt="image"
                /> */}
              </a>
              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="">
                    <a href="" className="nav-link">
                      
                    </a>
                  </li>
                  <li className="">
                    <a href="" className="nav-link">
                      
                    </a>
                  </li>
                  <li className="">
                    <a href="" className="nav-link">
                      
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a href="/projects" className="nav-link">
                      Projects
                    </a>
                  </li> */}
                  <li className="">
                    <a href="" className="nav-link">
                      
                    </a>
                  </li>
                  <li className="">
                    <a href="" className="nav-link">
                      
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <div className="dropdown">
                      <a onClick={myFunction} className="dropbtn nav-link">
                        {current_user_name}
                      </a>
                      <div
                        id="myDropdown"
                        className={`${dropdownVisible
                          ? "dropdown-content show"
                          : "dropdown-content"
                          }`}
                      >
                        {current_user_role == "startup" ?
                          <a href="/steps/findbusiness" className="colortwo">
                            Profile
                          </a>
                          :
                          <a href="/investor-steps/findbusiness" className="colortwo">
                            Profile
                          </a>}

                        <a href="#" onClick={handleLogout} className="colortwo">
                          Logout
                        </a>
                      </div>
                    </div>
                  </li> */}
                </ul>
                <div className="others-options">
                    {current_user_name ? (
                      <div className="dropdown">
                        <a onClick={myFunction} className="dropbtn text-white">
                          {current_user_name}&nbsp;<i className="fa-solid fa-caret-down" />
                        </a>
                        <div
                          id="myDropdown"
                          className={`${dropdownVisible ? 'dropdown-content show' : 'dropdown-content'}`}
                        >
                          {current_user_role === 'admin' ? (
                            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/admin-update`} className="colortwo">
                              Profile
                            </a>
                          ) : (
                            <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/admin-update`} className="colortwo">
                              Profile
                            </a>
                          )}
                          <a href="/admin/dashboard" className="colortwo">
                      Dashboard
                    </a>

                          <a href="#" onClick={handleLogout} className="colortwo">
                            Logout
                          </a>
                        </div>
                      </div>
                    ) : (
                      <button  className="btnclasssmae" style={{ margin: "-45px" }}>
                       <a href="/login" style={{ color: "#fff" }}>Login</a>
                      </button>
                    )}
                  </div>


                {/* <div className="others-options">
                  <div className="option-item">
                    <i className="search-btn flaticon-search" />
                    <i className="close-btn flaticon-cancel" />
                    <div className="search-overlay search-popup">
                      <div className="search-box">
                        <form className="search-form">
                          <input
                            className="search-input"
                            name="search"
                            placeholder="Search"
                            type="text"
                          />
                          <button className="search-button" type="submit">
                            <i className="flaticon-search" />
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="burger-menu" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
                    <span />
                    <span />
                    <span />
                  </div>
                </div> */}
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="">
          <h5 className="offcanvas-title text-center" id="offcanvasRightLabel">
            <a className="navbar-brand" href="/">
              <img
                src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                className="black-logo pt-5"
                alt="image"
              />
              {/* <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo-2.png"}
                  className="white-logo"
                  alt="image"
                /> */}
            </a>
          </h5>
          <button type="button" className="btn-close claoseclasss" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav text-center centerd-class">
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            {/* <li className="nav-item">
                    <a href="/projects" className="nav-link">
                      Projects
                    </a>
                  </li> */}
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <a onClick={myFunction} className="dropbtn text-white">
                  {current_user_name}
                </a>
                <div
                  id="myDropdown"
                  className={`${dropdownVisible
                    ? "dropdown-content show"
                    : "dropdown-content"
                    }`}
                >
                  {current_user_role == "startup" ?
                    <a href="/steps/findbusiness" className="colortwo">
                      Profile
                    </a>
                    :
                    <a href="/investor-steps/findbusiness" className="colortwo">
                      Profile
                    </a>}
                    
                   
                  <a href="#" onClick={handleLogout} className="colortwo">
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="sidebar-modal">
        <div className="sidebar-modal-inner">
          <div className="sidebar-about-area">
            <div className="title">
              <h2>About Us</h2>
              <p>
                Our team of experts has extensive experience in the finance and
                investment industry, ensuring that you receive the best advice
                and support.
              </p>
            </div>
          </div>
          <div className="sidebar-contact-feed">
            <h2>Contact</h2>
            <div className="contact-form">
              <form id="contactForm" onSubmit={handleSubmit(SubmitForm)}>
                <div className="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <input type="text" id="name" className="form-control" required data-error="Please enter your name" placeholder="Your Name" value={name} {...register('name', { onChange: (e) => setName(e.target.value), required: true })} />

                      <div className="help-block with-errors" style={{ fontSize: "12px" }} />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <input type="email" id="email" className="form-control" required data-error="Please enter your email" placeholder="Your Email" value={email}  {...register('email', { onChange: (e) => setEmail(e.target.value), required: true })} />
                      <div className="help-block with-errors" style={{ fontSize: "12px" }} />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <input type="text" id="subject" className="form-control" required data-error="Please enter your subject" placeholder="Your Subject" value={subject} {...register('subject', { onChange: (e) => setSubject(e.target.value), required: true })} />
                      <div className="help-block with-errors" style={{ fontSize: "12px" }} />
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <textarea className="form-control" id="message" cols={30} rows={6} required data-error="Write your message" placeholder="Your Message" value={message} {...register('message', { onChange: (e) => setMessage(e.target.value), required: true })} />
                      <div className="help-block with-errors" style={{ fontSize: "12px" }} />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12">
                    <div className="send-btn">
                      <button type="submit" className="send-btn-one">
                        Send Message
                      </button>
                      <div id="msgSubmit" className="h3 text-center hidden" />
                      <div className="clearfix" />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <ToastContainer />
          </div>
          <div className="sidebar-contact-area">
            <div className="contact-info">
              <div className="contact-info-content">
                <h2>
                  <a href="tel:+882-569-756">+882-569-756</a>
                  <span>OR</span>
                  <a href="mailto:example@gmail.com">example@gmail.com</a>
                </h2>
                <ul className="social">
                  <li>
                    <a href="#" target="_blank">
                      <i className="flaticon-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="flaticon-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="flaticon-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href="#" target="_blank">
                      <i className="flaticon-pinterest" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <span className="close-btn sidebar-modal-close-btn">
            <i className="flaticon-cancel" />
          </span>
        </div>
      </div>
      <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
        <div className="">
          <h5 className="offcanvas-title text-center" id="offcanvasRightLabel">
            <a className="navbar-brand" href="/">
              <img
                src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                className="black-logo pt-5"
                alt="image"
              />
              {/* <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo-2.png"}
                  className="white-logo"
                  alt="image"
                /> */}
            </a>
          </h5>
          <button type="button" className="btn-close claoseclasss" data-bs-dismiss="offcanvas" aria-label="Close" />
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav text-center centerd-class">
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            {/* <li className="nav-item">
                    <a href="/projects" className="nav-link">
                      Projects
                    </a>
                  </li> */}
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="">
              <a href="" className="nav-link">
                
              </a>
            </li>
            <li className="nav-item">
              <div className="dropdown">
                <a onClick={myFunction} className="dropbtn text-white">
                  {current_user_name}
                </a>
                <div
                  id="myDropdown"
                  className={`${dropdownVisible
                    ? "dropdown-content show"
                    : "dropdown-content"
                    }`}
                >
                  {current_user_role == "startup" ?
                    <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/admin-update`} className="colortwo">
                      Profile
                    </a>
                    :
                    <a href={`${process.env.NEXT_PUBLIC_BASE_URL}admin/admin-update`} className="colortwo">
                      Profile
                    </a>}
                    
                   
                  <a href="#" onClick={handleLogout} className="colortwo">
                    Logout
                  </a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
  </div>
)}
      
    </>
  );
};

export default Header;