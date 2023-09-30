import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import { uploadDocuments, fetchSingleUserDocuments, getSingleUserData, sendNotification } from "../../lib/frontendapi";
import { getCurrentUserData } from "../../lib/session";

interface UserData {
    id?: string;
}

export default function DocumentsUpload(): any {
    const [pan_card_front, setPanCardFront] = useState(null);
    const [pan_card_back, setPanCardBack] = useState(null);
    const [adhar_card_front, setAdharCardFront] = useState(null);
    const [adhar_card_back, setAdharCardBack] = useState(null);
    const [signup_success, setSignupSuccess] = useState(false);
    const [document_id, setDocumentId] = useState("");
    const [errors, setErrors] = useState({
        pan_card_front: "",
        pan_card_back: "",
        adhar_card_front: "",
        adhar_card_back: "",
    });
    const [basicDetails, setBasicDetails] = useState({
        pan_card_front: "",
        pan_card_back: "",
        adhar_card_front: "",
        adhar_card_back: "",
        documnet_id: '',
    });
    const [current_user_id, setCurrentUserId] = useState("");
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
        if (current_user_data.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id)
                : setCurrentUserId("");

            fetchSingleUserDocuments(current_user_data.id)
                .then((res) => {
                    if (res.status == true) {
                        setBasicDetails(res.data);
                        //console.log(res.data);
                        setPanCardFront(res.data.pan_card_front);
                        setPanCardBack(res.data.pan_card_back);
                        setAdharCardFront(res.data.adhar_card_front);
                        setAdharCardBack(res.data.adhar_card_back);
                        console.log(res.data);
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
                })
                .catch((err) => {
                    toast.error(err.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                });
        } else {
            window.location.href = "/login";
        }

    }, []);

    const handlMenuSubmit = (event: any) => {
        event.preventDefault();
        const errors: any = {};
        if (!pan_card_front) {
            errors.pan_card_front = "Image is required";
        }
        if (!pan_card_back) {
            errors.pan_card_back = "Image is required";
        }
        if (!adhar_card_front) {
            errors.adhar_card_front = "Image is required";
        }
        if (!adhar_card_back) {
            errors.adhar_card_back = "Image is required";
        }

        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const currentUserData: any = getCurrentUserData();
            const data = {
                user_id: currentUserData.id,
            };
            uploadDocuments(data, pan_card_front, pan_card_back, adhar_card_front, adhar_card_back)
                .then((res) => {
                    if (res.status == true) {
                        // console.log(data);
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
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
                        const data = {
                            notify_from_user: current_user_id,
                            notify_to_user: "1",
                            notify_msg: `The user ${users.name} has successfully completed their profile. Please review the profile details and ensure it meets the required standards.`,
                            notification_type: "Profile Completed",
                            each_read: "unread",
                            status: "active"
                        };
                        if (res.status == true) {
                            sendNotification(data)
                                .then((notificationRes) => {
                                    console.log('success')
                                })
                                .catch((error) => {
                                    console.log('error occured')
                                });
                        } else {
                            toast.error(res.message, {
                                position: toast.POSITION.TOP_RIGHT,
                                toastId: "error",
                            });
                        }
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const handlePanCardFrontChange = (event: any) => {
        const file = event.target.files[0];
        setPanCardFront(file);
    };


    const handlePanCardBackChange = (event: any) => {
        const file = event.target.files[0];
        setPanCardBack(file);
    };

    const handleAdharCardFrontChange = (event: any) => {
        const file = event.target.files[0];
        setAdharCardFront(file);
    };

    const handleAdharCardBackChange = (event: any) => {
        const file = event.target.files[0];
        setAdharCardBack(file);
    };

    if (signup_success) return router.push("/steps/adharinformation");

    return (
        <>
            {/* <div className="page-title-area item-bg-5">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Complete Account Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className="left-bar">
                <div className="container">
                    <div id="app">
                        {/* <ol className="step-indicator">
                            <li className="">
                                <div className="step_name">
                                    Step <span>1</span>
                                </div>
                                <div className="step_border">
                                    <div className="step_complete">
                                        <i className="flaticon-checked" style={{ color: "#82b440" }} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                                    <span>PERSONAL INFORMATION</span>
                                </div>
                            </li>
                            <li className="">
                                <div className="step_name">
                                    Step <span>2</span>
                                </div>
                                <div className="step_border">
                                    <div className="step_complete">
                                        <i className="flaticon-checked" style={{ color: "#82b440" }} aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                                    <span>BUSINESS INFORMATION</span>
                                </div>
                            </li>
                            <li className="active">
                                <div className="step_name">
                                    Step <span>3</span>
                                </div>
                                <div className="step_border">
                                    <i className="flaticon-checked" style={{ color: "#82b440" }} aria-hidden="true"></i>
                                </div>
                                <div className="caption hidden-xs hidden-sm">
                                    <span>BASIC INFORMATION</span>
                                </div>
                            </li>
                            <li className="">
                                <div className="step_name">
                                    Step <span>4</span>
                                </div>
                                <div className="step_border">
                                    <div className="step">
                                        <img className="sidebar-img w-75" src="/assets/img/sidebar/docs.png" />
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                                    <span>DOCUMENTS UPLOAD</span>
                                </div>
                            </li>
                            <li className="">
                                <div className="step_name">
                                    Step <span>5</span>
                                </div>
                                <div className="step_border">
                                    <div className="step">
                                        <img className="sidebar-img w-75" src="/assets/img/sidebar/bank.png" />
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm">
                                    <span>BANK INFORMATION</span>
                                </div>
                            </li>
                        </ol> */}
                        <div className="container">
                            <div className="register-form">
                                <div className="row step_one">
                                    <div className="col-md-12">
                                        <form
                                            className="needs-validation mb-4"
                                            onSubmit={handlMenuSubmit}
                                            encType="multipart/form-data"
                                        >
                                            <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                                                Documents Upload{" "}
                                                <i
                                                    style={{ cursor: "pointer" }}
                                                    className="fa fa-info-circle"
                                                    aria-hidden="true"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Please type in your full basics required details into the field below. This would be your registered company name."
                                                ></i>
                                            </h4>
                                            <div className="row justify-content-center">
                                                <div className="col-md-8" id="register">
                                                    <div className="row">
                                                        <div className="col-md-6 mt-5">
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className="form-label"
                                                            >
                                                                Pan Card font view{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <input type="file" name="pan_card_front" onChange={handlePanCardFrontChange} accept="image/jpeg, image/png" />
                                                            <p>
                                                                You can upload any identity card's image
                                                                jpg,png,jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                            {errors.pan_card_front && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.pan_card_front}</span>}

                                                            {basicDetails.pan_card_front ? (
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.pan_card_front} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                            ) : (
                                                                null
                                                            )
                                                            }

                                                        </div>
                                                        <div className="col-md-6 mt-5">
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className="form-label"
                                                            >
                                                                Pan Card back view{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <input type="file" name="pan_card_back" onChange={handlePanCardBackChange} accept="image/jpeg, image/png"></input>
                                                            <p>
                                                                You can upload any identity card's image
                                                                jpg,png,jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                            {errors.pan_card_back && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.pan_card_back}</span>}

                                                            {basicDetails.pan_card_back ? (
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.pan_card_back} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                            ) : (
                                                                null
                                                            )
                                                            }

                                                        </div>
                                                        <div className="col-md-6 mt-5">
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className="form-label"
                                                            >
                                                                Adhar Card front view{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <input type="file" name="adhar_card_front" onChange={handleAdharCardFrontChange} accept="image/jpeg, image/png"></input>
                                                            <p>
                                                                You can upload any identity card's image
                                                                jpg,png,jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                            {errors.adhar_card_front && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.adhar_card_front}</span>}

                                                            {basicDetails.adhar_card_front ? (
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.adhar_card_front} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                            ) : (
                                                                null
                                                            )
                                                            }

                                                        </div>
                                                        <div className="col-md-6 mt-5 mb-5">
                                                            <label
                                                                htmlFor="exampleFormControlInput1"
                                                                className="form-label"
                                                            >
                                                                Adhar Card back view{" "}
                                                                <span style={{ color: "red" }}>*</span>
                                                            </label>
                                                            <input type="file" name="adhar_card_back" onChange={handleAdharCardBackChange} accept="image/jpeg, image/png"></input>
                                                            <p>
                                                                You can upload any identity card's image
                                                                jpg,png,jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                            {errors.adhar_card_back && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.adhar_card_back}</span>}

                                                            {basicDetails.adhar_card_back ? (
                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.adhar_card_back} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                            ) : (
                                                                null
                                                            )
                                                            }


                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-6" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            <a
                                                                href={`/steps/adharinformation`}
                                                                className="btnclasssmae" id="back"
                                                            >
                                                                Go back
                                                            </a>
                                                        </div>

                                                        <div
                                                            className="col-md-6"
                                                            style={{ textAlign: "right" }}
                                                        >
                                                            <button type="submit" className="btnclasssmae">
                                                                NEXT
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        </>
    );
}
