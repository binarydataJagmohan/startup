import React, { useEffect, useState } from "react";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../../lib/session";

interface UserData {
  id: number;
}
const Header = () => {
  const [current_user_id, setCurrentUserId] = useState(false);

  function redirectToLogin() {
    window.location.href= "/login";
  }
  function handleLogout(e: any) {
    e.preventDefault();
    removeToken();
    removeStorageData();
    redirectToLogin();
  }
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    current_user_data.id ? setCurrentUserId(true) : setCurrentUserId(false);
  }, []);

  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function handleOutsideClick(event) {
    if (!event.target.matches('.dropbtn')) {
      setShowDropdown(false);
    }
  }
  return (
    <>
   <div className="navbar-area">
  <div className="fria-responsive-nav">
    <div className="container">
      <div className="fria-responsive-menu">
        <div className="logo">
          <a href={process.env.NEXT_PUBLIC_BASE_URL}>
            <img src={process.env.NEXT_PUBLIC_BASE_URL +"assets/img/logo.png"} className="black-logo" alt="image" />
            {/* <img
              src={process.env.NEXT_PUBLIC_BASE_URL +"assets/img/logo-2.png"}
              className="white-logo"
              alt="image"
            /> */}
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="fria-nav" id="dashboard">
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand" href={process.env.NEXT_PUBLIC_BASE_URL}>
          <img src={process.env.NEXT_PUBLIC_BASE_URL +"assets/img/logo.png"} className="black-logo" alt="image" />
          {/* <img src={process.env.NEXT_PUBLIC_BASE_URL +"assets/img/logo-2.png"} className="white-logo" alt="image" /> */}
        </a>
        <div
          className="collapse navbar-collapse mean-menu"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="#" className="nav-link active">
                Explore
              </a>
            </li>
            <li className="nav-item">
              <a href="" className="nav-link">
                Subscribe
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                Portfolio
              </a>
            </li>
            <li></li>
          </ul>
          <div className="others-options">
            <div className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn">
                DB <i className="fa-solid fa-caret-down" />
              </button>
              <div id="myDropdown" className={`dropdown-content ${showDropdown ? "show" : ""}`}>
                <a href="#home">Dev3bdpl</a>
                <a href="#about" className="colorclass">
                  Sign in
                </a>
                <a href="#contact" className="colortwo">
                  Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </div>
</div>

    </>
  )
}

export default Header