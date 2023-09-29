import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { investorTypeInfoSave, getSingleUserData, getInvestorType, getAngelInvestorTerms } from "../../lib/frontendapi";
import {
    removeToken,
    removeStorageData,
    getCurrentUserData,
} from "../../lib/session";
import Link from 'next/link';
import Image from "next/image";
const alertStyle = {
    color: "red",
};
const textStyle = {
    textTransform: "capitalize",
};
interface CurrentUserData {
    id?: string;
    name?: string;
}
export default function InvestorType(): any {
    const router = useRouter();
    const [current_user_id, setCurrentUserId] = useState("");
    const [investorType, setInvestorType] = useState(''); // Initialize with appropriate values
    const [selectedOption, setSelectedOption] = useState('');
    const [principal_residence, setPrincipalResidence] = useState(false); // Initialize with appropriate values
    const [experience, setExperience] = useState(false); // Initialize with appropriate values
    const [net_worth, setNetWorth] = useState(false); // Initialize with appropriate values
    const [prev_investment_exp, setPrevInvestmentExp] = useState(false); // Initialize with appropriate values
    const [no_requirements, setNoRequirements] = useState(false); // Initialize with appropriate values
    const [cofounder, setCofounder] = useState(false); // Initialize with appropriate values

    const [termscondition, setTermsCondition] = useState(false);
    const trueTermsCondition = () => {
        setSelectedOption('');
        setPrincipalResidence(false);
        setExperience(false);
        setNetWorth(false);
        setPrevInvestmentExp(false);
        setNoRequirements(false);
        setCofounder(false);
        setTermsCondition(true);
    }
    const [investorDetails, seInvestorDetails] = useState({
        investorType: ""
    });
    const [terms, setTerms] = useState({
        category: "",
        principal_residence: "0",
        cofounder: "0",
        prev_investment_exp: "0",
        experience: "0",
        net_worth: "0",
        no_requirements: "0"
    });
    const [users, setUsers] = useState<any>({});
    const [errors, setErrors]: any = useState({});

    const handleRadioChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        const selectedValue = event.target.value;
        setInvestorType(selectedValue);
        if (selectedValue === 'Angel Investor' || selectedValue === 'Accredited Investors') {
            trueTermsCondition();
        } else {
            setTermsCondition(false);
        }
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

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox' && name === 'principal_residence') {
            // Set the value of principal_residence to '1' if the checkbox is checked, '0' otherwise
            const principal_residenceValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    principal_residence: principal_residenceValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'cofounder') {
            // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
            const cofounderValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    cofounder: cofounderValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'prev_investment_exp') {
            // Set the value of prev_investment_exp to '1' if the checkbox is checked, '0' otherwise
            const prev_investment_expValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    prev_investment_exp: prev_investment_expValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'experience') {
            // Set the value of experience to '1' if the checkbox is checked, '0' otherwise
            const experienceValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    experience: experienceValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'net_worth') {
            // Set the value of net_worth to '1' if the checkbox is checked, '0' otherwise
            const net_worthValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    net_worth: net_worthValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'no_requirements') {
            // Set the value of no_requirements to '1' if the checkbox is checked, '0' otherwise
            const no_requirementsValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    no_requirements: no_requirementsValue,
                    user_id: current_user_id,
                };
            });
        }
        else {
            setTerms((prevState) => {
                return {
                    ...prevState,
                    [name]: value,
                    user_id: current_user_id,
                };
            });
        }
    };

    useEffect(() => {
        const current_user_data: any = getCurrentUserData();
        setCurrentUserId(current_user_data.id);
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
        if (current_user_data.id) {
            getInvestorType(current_user_data.id)
                .then((res) => {
                    if (res.status === true) {
                        seInvestorDetails(res.data);
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

            getAngelInvestorTerms(current_user_data.id)
                .then((res) => {
                    if (res.status === true) {
                        setTerms(res.data);
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

    const SubmitForm = async (e: any) => {
        e.preventDefault();
        const errors: any = {};
        if (!investorType) {
            errors.investorType = "*Please select investor type";
        }
        if (selectedOption === '1') {
            if (!principal_residence) {
                errors.principal_residence = "*Principal residence option is required";
            }
            // if (!experience) {
            //     errors.experience = "*One more option is required.";
            // }
        } else if (selectedOption === '2') {
            if (!net_worth) {
                errors.net_worth = "*Net worth option is required.";
            }
        } else if (selectedOption === '3') {
            if (!no_requirements) {
                errors.no_requirements = "*No requirements option is required.";
            }
        }

        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const data = {
                id: current_user_id,
                user_id: current_user_id,
                investorType: investorType,
                principal_residence: principal_residence,
                experience: experience,
                net_worth: net_worth,
                prev_investment_exp: prev_investment_exp,
                no_requirements: no_requirements,
                cofounder: cofounder,
                category: selectedOption,
            };
            investorTypeInfoSave(data)
                .then(res => {

                    if (res.status == true) {
                        const data = {
                            notify_from_user: current_user_id,
                            notify_to_user: "1",
                            notify_msg: `The user ${users.name} has successfully completed their profile. Please review the profile details and ensure it meets the required standards.`,
                            notification_type: "Profile Completed",
                            each_read: "unread",
                            status: "active"
                        };
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                        setTimeout(() => {
                            router.push("/investor-steps/documentsupload");
                        }, 1000);
                        // if (users.approval_status === 'pending') {
                        //     setTimeout(() => {
                        //         router.push("/investor/thank-you");
                        //     }, 1000);
                        // }
                        // if (users.approval_status === 'approved') {
                        //     setTimeout(() => {
                        //         router.push("/investor/campaign");
                        //     }, 1000);
                        // }
                    } else {
                        toast.error(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                })
                .catch(err => {

                    console.log('error');

                });
        }
    };

    return (
        <>
            <div className="left-bar">
                <div className="container">
                    <div id="app">
                        <div className="container">
                            <div className="register-form style-change-checkbox">
                                <div className="row step_one">
                                    <div className="col-md-12">
                                        <form className="needs-validation mb-4" onSubmit={SubmitForm}>
                                            <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                                                {" "}
                                                Investor Information{" "}
                                                <i
                                                    style={{ cursor: "pointer" }}
                                                    className="fa fa-info-circle"
                                                    aria-hidden="true"
                                                    data-toggle="tooltip"
                                                    data-placement="top"
                                                    title="Please select your investor type.That would be helpful to verify your account."
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
                                                                                type="radio"
                                                                                name="investorType"
                                                                                value="Accredited Investors"
                                                                                onClick={handleRadioChange}
                                                                                checked={investorDetails.investorType === 'Accredited Investors'}
                                                                            />
                                                                            <label htmlFor="myCheckbox1">
                                                                                <Image
                                                                                    src="/assets/img/investor/accredited.png"
                                                                                    alt=""
                                                                                    width={187}
                                                                                    height={150}
                                                                                />
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <h6 className="mt-3">Angel Investor</h6>
                                                                            <input
                                                                                className="form-check-input gender-radio" id="myCheckbox2"
                                                                                type="radio"
                                                                                name="investorType"
                                                                                value="Angel Investor"
                                                                                onClick={handleRadioChange}
                                                                                checked={investorDetails.investorType === 'Angel Investor'}
                                                                            />
                                                                            <label htmlFor="myCheckbox2">
                                                                                <Image
                                                                                    src="/assets/img/investor/angel.png"
                                                                                    alt=""
                                                                                    width={187}
                                                                                    height={150}
                                                                                />
                                                                            </label>
                                                                        </li>
                                                                        <li>
                                                                            <h6 className="mt-3">Regular Investor</h6>
                                                                            <input
                                                                                className="form-check-input gender-radio" id="myCheckbox3"
                                                                                type="radio"
                                                                                name="investorType"
                                                                                value="Regular Investor"
                                                                                onClick={handleRadioChange}
                                                                                checked={investorDetails.investorType === 'Regular Investor'}
                                                                            />
                                                                            <label htmlFor="myCheckbox3">
                                                                                <img src="/assets/img/investor/regular.png" />
                                                                            </label>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="help-block with-errors" />
                                                                <div className="error text-center">
                                                                    {errors.investorType && (
                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                            {errors.investorType}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {termscondition &&
                                                        <div className="container" id="option_select">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="custom-select-bar position-relative">
                                                                        <select className="options" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                                                                            <option value="">--SELECT CATEGORY--</option>
                                                                            <option value="1">Individual</option>
                                                                            <option value="2">Body Corporate/VC/PE/Family Office 1 /Corporate Institution</option>
                                                                            <option value="3">Accelerators and Incubators</option>
                                                                        </select>
                                                                        <i className="fa-solid fa-chevron-down"></i>
                                                                    </div>
                                                                    <div id="checkbox-group-1" className={selectedOption === '1' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox4"
                                                                                        name="principal_residence" value="1"
                                                                                        checked={principal_residence}
                                                                                        onChange={() => setPrincipalResidence(!principal_residence)}
                                                                                    />
                                                                                </div>

                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox4">
                                                                                        Net tangible assets of at least INR 2 Crore excluding value of his principal residence.<span className="requiredclass">*</span>
                                                                                    </label>
                                                                                    {errors.principal_residence && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            *Principal residence option is required.
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox5"
                                                                                        name="prev_investment_exp"
                                                                                        value="1" onChange={() => setPrevInvestmentExp(!prev_investment_exp)} checked={prev_investment_exp} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox5">Has invested in startups before</label>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox6" value="1"
                                                                                        name="cofounder" onChange={() => setCofounder(!cofounder)} checked={cofounder} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox6">come from an entrepreneurial family or have been a
                                                                                        founder/co-founder of a business
                                                                                        venture</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox7" value="1"
                                                                                        name="experience" onChange={() => setExperience(!experience)} checked={experience} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox7">Senior management professional with at least 10 years of
                                                                                        experience.<span className="requiredclass">*</span>
                                                                                    </label>
                                                                                    {/* {errors.experience && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            *One more option is required..
                                                                                        </span>
                                                                                    )} */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="checkbox-group-2" className={selectedOption === '2' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox8" value="1"
                                                                                        name="net_worth" onChange={() => setNetWorth(!net_worth)} checked={net_worth} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox8">Net worth of at least INR 10 Crore.<span className="requiredclass">*</span></label><br></br>
                                                                                    {errors.net_worth && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            *No Requirement option is required.
                                                                                        </span>
                                                                                    )}
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="checkbox-group-3" className={selectedOption === '3' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox9" value="1"
                                                                                        name="no_requirements" onChange={() => setNoRequirements(!no_requirements)} checked={no_requirements} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox9">No Requirement.<span className="requiredclass">*</span></label><br></br>
                                                                                    {errors.no_requirements && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            *No Requirement option is required.
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                    <div className="row mt-3">
                                                        <div
                                                            className="col-md-6 col-6"
                                                            style={{ textAlign: "left" }}
                                                        >
                                                            <Link
                                                                href={`/investor-steps/findbusiness`}
                                                                className="btnclasssmae"
                                                                id="back"
                                                            >
                                                                Go back
                                                            </Link>
                                                        </div>

                                                        <div
                                                            className="col-md-6 col-6"
                                                            style={{ textAlign: "right" }}
                                                        >
                                                            <button className="btnclasssmae">
                                                                Submit
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