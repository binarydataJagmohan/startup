import React,{useState,useEffect} from 'react'
import { removeToken, removeStorageData, getCurrentUserData, } from "../../lib/session";
interface UserData {
    id?: number;
    approval_status?: string;
  }
const Thankyou = () => {
    const [current_user_id, setCurrentUserId] = useState(false);
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if(current_user_data.approval_status == "approved"){
            setTimeout(() => {
                window.location.href = "/admin/dashboard/";
              }, 1000);
        }
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