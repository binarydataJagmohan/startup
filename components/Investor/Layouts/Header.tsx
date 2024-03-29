import { useEffect, useState } from "react";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../../lib/session";
import { useRouter } from 'next/router';
import { getSingleFrontEndData, getFundRaiseCount } from '@/lib/frontendapi';
import { getTotalCountOfNotifications, getCountOfUnreadNotifications } from '../../../lib/adminapi'
import Link from 'next/link'
import Image from 'next/image';
interface UserData {
  id?: string;
  username?: string;
  role?: string;
}
const Header = () => {
  const [current_user_id, setCurrentUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [investorStatus, setInvestorStatus] = useState('pending');
  const router = useRouter();
  const [totalNotifications, setTotalNotifications] = useState("");
  const [unreadNotifications, setUnreadNotifications] = useState("");


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
    current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");

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

  useEffect(() => {
    let isMounted = true;
    if (current_user_id) {
      getSingleFrontEndData(current_user_id)
        .then((res) => {
          if (res.status === true) {
            setInvestorStatus(res.data.approval_status);
            setUserName(res.data.name);
          }
        })
        .catch((err) => {
          // Handle error
        });
    }
    return () => {
      isMounted = false; // Cleanup function to handle unmounting
    };
  }, [current_user_id, investorStatus]);

  useEffect(() => {

    if (current_user_id && investorStatus === 'approved') {
      getFundRaiseCount()
        .then((res) => {
          if (res.status === true) {            
          }
        })
        .catch((err) => {
          // Handle error
        });
    }
  }, [current_user_id]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showBellDropdown, setBellShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function toggleBellDropdown() {
    setBellShowDropdown(!showBellDropdown);
  }

  return (
    <>
      <div className="navbar-area">
        <div className="fria-responsive-nav">
          <div className="container">
            <div className="fria-responsive-menu">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/logo.png"} className="black-logo 1" alt=""
                    width={190}
                    height={70}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="fria-nav" id="dashboard">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link className="navbar-brand" href="/">
                <Image
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/images/logo.png"} className="black-logo" alt=""
                  width={190}
                  height={87}
                />
              </Link>
              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent">
                <ul className="navbar-nav">
                  <li className={`nav-item ${router.pathname === '/investor/campaign' ? 'active' : ''}`}>
                    <Link href="/investor/campaign" className="nav-link">
                      Explore
                    </Link>
                  </li>
                  <li className={`nav-item ${router.pathname === '/investor/invested-funds' ? 'active' : ''}`}>
                    <Link href="/investor/invested-funds" className="nav-link">
                      Investments
                    </Link>
                  </li>
                </ul>
                <div className="others-options1">
                  <div className="dropdown">
                    <a href="javascript:void(0);" onClick={toggleBellDropdown} className="dropbtn1">
                      <span className="fa fa-bell"></span>
                      <span className="badge bg-danger rounded-pill">{unreadNotifications}</span>
                    </a>
                    <div id="myDropdown" className={`dropdown-content ${showBellDropdown ? "show" : ""}`}>
                      <div className="row align-items-center">
                        <div className="col">
                          <h5 className="m-0 font-size-15"><span className="p-1 text-white bg-danger rounded-circle font-size-10">
                            <i className="mdi mdi-message-text-outline"></i></span> Notifications ({totalNotifications})
                          </h5>
                        </div>
                      </div>
                      <hr />
                      {parseInt(unreadNotifications) > 0 ? (
                        <>
                          <h6 className="mb-1 font-size-14"><Link href={`${process.env.NEXT_PUBLIC_BASE_URL}investor/all-notifications`}>New Notification received</Link></h6>
                          <div className="font-size-10 text-muted">
                            <p className="font-size-11 mb-1">You have {unreadNotifications} unread Notifications</p>
                          </div>
                        </>
                      ) : (
                        <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}investor/all-notifications`}>There are no new notifications.</Link>
                      )}
                      <hr />
                      <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}investor/all-notifications`} className="text-center">View all</Link>
                    </div>
                  </div>
                </div>
                <div className="others-options">
                  <div className="dropdown">
                    <button onClick={toggleDropdown} className="dropbtn">
                      {userName} <i className="fa-solid fa-caret-down" />
                    </button>
                    <div id="myDropdown" className={`dropdown-content ${showDropdown ? "show" : ""}`}>
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "investor-steps/findbusiness"} className="colortwo">
                        Profile
                      </Link>
                      <Link href="" className="colorclass" onClick={handleLogout}>
                        Logout
                      </Link>
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