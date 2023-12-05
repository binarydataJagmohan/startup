import React from "react";
import { useState, useEffect } from "react";
import router from "next/router";
import { toast, ToastContainer } from "react-toastify";
import {getCurrentUserData} from '../../lib/session';
import { verifyEmailOtp, resendOtp, getSingleUserData, sendNotification } from '../../lib/frontendapi';

interface UserData {
  id?: string;
}
const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const [users, setUsers] = useState<any>({});
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    getSingleUserData(current_user_data.id)
    .then((res) => {
      if (res.status == true) {
          setUsers(res.data);
      }
    })
    .catch((err) => {
      toast.error(err.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
      });
    });   
  }, []);
  const handleOtpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const current_user_data:any = getCurrentUserData();
    const data = {
        user_id: current_user_data.id,
        otp: otp
    }
    verifyEmailOtp(data)
    .then(res => {
        if (res.status == true) {
          toast.success(res.message, {
              position: toast.POSITION.TOP_RIGHT
          });
          if(window.localStorage.getItem("user_role") == 'investor'){
            if (users.investorType !== 'Regular Investor') {
              if (users.approval_status === 'pending') {
                  setTimeout(() => {
                      router.push("/investor/thank-you");
                  }, 1000);
              }
              if (users.approval_status === 'approved') {
                  setTimeout(() => {
                      router.push("/investor/campaign");
                  }, 1000);
              }
            } else {
                setTimeout(() => {
                    router.push("/investor/campaign");
                }, 1000);
            }
          } else {
            if (users.approval_status === 'pending') {
              setTimeout(() => {
                  router.push("/company/thank-you");
              }, 1000);
            }
            if (users.approval_status === 'approved') {
                setTimeout(() => {
                    router.push("/company/dashboard");
                }, 1000);
            }
            const current_user_data: UserData = getCurrentUserData();
            const data = {
              notify_from_user: current_user_data.id,
              notify_to_user: "1",
              notify_msg: `The user ${users.name} has successfully completed their profile. Please review the profile details and ensure it meets the required standards.`,
              notification_type: "Profile Completed",
              each_read: "unread",
              status: "active"
            };
            if (res.status == true) {
                sendNotification(data)
                    .then((notificationRes) => {
                    })
                    .catch((error) => {
                        console.error('error occured')
                    });
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
          }
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
    })
    .catch(err => {
        console.error(err);
    });
  };
  const handleResendOtp = () => {
    const current_user_data:any = getCurrentUserData();
    const data = {
        user_id: current_user_data.id,
    }
    resendOtp(data)
    .then(res => {
        if (res.status == true) {
            toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT
            });
        } else {
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            if (res.errors) {
                Object.keys(res.errors).forEach(function (key) {
                res.errors[key].forEach(function (errorMessage: string) {
                    toast.error(errorMessage);
                });
                });
            }
        }
    })
    .catch(err => {
        console.error(err);
    });
  }
  return (
    <>
      <section className="contact-section pb-70">
        <div className="container">
          <div className="row justify-content-center" id="resetpassword">
            <div className="col-sm-3"></div>
            <div className="verify_email_need_content col-md-6">
              <form id="contactForm" onSubmit={handleOtpSubmit}>
                <div className="contact-text text-center pt-4">
                  <h3>Otp Verification</h3>
                </div>
                <div className="row justify-content-center">
                  <div className="form-group text-start">
                    <label className="col-form-label">
                      OTP
                    </label>
                    <div className="col-sm-12">
                      <input
                        type="otp" style={{ height: "35px" }}
                        id="otp"
                        className="form-control form_style form-div1"
                        pattern="^[0-9]*$"
                        name='otp' value={otp} onChange={(e:any) => setOtp(e.target.value)} 
                        maxLength={4}
                      />
                      <p style={{ fontSize: "14px", padding: '0' }}>Your otp must be 4 digit. <span style={{ float: "right", fontStyle:"italic", cursor:"pointer"}} onClick={handleResendOtp}>Resend Otp</span></p>
                    </div>
                  </div>
                  <div className="form-group text-start col-md-12 mt-3">
                    <div className="help-block with-errors" />
                    <div className="row">
                      <div className="col-md-12 mt-3">
                        <button type="submit" className="btnclasssmae reset-btn">
                          Verify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-sm-3"></div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </section>
    </>
  )
}

export default VerifyEmail