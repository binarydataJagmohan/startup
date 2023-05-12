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
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="contact-text text-center pt-4">
                                <h3>Reset Password</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="contact-form col-md-6">
                            <form id="contactForm" onClick={handleSubmit(SubmitForm)}>
                                <div className="row justify-content-center">
                                    <div className="form-group">
                                        <label className="col-sm-1 col-form-label">
                                            Email<span style={{ color: "red" }}>*</span>
                                        </label>
                                        <div className="col-sm-12">
                                            <input
                                                type="email" style={{ height: "35px" }}
                                                id="email"
                                                className="form-control"
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
                                            <div className="col-md-12 text-start">
                                                <button type="submit" className="btn btn-primary">
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