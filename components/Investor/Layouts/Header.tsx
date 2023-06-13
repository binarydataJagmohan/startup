import { useEffect, useState,useRef } from "react";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../../lib/session";
import { useRouter } from 'next/router';
import { getSingleFrontEndData,getFundRaiseCount} from '@/lib/frontendapi';
import Link from 'next/link'

interface UserData {
  id?: string;
  username?: string;
  role?: string;
}
const Header = () => {
  const [current_user_name, setCurrentUserName] = useState("");
  const [current_user_id, setCurrentUserId] = useState("");
  const [current_user_role, setCurrentUserRole] = useState("");
  const[userName,setUserName] = useState("");
  const[investorStatus,setInvestorStatus] = useState('pending');
  const[fundRaiseCount,setFundRaiseCount] = useState(0);
  const router = useRouter();
 


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
    current_user_data.username
      ? setCurrentUserName(current_user_data.username)
      : setCurrentUserName("");
    current_user_data.role
      ? setCurrentUserRole(current_user_data.role)
      : setCurrentUserRole("");
    current_user_data.id ? setCurrentUserId(current_user_data.id) : setCurrentUserId("");
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

  useEffect(()=>{

    if(current_user_id && investorStatus === 'approved'){
      getFundRaiseCount()
      .then((res)=>{
             if(res.status === true){
              setFundRaiseCount(res.data);
              // console.log("this is count"+res.data);
             }
      })
      .catch((err) => {
        // Handle error
      });
     
    }

  },[current_user_id]);

  // useEffect(() => {
   
  //   if (current_user_id) { // Check if current_user_id is set
  //     getSingleFrontEndData(current_user_id)
  //       .then((res) => {
  //         if (res.status == true) {
           
         
  //         }
  //       })
  //       .catch((err) => {
  //         // Handle error
  //       });
  //   }
  // }, [current_user_id]);



  

  // console.log(current_user_name);
  const [showDropdown, setShowDropdown] = useState(false);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function handleOutsideClick(event :any) {
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
            <img src={process.env.NEXT_PUBLIC_BASE_URL +"assets/img/logo.png"} className="black-logo" alt="" />
          </a>
        </div>
      </div>
    </div>
  </div>
  <div className="fria-nav" id="dashboard">
    <div className="container">
      <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand" href={process.env.NEXT_PUBLIC_BASE_URL}>
          <img src={process.env.NEXT_PUBLIC_BASE_URL +"assets/img/logo.png"} className="black-logo" alt="" />
        </a>
        <div
          className="collapse navbar-collapse mean-menu"
          id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a  href={investorStatus === 'pending' || investorStatus === 'reject' ? `${process.env.NEXT_PUBLIC_BASE_URL}/investor/thank-you` : `${process.env.NEXT_PUBLIC_BASE_URL}/investor/campaign`} className="nav-link active">
                Explore
              </a>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link">
                Subscribe
              </Link>
            </li>
           
            <li></li>
          </ul>
          {investorStatus === 'approved' && (
            <div className="dropdown d-inline-block">
            <button type="button" className="btn header-item noti-icon waves-effect" id="page-header-notifications-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <i className="mdi mdi-bell-outline" />
              <span className="badge bg-danger rounded-pill">{fundRaiseCount}</span>
            </button>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-notifications-dropdown">
              <div className="p-3">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="m-0 font-size-16"> Notifications ({fundRaiseCount}) </h5>
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
                        <p className="mb-1">You have {fundRaiseCount} unread messages</p>
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
          )}
          

          <div className="others-options">
            <div className="dropdown">
              <button onClick={toggleDropdown} className="dropbtn">
                {userName} <i className="fa-solid fa-caret-down" />
              </button>
              <div id="myDropdown" className={`dropdown-content ${showDropdown ? "show" : ""}`}>
                {/* <a href="">{current_user_name}</a> */}
                {current_user_role=="startup" ?  
                        <a href="/steps/findbusiness" className="colortwo">
                          Profile
                        </a>
                        :
                        <a href="/investor/profile" className="colortwo">
                          Profile
                        </a> }
                        <a href="" className="colorclass" onClick={handleLogout}>
                  Logout
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