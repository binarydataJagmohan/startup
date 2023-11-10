import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { removeToken, removeStorageData } from "../../lib/session";
import { resetPassword } from "@/lib/frontendapi";
const ResetPassword = () => {
    const [email, setEmail] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        removeToken();
        removeStorageData();
    }, []);

    const router = useRouter();
    const SubmitForm = () => {

        const data = {
            email: email
        }
        // userResetpassword(user)
        resetPassword(data)
            .then((res) => {
                if (res.status == true) {
                    console.log(res);
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "success",
                    });
                    // setTimeout(() => {
                    //     router.push("/"); // Redirect to login page
                    // }, 2000);
                } else {
                    toast.error(res.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "error",
                    });
                }
            })
            .catch((err) => {
                toast.error(err, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            });
    };

    return (
        <>
            <section className="contact-section pb-70">
                <div className="container">
                    <div className="row justify-content-center w-75 m-auto" id="resetpassword">
                        <div className="need_content col-md-6">
                            <form id="contactForm" onClick={handleSubmit(SubmitForm)}>
                            <div className="contact-text text-center">
                                <h3>Reset Password</h3>
                            </div>
                                <div className="row justify-content-center">
                                    <div className="form-group text-start ">
                                        <label className="">
                                            Email<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <div className="col-sm-12">
                                            <input
                                                type="email" style={{ height: "35px" }}
                                                id="email"
                                                className="form-control form_style form-div1"
                                                {...register("email", {
                                                    onChange: (e) => setEmail(e.target.value),
                                                    required: true,
                                                })}
                                            />
                                            <div className="help-block with-errors" />
                                            {errors.email && errors.email.type === "required" && (
                                                <p
                                                    className="text-danger"
                                                    style={{ textAlign: "left", fontSize: "12px" }}
                                                >
                                                    *Please Enter Your Email.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12 mt-3">
                                        <div className="help-block with-errors" />

                                        <div className="row">
                                            <div className="col-md-12 text-center">
                                                <button type="submit" className="btnclasssmae reset-btn">
                                                Reset Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={2000} />
            </section>
        </>
    )
}

export default ResetPassword