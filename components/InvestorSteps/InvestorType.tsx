import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { investorTypeInfoSave, getInvestorType} from "../../lib/frontendapi";
import {
    removeToken,
    removeStorageData,
    getCurrentUserData,
} from "../../lib/session";

const alertStyle = {
    color: "red",
};
const textStyle = {
    textTransform: "capitalize",
};

export default function businessinfo(props: any) {
    const router = useRouter();
    // const [blId, setBlId] = useState("");
    // const [forwarduId, setForwarduId] = useState("");
    // const [business_page_id, setBusinessPageId] = useState("");
    const [current_user_id, setCurrentUserId] = useState(false);
    // const [business_address, setBusinessAddress] = useState("");
    // const [numberOfLocations, setNumberOfLocations] = useState("");
    const [signup_success, setSignupSuccess] = useState(false);
    // const [disableBaddr, setDisableBaddr] = useState(false);
    // const [disableBemail, setDisableBemail] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [ investorDetails,  seInvestorDetails] = useState({
        user_id: current_user_id,
        investorType: ""
    });
    const handleChange = (event) => {
        const { name, value, type, checked} = event.target;
        if (type === 'radio' && name === 'investorType') {
            // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
            const typeValue = checked ? 'Accredited Investors' : 'Angel Investor';
            seInvestorDetails((prevState) => {
              return {
                ...prevState,
                investorDetails: typeValue,
                user_id: current_user_id,
              };
            });
          }
         seInvestorDetails((prevState) => {
            return {
                ...prevState,
                [name]: value,
                user_id: current_user_id,
            };
        });
    };

    useEffect(() => {
        const current_user_data = getCurrentUserData();
        if (current_user_data.id) {
            setCurrentUserId(current_user_data.id);
            getInvestorType(current_user_data.id)
                .then((res) => {
                    if (res.status === true) {
                         seInvestorDetails(res.data);
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

    const SubmitForm = async () => {
        try {
            const res = await investorTypeInfoSave( investorDetails);
            if (res.status == true) {
                toast.success("Profile has been Updated Successfully.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                  });
                setTimeout(() => {
                    router.push("/");
                }, 1000);
            } else {
                toast.error("Details has not been saved successfully", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        } catch (err) {
            toast.error("Business Details has not been saved successfully", {
                position: toast.POSITION.TOP_RIGHT,
                toastId: "error",
            });
        }
    };

    if (signup_success) return router.push("/steps/customizereview");
    return (
        <>
            <div className="page-title-area item-bg-5">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Complete Account Details</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="left-bar">
                <div className="container">
                    <div id="app">
                        <ol className="step-indicator">
                            <li className="">
                                <div className="step_name">
                                    Step <span>1</span>
                                </div>
                                <div className="step_border">
                                    <div className="step_complete">
                                        <i className="flaticon-checked" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div
                                    className="caption hidden-xs hidden-sm"
                                    style={{ color: "#82b440" }}
                                >
                                    <span>PERSONAL INFORMATION</span>
                                </div>
                            </li>
                            <li className="active">
                                <div className="step_name">
                                    Step <span>2</span>
                                </div>
                                <div className="step_border">
                                    <div className="step">
                                        <img
                                            className="sidebar-img w-100"
                                            src="/assets/img/investor/dollar.png"
                                        />
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm">
                                    <span>INVESTOR INFORMATION</span>
                                </div>
                            </li>
                            {/* <li className="">
                                <div className="step_name">
                                    Step <span>3</span>
                                </div>
                                <div className="step_border">
                                    <div className="step">
                                        <img
                                            className="sidebar-img w-75"
                                            src="/assets/img/sidebar/docs.png"
                                        />
                                    </div>
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
                                        <img
                                            className="sidebar-img w-75"
                                            src="/assets/img/sidebar/bank.png"
                                        />
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm">
                                    <span>BANK INFORMATION</span>
                                </div>
                            </li> */}
                        </ol>
                        <div className="container">
                            <div className="register-form">
                                {/*<h4 className="text-center mt-5">Find your business</h4>*/}
                                <div className="row step_one">
                                    <div className="col-md-12">
                                        <form className="needs-validation mb-4" onSubmit={handleSubmit(SubmitForm)}>
                                            <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                                                {" "}
                                               Investor Information{" "}
                                                <i
                                                    style={{ cursor: "pointer" }}
                                                    className="fa fa-info-circle"
                                                    aria-hidden="true"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Please select your investor type."
                                                ></i>
                                            </h4>
                                            <div className="row justify-content-center">
                                                <div className="col-md-8" id="register">
                                                    <div className="row">
                                                        <div className="form-group col-md-12">
                                                            <div className="col-md-12 text-center twobox">
                                                                <div className="images-investor text-center">
                                                                    <ul className="investor-classs">
                                                                        <li>
                                                                            <h6 className="mt-3">Accredited Investors</h6>
                                                                            <input
                                                                                className="form-check-input gender-radio" id="myCheckbox1"
                                                                                {...register("investorType", {
                                                                                    required: true,
                                                                                })}
                                                                                onChange={handleChange}
                                                                                type="radio"
                                                                                name="investorType"
                                                                                value="Accredited Investors" checked={investorDetails.investorType === 'Accredited Investors'}
                                                                            />
                                                                            <label htmlFor="myCheckbox1">
                                                                                <img src="/assets/img/investor/accredited.png" />
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <h6 className="mt-3">Angel Investor</h6>
                                                                            <input
                                                                                className="form-check-input gender-radio" id="myCheckbox2"
                                                                                {...register("investorType", {
                                                                                    required: true,
                                                                                })} onChange={handleChange}
                                                                                type="radio"
                                                                                name="investorType"
                                                                                value="Angel Investor" checked={investorDetails.investorType === 'Angel Investor'}
                                                                            />
                                                                            <label htmlFor="myCheckbox2">
                                                                                <img src="/assets/img/investor/angel.png" />
                                                                            </label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="help-block with-errors" />
                                                                <div className="error text-center">
                                                                    {errors.investorType && errors.investorType.type === "required" && (
                                                                        <p
                                                                            className="text-danger"
                                                                            style={{ textAlign: "center", fontSize: "12px" }}
                                                                        >
                                                                            *Please Select Investor Type.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div
                                                            className="col-md-6"
                                                            style={{ textAlign: "left" }}
                                                        >
                                                            <a
                                                                href={`/investor-steps/findbusiness`}
                                                                className="btn btn-primary"
                                                                id="back"
                                                            >
                                                                Go back
                                                            </a>
                                                        </div>

                                                        <div
                                                            className="col-md-6"
                                                            style={{ textAlign: "right" }}
                                                        >
                                                            <button type="submit" className="btn btn-primary">
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
                <ToastContainer autoClose={2000} />
            </div>
        </>
    );
}
