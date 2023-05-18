import React, { useEffect, useState } from "react";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../../lib/session";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveContact } from '../../../lib/frontendapi';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

type UserData = {
  id?: string;
  username?: string;
  role?: string;
};

export default function HeaderFrontend() {
  const router = useRouter();
  const [current_user_id, setCurrentUserId] = useState("");
  const [current_user_name, setCurrentUserName] = useState("");
  const [current_user_role, setCurrentUserRole] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  function myFunction() {
    setDropdownVisible(!dropdownVisible);
  }
  function redirectToLogin() {
    window.location.href = "/login";
    //router.push("/auth/login");
  }
  function handleLogout(e: any) {
    e.preventDefault();
    removeToken();
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
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
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
  return (
    <>
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
                  <li className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
                    <a href="/" className="nav-link">
                      Home
                    </a>
                  </li>
                  <li className={`nav-item ${router.pathname === '/about' ? 'active' : ''}`}>
                    <a href="/about" className="nav-link">
                      About
                    </a>
                  </li>
                  <li className={`nav-item ${router.pathname === '/services' ? 'active' : ''}`}>
                    <a href="/services" className="nav-link">
                      Services
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a href="/projects" className="nav-link">
                      Projects
                    </a>
                  </li> */}
                  <li className={`nav-item ${router.pathname === '/blogs' ? 'active' : ''}`}>
                    <a href="/blogs" className="nav-link">
                      Blog
                    </a>
                  </li>
                  <li className={`nav-item ${router.pathname === '/contact' ? 'active' : ''}`}>
                    <a href="/contact" className="nav-link">
                      Contact
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
                  <li className="nav-item">
                    {current_user_name ? (
                      <div className="dropdown">
                        <a onClick={myFunction} className="dropbtn nav-link">
                          {current_user_name}
                        </a>
                        <div
                          id="myDropdown"
                          className={`${dropdownVisible ? 'dropdown-content show' : 'dropdown-content'}`}
                        >
                          {current_user_role === 'startup' ? (
                            <a href="/steps/findbusiness" className="colortwo">
                              Profile
                            </a>
                          ) : (
                            <a href="/investor-steps/findbusiness" className="colortwo">
                              Profile
                            </a>
                          )}

                          <a href="#" onClick={handleLogout} className="colortwo">
                            Logout
                          </a>
                        </div>
                      </div>
                    ) : (
                      <a href="/login" className="nav-link">
                        Login
                      </a>
                    )}
                  </li>
                </ul>


                <div className="others-options">
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
                </div>
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
            <li className={`nav-item ${router.pathname === '/' ? 'active' : ''}`}>
              <a href="/" className="nav-link">
                Home
              </a>
            </li>
            <li className={`nav-item ${router.pathname === '/about' ? 'active' : ''}`}>
              <a href="/about" className="nav-link">
                About
              </a>
            </li>
            <li className={`nav-item ${router.pathname === '/services' ? 'active' : ''}`}>
              <a href="/services" className="nav-link">
                Services
              </a>
            </li>
            {/* <li className="nav-item">
                    <a href="/projects" className="nav-link">
                      Projects
                    </a>
                  </li> */}
            <li className={`nav-item ${router.pathname === '/blogs' ? 'active' : ''}`}>
              <a href="/blogs" className="nav-link">
                Blog
              </a>
            </li>
            <li className={`nav-item ${router.pathname === '/contact' ? 'active' : ''}`}>
              <a href="/contact" className="nav-link">
                Contact
              </a>
            </li>
            <li className="nav-item">
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
    </>
  );
}
