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
    const [investorType, setInvestorType] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [principal_residence, setPrincipalResidence]: any = useState(false);
    const [experience, setExperience]: any = useState(false);
    const [net_worth, setNetWorth]: any = useState(false);
    const [prev_investment_exp, setPrevInvestmentExp]: any = useState(false);
    const [no_requirements, setNoRequirements]: any = useState(false);
    const [cofounder, setCofounder]: any = useState(false);

    const [annual_income, setAnnualIncome]: any = useState(false);
    const [financial_net_worth, setFinancialNetWorth]: any = useState(false);
    const [financial_annual_net_worth, setFinancialAnnualNetWorth]: any = useState(false);
    const [foreign_annual_income, setForeignAnnualIncome]: any = useState(false);
    const [foreign_net_worth, setForeignNetWorth]: any = useState(false);
    const [foreign_annual_net_worth, setForeignAnnualNetWorth]: any = useState(false);
    const [corporate_net_worth, setCorporateNetWorth]: any = useState(false);

    const [termscondition, setTermsCondition]: any = useState(false);
    const [accreditedcondition, setAccreditedcondition]: any = useState(false);
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
    const trueaccreditedcondition = () => {
        setAccreditedcondition(true);
    }
    const [investorDetails, seInvestorDetails] = useState({
        investorType: ""
    });
    const [terms, setTerms]: any = useState({
        category: "",
        principal_residence: "0",
        cofounder: "0",
        prev_investment_exp: "0",
        experience: "0",
        net_worth: "0",
        no_requirements: "0",
        annual_income: "0",
        financial_net_worth: "0",
        financial_annual_net_worth: "0",
        foreign_annual_income: "0",
        foreign_net_worth: "0",
        foreign_annual_net_worth: "0",
        corporate_net_worth: "0"

    });
    const [users, setUsers] = useState<any>({});
    const [errors, setErrors]: any = useState({});

    const handleRadioChange = (event: any) => {
        const { name, value, type, checked } = event.target;
        const selectedValue = event.target.value;
        setInvestorType(selectedValue);
        if (selectedValue === 'Angel Investor') {
            trueTermsCondition();
            setAccreditedcondition(false);
        } else if (selectedValue === 'Accredited Investors') {
            setTermsCondition(false);
            trueaccreditedcondition();
        } else {
            setTermsCondition(false);
            setAccreditedcondition(false);
        }
        if (type === 'radio' && name === 'investorType') {
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
            let go_back_btn_val = localStorage.getItem('go_back_selected_options_document_upload');
            getInvestorType(current_user_data.id)
                .then((res) => {
                    if (res.status === true) {
                        seInvestorDetails(res.data);
                        if (res.data.investorType == 'Accredited Investors') {
                            setAccreditedcondition(true);
                        }
                        if (res.data.investorType == 'Angel Investor') {
                            setTermsCondition(true);
                        }
                        if (go_back_btn_val == 'go_back_invisitor_type') {
                            if (res.data.investorType == 'Accredited Investors') {
                                setAccreditedcondition(true);
                            }
                            if (res.data.investorType == 'Angel Investor') {
                                setTermsCondition(true);
                            }
                        }
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
                        console.log(res.data);
                        setForeignAnnualIncome(res.data.foreign_annual_income)
                        setSelectedOption(res.data.category);
                        setFinancialNetWorth(res.data.financial_net_worth);
                        setAnnualIncome(res.data.annual_income);
                        setFinancialAnnualNetWorth(res.data.financial_annual_net_worth);
                        setForeignNetWorth(res.data.foreign_net_worth);
                        setForeignAnnualNetWorth(res.data.foreign_annual_net_worth);
                        setCorporateNetWorth(res.data.corporate_net_worth);
                        setNoRequirements(res.data.no_requirements);
                        setNetWorth(res.data.net_worth);
                        setExperience(res.data.experience);
                        setCofounder(res.data.cofounder);
                        setPrincipalResidence(res.data.principal_residence);
                        setPrevInvestmentExp(res.data.prev_investment_exp);
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
        if (!investorDetails.investorType) {
            if (!investorType) {
                errors.investorType = "*Please select investor type.";
            }
        }
        if (selectedOption === '1') {
            if (!principal_residence) {
                errors.principal_residence = "*Principal residence option is required.";
            }
            if (principal_residence) {
                if (!experience && !prev_investment_exp && !cofounder) {
                    errors.experience = "*One more option is required.";
                }
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
        } else if (selectedOption === '4') {
            if (!annual_income && !financial_net_worth && !financial_annual_net_worth) {
                errors.annual_income = "*Please select atleast one option.";
            }
            // if (!annual_income) {
            //     errors.annual_income = "*Annual income option is required.";
            // }
        } else if (selectedOption === '5') {
            if (!foreign_annual_income && !foreign_net_worth && !foreign_annual_net_worth) {
                errors.annual_income = "*Please select atleast one option.";
            }
            // if (!foreign_annual_income) {
            //     errors.foreign_annual_income = "*Annual income option is required.";
            // }
        } else if (selectedOption === '6') {
            if (!corporate_net_worth) {
                errors.corporate_net_worth = " *Net worth option is required.";
            }
        }
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const data = {
                id: current_user_id,
                user_id: current_user_id,
                investorType: investorType ? investorType : investorDetails.investorType,
                principal_residence: principal_residence,
                experience: experience,
                net_worth: net_worth,
                prev_investment_exp: prev_investment_exp,
                no_requirements: no_requirements,
                cofounder: cofounder,
                category: selectedOption,
                annual_income: annual_income,
                financial_net_worth: financial_net_worth,
                financial_annual_net_worth: financial_annual_net_worth,
                foreign_annual_income: foreign_annual_income,
                foreign_net_worth: foreign_net_worth,
                foreign_annual_net_worth: foreign_annual_net_worth,
                corporate_net_worth: corporate_net_worth,
            };
            // localStorage.setItem('session_category', selectedOption);
            // localStorage.setItem('session_principal_residence', principal_residence);
            // localStorage.setItem('session_experience ', experience);
            // localStorage.setItem('session_net_worth', net_worth);
            // localStorage.setItem('session_prev_investment_exp', prev_investment_exp);
            // localStorage.setItem('session_no_requirements', no_requirements);
            // localStorage.setItem('session_cofounder', cofounder);
            // localStorage.setItem('session_annual_income', annual_income);
            // localStorage.setItem('session_financial_net_worth', financial_net_worth);
            // localStorage.setItem('session_financial_annual_net_worth', financial_annual_net_worth);
            // localStorage.setItem('session_foreign_annual_income', foreign_annual_income);
            // localStorage.setItem('session_foreign_net_worth', foreign_net_worth);
            // localStorage.setItem('session_foreign_annual_net_worth', foreign_annual_net_worth);
            // localStorage.setItem('session_corporate_net_worth', corporate_net_worth);
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
                            router.push("/investor-steps/selectedoptionsdocumentupload");
                        }, 1000);
                        // setTimeout(() => {
                        //     router.push("/investor-steps/documentsupload");
                        // }, 1000);
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
                                                                            <option value="2">Body Corporate/VC/PE/Family Office/Corporate Institution</option>
                                                                            <option value="3">Accelerators and Incubators</option>
                                                                        </select>
                                                                        <i className="fa-solid fa-chevron-down"></i>
                                                                    </div>
                                                                    <div id="checkbox-group-1" className={selectedOption === '1' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox4"
                                                                                        name="principal_residence" value={principal_residence == 0 ? 0 : 1}
                                                                                        checked={principal_residence == 0 ? false : true}
                                                                                        onChange={() => setPrincipalResidence(!principal_residence)}
                                                                                    />
                                                                                </div>

                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox4">
                                                                                        Net tangible assets of at least INR 2 Crore excluding value of his principal residence.<span className="requiredclass">*</span>
                                                                                    </label>
                                                                                    {errors.principal_residence && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            {errors.principal_residence}
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
                                                                                        value={prev_investment_exp == 0 ? 0 : 1} onChange={() => setPrevInvestmentExp(!prev_investment_exp)} checked={prev_investment_exp == 0 ? false : true} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox5">Has invested in startups before</label>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox6" value={cofounder == 0 ? 0 : 1}
                                                                                        name="cofounder" onChange={() => setCofounder(!cofounder)} checked={cofounder == 0 ? false : true} />
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
                                                                                    <input type="checkbox" id="checkbox7" value={experience == 0 ? 0 : 1}
                                                                                        name="experience" onChange={() => setExperience(!experience)} checked={experience == 0 ? false : true} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox7">Senior management professional with at least 10 years of
                                                                                        experience.<span className="requiredclass">*</span>
                                                                                    </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                {errors.experience && (
                                                                                    <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                        {errors.experience}
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="checkbox-group-2" className={selectedOption === '2' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox8" value={net_worth == 0 ? 0 : 2}
                                                                                        name="net_worth" onChange={() => setNetWorth(!net_worth)} checked={net_worth == 0 ? false : true} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox8">Net worth of at least INR 10 Crore.<span className="requiredclass">*</span></label><br></br>
                                                                                    {errors.net_worth && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            {errors.net_worth}
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
                                                                                    <input type="checkbox" id="checkbox9" value={no_requirements == 0 ? 0 : 3}
                                                                                        name="no_requirements" onChange={() => setNoRequirements(!no_requirements)} checked={no_requirements == 0 ? false : true} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox9">No Requirement.<span className="requiredclass">*</span></label><br></br>
                                                                                    {errors.no_requirements && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            {errors.no_requirements}
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

                                                    {accreditedcondition &&
                                                        <div className="container" id="option_select">
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <select className="options"
                                                                        name="category" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                                                                        <option value="">--SELECT CATEGORY--</option>
                                                                        <option value="4">Indian Individuals/HUFs/Family Trusts/Sole Proprietorships</option>
                                                                        <option value="5">Foreign Individuals/Family Trusts/Sole Proprietorships</option>
                                                                        <option value="6">Body Corporates</option>
                                                                    </select>
                                                                    <div id="checkbox-group-4" className={selectedOption === '4' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox10" value={annual_income == 0 ? 0 : 4}
                                                                                        name="annual_income"
                                                                                        checked={annual_income == 0 ? false : true}
                                                                                        onChange={(e: any) => setAnnualIncome(!annual_income)} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox10">
                                                                                        Have an annual income of at least ₹2 crore in the preceding financial year.
                                                                                    </label><br></br>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input
                                                                                        type="checkbox"
                                                                                        id="checkbox11"
                                                                                        value={financial_net_worth == 0 ? 0 : 5}
                                                                                        name="financial_net_worth"
                                                                                        checked={financial_net_worth == 0 ? false : true} // Use a boolean expression
                                                                                        onChange={(e: any) => setFinancialNetWorth(!financial_net_worth)}
                                                                                    />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox11">Have a net worth of at least ₹7.5 crore with more than ₹3.75 crore of financial assets.</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox12" value={financial_annual_net_worth == 0 ? 0 : 6}
                                                                                        name="financial_annual_net_worth" checked={financial_annual_net_worth == 0 ? false : true}
                                                                                        onChange={(e: any) => setFinancialAnnualNetWorth(!financial_annual_net_worth)} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox12">Have an annual income of at least ₹1 crore and a net worth of at least ₹ 5 crore with more
                                                                                        than ₹ 2.5 crore of financial assets.</label>

                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="checkbox-group-5" className={selectedOption === '5' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox13" value={foreign_annual_income == 0 ? 0 : 7}
                                                                                        name="foreign_annual_income" checked={foreign_annual_income == 0 ? false : true}
                                                                                        onChange={(e: any) => setForeignAnnualIncome(!foreign_annual_income)} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox13">Have an annual income of at least $300,000.</label><br></br>
                                                                                    {errors.foreign_annual_income && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            {errors.foreign_annual_income}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox14" value={foreign_net_worth == 0 ? 0 : 8} name="foreign_net_worth" checked={foreign_net_worth == 0 ? false : true}
                                                                                        onChange={(e: any) => setForeignNetWorth(!foreign_net_worth)} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox14">Have a net worth of at least $1 million with more than $500,000 of financial assets.</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox15" value={foreign_annual_net_worth == 0 ? 0 : 9}
                                                                                        name="foreign_annual_net_worth" checked={foreign_annual_net_worth == 0 ? false : true}
                                                                                        onChange={(e: any) => setForeignAnnualNetWorth(!foreign_annual_net_worth)} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox15">Have an annual income of at least $150,000 and a net worth of at least $750,000 with more
                                                                                        than $350,000 of financial assets.</label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div id="checkbox-group-6" className={selectedOption === '6' ? 'visible' : 'hidden'}>
                                                                        <div className="same-card">
                                                                            <div className="row">
                                                                                <div className="col-auto">
                                                                                    <input type="checkbox" id="checkbox16" value={corporate_net_worth == 0 ? 0 : 10} checked={corporate_net_worth == 0 ? false : true}
                                                                                        onChange={(e: any) => setCorporateNetWorth(!corporate_net_worth)} />
                                                                                </div>
                                                                                <div className="col">
                                                                                    <label htmlFor="checkbox16">Net worth greater than or equal to INR 50 crore or, $7.5 million.</label><br></br>
                                                                                    {errors.corporate_net_worth && (
                                                                                        <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                            {errors.corporate_net_worth}
                                                                                        </span>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="same-card">
                                                                        <div className="row">
                                                                            {errors.annual_income && (
                                                                                <span className="small error text-danger mb-2 d-inline-block error_login">
                                                                                    {errors.annual_income}
                                                                                </span>
                                                                            )}
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