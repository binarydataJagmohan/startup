import React,{useState,useEffect} from 'react'
import { removeToken, removeStorageData, getCurrentUserData, } from "../../lib/session";
import {CheckUserApprovalStatus} from '../../lib/frontendapi';
import Link from 'next/link';
interface UserData {
    id?: number;
    approval_status?: string;
    role?:string;
  }
const Thankyou = () => {
    const [current_user_id, setCurrentUserId] = useState(false);
    const[investorStatus,setInvestorStatus] = useState('');
    const[role,setRole] = useState('');
    useEffect(() => {
      const current_user_data: UserData = getCurrentUserData();
      setInvestorStatus(current_user_data.approval_status || '');

      // console.log("this is up"+current_user_data.approval_status)
      const checkUserStatus = async () => {
        try {
          const res = await CheckUserApprovalStatus(current_user_data.id);          
          if (res.status === true) {
            setInvestorStatus(res.data.approval_status);
            setRole(res.data.role);
            console.log(res.data);           
            if (res.data.role === "investor") {
              if (res.data.investorType === "Regular Investor") {
                if (window.location.pathname !== "/investor/campaign") {
                  window.location.href = "/investor/campaign";
                }
              } else if (res.data.approval_status === "approved" && res.data.approval_status !== "pending" && res.data.approval_status !== "reject") {
                if (window.location.pathname !== "/investor/campaign") {
                  window.location.href = "/investor/campaign";
                }
              } else if (res.data.approval_status === "pending") {
                if (window.location.pathname !== "/investor/thank-you") {
                  setTimeout(() => {
                    window.location.reload();
                  }, 10000);
                }
              } else {
                window.location.href = "/investor/thank-you";
              }
            }
             
             if (res.data.role === "startup") {
              if (res.data.approval_status === "approved" &&(res.data.approval_status !=="pending" && res.data.approval_status !=="reject")) {
                if (window.location.pathname !== "/company/dashboard") {
                  window.location.href = "/company/dashboard";
                }
              } else if (res.data.approval_status === "pending") {
                setTimeout(() => {
                  window.location.reload();
                  // window.location.href = "/company/thank-you";
                }, 10000);
                // setTimeout(() => {
                //   window.location.reload();
                // }, 10000);
              } else {
                setTimeout(() => {
                  window.location.href = "/company/thank-you";
                }, 10000);
              }
            }
          }
        } catch (err) {
          console.error(err);
        }
      };
      
      checkUserStatus();
    }, []);
    useEffect(() => {
      if (investorStatus === 'approved' && window.location.pathname !=="/investor/campaign" && role !=='startup' ) {
        
        
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/investor/campaign`;
      } else if (investorStatus === 'pending' || investorStatus === 'reject') {
        
        if(window.location.pathname !=="/investor/thank-you" && role !=='startup'){
          window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/investor/thank-you`;
        }

      }
    }, [investorStatus]);
  
  
      
    return (
        <>
            {/* Start Preloader Area */}
            {/* <div className="preloader">
                <div className="preloader">
                    <span />
                    <span />
                </div>
            </div> */}
            {/* End Preloader Area */}
            {/* Start Error Area */}
            <section className="error-area mt-5">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="error-content">
                                <h1>
                                    thank <span className="color-span">you</span>
                                </h1>
                                <div className="bar" />
                                <h3>Please Wait for verification!</h3>
                                <p>
                                Your Profile has been completed successfully please wait for the administrators level verification.Your request has been received and is currently pending approval from our administrators. We appreciate your patience and will respond your request as soon as possible. 
                                </p>
                                <Link href={process.env.NEXT_PUBLIC_BASE_URL +"/"} className="default-btn">Go to Home</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* End Error Area */}
        </>
    )
}

export default Thankyou