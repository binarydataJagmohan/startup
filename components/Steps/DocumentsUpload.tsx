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
    const [panCardFrontName, setPanCardFrontName] = useState('')
    const [pan_card_back, setPanCardBack] = useState(null);
    const [panCardBackName, setPanCardBackName] = useState('');
    const [adhar_card_front, setAdharCardFront] = useState(null);
    const [adharCardFrontName, setAdharCardFrontName] = useState('');
    const [adhar_card_back, setAdharCardBack] = useState(null);
    const [adharCardBackName, setAdharCardBackName] = useState('');
    const [signup_success, setSignupSuccess] = useState(false);
    const [panCardFrontError, setPanCardFrontError] = useState('');
    const [panCardFrontSizeError, setPanCardFrontSizeError] = useState('');
    const [panCardBackError, setPanCardBackError] = useState('');
    const [panCardBackSizeError, setPanCardBackSizeError] = useState('');
    const [adharCardFrontError, setAdharCardFrontError] = useState('');
    const [adharCardBackError, setAdharCardBackError] = useState('');
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
        // if (!pan_card_front) {
        //     errors.pan_card_front = "Image is required";
        // }
        // if (!pan_card_back) {
        //     errors.pan_card_back = "Image is required";
        // }
        // if (!adhar_card_front) {
        //     errors.adhar_card_front = "Image is required";
        // }
        // if (!adhar_card_back) {
        //     errors.adhar_card_back = "Image is required";
        // }

        // setErrors(errors);
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
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
            const maxSize = 2 * 1024 * 1024;
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setPanCardFront(file);
                    setPanCardFrontName(file.name);
                    setPanCardFrontError('');
                    setPanCardFrontSizeError('');
                } else {
                    setPanCardFrontSizeError('* Please upload a file that is no larger than 2 MB.');
                }
            } else {
                setPanCardFrontError('* Please upload a JPG, PNG, JPEG or PDF file');
                event.target.value = null;
            }
        }
    };


    const handlePanCardBackChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
            const maxSize = 2 * 1024 * 1024;
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setPanCardBack(file);
                    setPanCardBackName(file.name);
                    setPanCardBackError('');
                    setPanCardBackSizeError('');
                } else {
                    setPanCardBackSizeError('* Please upload a file that is no larger than 2 MB.');
                }
            } else {
                setPanCardBackError('* Please upload a JPG, PNG, JPEG or PDF file');
                event.target.value = null;
            }
        }
    };

    const handleAdharCardFrontChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
            const maxSize = 2 * 1024 * 1024;
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setAdharCardFront(file);
                    setAdharCardFrontName(file.name);
                } else {
                    setAdharCardFrontError('* Please upload a file that is no larger than 2 MB.');
                }
            } else {
                setAdharCardFrontError('* Please upload a JPG, PNG, JPEG or PDF file');
                event.target.value = null;
            }
        }
    };

    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleUploadClick = (event: any) => {
        event.preventDefault();
        // setMissingFields([])
        if (fileInputRef.current !== null) {
            (fileInputRef.current as HTMLInputElement).click();
        }
    };

    const handleAdharCardBackChange = (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
            const maxSize = 2 * 1024 * 1024;
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setAdharCardBack(file);
                    setAdharCardBackName(file.name);
                } else {
                    setAdharCardBackError('* Please upload a file that is no larger than 2 MB.');
                }
            } else {
                setAdharCardBackError('* Please upload a JPG, PNG, JPEG or PDF file');
                event.target.value = null;
            }
        }
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
                                                                Pan Card front view{" "}

                                                            </label>
                                                            <div
                                                                id="divHabilitSelectors"
                                                                className="input-file-container "
                                                            >
                                                                <div className="file-upload mt-1">
                                                                    <div className="file-select">
                                                                        <div
                                                                            className="file-select-button"
                                                                            id="fileName"
                                                                        >
                                                                            Choose File
                                                                        </div>
                                                                        <div className="file-select-name" id="noFile">
                                                                            {panCardFrontName ? panCardFrontName : (basicDetails.pan_card_front ? basicDetails.pan_card_front : "No File Chosen ...")}
                                                                        </div>
                                                                        <input
                                                                            ref={fileInputRef} type="file" name="pan_card_front" onChange={handlePanCardFrontChange} accept=".jpg, .png, .jpeg, .pdf  "
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <label
                                                                    htmlFor="fileupload"
                                                                    className="input-file-trigger mt-1"
                                                                    id="labelFU"
                                                                    style={{ fontSize: "12px", marginLeft: "1px" }}
                                                                    tabIndex={0}
                                                                >
                                                                    <p style={{ fontSize: "13px" }}>
                                                                        You can upload any identity card's image
                                                                        jpg ,png ,jpeg and pdf file only (max size 2 MB) <span style={{ color: "red" }}>*</span>
                                                                    </p>
                                                                </label>
                                                            </div>
                                                            {panCardFrontSizeError ? (
                                                                <p className='text-danger'>{panCardFrontSizeError}</p>
                                                            ) : panCardFrontError ? (
                                                                <p className='text-danger'>{panCardFrontError}</p>
                                                            ) : errors.pan_card_front ? (
                                                                <p className='text-danger'>{errors.pan_card_front}</p>
                                                            ) : null}

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

                                                            </label>
                                                            <div
                                                                id="divHabilitSelectors"
                                                                className="input-file-container "
                                                            >
                                                                <div className="file-upload mt-1">
                                                                    <div className="file-select">
                                                                        <div
                                                                            className="file-select-button"
                                                                            id="fileName"
                                                                        >
                                                                            Choose File
                                                                        </div>
                                                                        <div className="file-select-name" id="noFile">
                                                                            {panCardBackName ? panCardBackName : (basicDetails.pan_card_back ? basicDetails.pan_card_back : "No File Chosen ...")}
                                                                        </div>
                                                                        <input
                                                                            type="file" name="pan_card_back" onChange={handlePanCardBackChange} accept=".jpg, .png, .jpeg, .pdf  "
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <label
                                                                    htmlFor="fileupload"
                                                                    className="input-file-trigger mt-1"
                                                                    id="labelFU"
                                                                    style={{ fontSize: "12px", marginLeft: "1px" }}
                                                                    tabIndex={0}
                                                                >
                                                                    <p style={{ fontSize: "13px" }}>
                                                                        You can upload any identity card's image
                                                                        jpg ,png ,jpeg and pdf file only (max size 2 MB) <span style={{ color: "red" }}>*</span>
                                                                    </p>
                                                                </label>
                                                            </div>
                                                            {panCardBackSizeError ? (
                                                                <p className='text-danger'>{panCardBackSizeError}</p>
                                                            ) : panCardBackError ? (
                                                                <p className='text-danger'>{panCardBackError}</p>
                                                            ) : errors.pan_card_back ? (
                                                                <p className='text-danger'>{errors.pan_card_back}</p>
                                                            ) : null}
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

                                                            </label>
                                                            <div
                                                                id="divHabilitSelectors"
                                                                className="input-file-container "
                                                            >
                                                                <div className="file-upload mt-1">
                                                                    <div className="file-select">
                                                                        <div
                                                                            className="file-select-button"
                                                                            id="fileName"
                                                                        >
                                                                            Choose File
                                                                        </div>
                                                                        <div className="file-select-name" id="noFile">
                                                                            {adharCardFrontName ? adharCardFrontName : (basicDetails.adhar_card_front ? basicDetails.adhar_card_front : "No File Chosen ...")}
                                                                        </div>
                                                                        <input
                                                                            type="file" name="adhar_card_front" onChange={handleAdharCardFrontChange} accept=".jpg, .png, .jpeg, .pdf  "
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <label
                                                                    htmlFor="fileupload"
                                                                    className="input-file-trigger mt-1"
                                                                    id="labelFU"
                                                                    style={{ fontSize: "12px", marginLeft: "1px" }}
                                                                    tabIndex={0}
                                                                >
                                                                    <p style={{ fontSize: "13px" }}>
                                                                        You can upload any identity card's image
                                                                        jpg ,png ,jpeg and pdf file only (max size 2 MB) <span style={{ color: "red" }}>*</span>
                                                                    </p>
                                                                </label>
                                                            </div>

                                                            {adharCardFrontError ? (
                                                                <p className='text-danger'>{adharCardFrontError}</p>
                                                            ) : (
                                                                errors.adhar_card_front && <p className='text-danger'>{errors.adhar_card_front}</p>
                                                            )}
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
                                                            </label>
                                                            <div
                                                                id="divHabilitSelectors"
                                                                className="input-file-container "
                                                            >
                                                                <div className="file-upload mt-1">
                                                                    <div className="file-select">
                                                                        <div
                                                                            className="file-select-button"
                                                                            id="fileName"
                                                                        >
                                                                            Choose File
                                                                        </div>
                                                                        <div className="file-select-name" id="noFile">
                                                                            {adharCardBackName ? adharCardBackName : (basicDetails.adhar_card_back ? basicDetails.adhar_card_back : "No File Chosen ...")}
                                                                        </div>
                                                                        <input
                                                                            type="file" name="adhar_card_back" onChange={handleAdharCardBackChange} accept=".jpg, .png, .jpeg, .pdf  "
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <label
                                                                    htmlFor="fileupload"
                                                                    className="input-file-trigger mt-1"
                                                                    id="labelFU"
                                                                    style={{ fontSize: "12px", marginLeft: "1px" }}
                                                                    tabIndex={0}
                                                                >
                                                                    <p style={{ fontSize: "13px" }}>
                                                                        You can upload any identity card's image
                                                                        jpg ,png ,jpeg and pdf file only (max size 2 MB) <span style={{ color: "red" }}>*</span>
                                                                    </p>
                                                                </label>
                                                            </div>
                                                            {adharCardBackError ? (
                                                                <p className='text-danger'>{adharCardBackError}</p>
                                                            ) : (
                                                                errors.adhar_card_back && <p className='text-danger'>{errors.adhar_card_back}</p>
                                                            )}
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
