import React,{useState,useEffect} from 'react'
import { removeToken, removeStorageData, getCurrentUserData, } from "../../lib/session";
import {CheckUserApprovalStatus} from '../../lib/frontendapi';
interface UserData {
    id?: number;
    approval_status?: string;
    role?:string;
  }
const Thankyou = () => {
    const [current_user_id, setCurrentUserId] = useState(false);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        
        const checkUserStatus = async () => {
          try {
            const res = await CheckUserApprovalStatus(current_user_data.id);
            
            if (res.status === true) {
              console.log(res.data.approval_status);
              
              if (res.data.role === "investor") {
                if (res.data.approval_status === "approved") {
                  window.location.href = "/investor/campaign";
                } else if (res.data.approval_status === "pending") {
                  setTimeout(() => {
                    window.location.reload();
                  }, 10000); 
                } else {
                    setTimeout(() => {
                        window.location.href = "/investor/thank-you";
                      }, 10000);
                }
              } else if (res.data.role === "startup") {
                if (res.data.approval_status === "approved") {
                  window.location.href = "/company/dashboard";
                } else if (res.data.approval_status === "pending") {
                  setTimeout(() => {
                    window.location.reload();
                  }, 10000); 
                } else {
                  window.location.href = "/company/thank-you";
                }
              }
            }
          } catch (err) {
            console.error(err);
          }
        };
        
        checkUserStatus();
      }, []);
      
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
                                <a href={process.env.NEXT_PUBLIC_BASE_URL +"/"} className="default-btn">Go to Home</a>
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