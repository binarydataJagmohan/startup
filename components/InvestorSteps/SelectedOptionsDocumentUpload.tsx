import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import { uploadDocuments, fetchSingleUserDocuments,getSingleUserData, SelectedOptionsuploadDocuments, getAngelInvestorTerms} from "../../lib/frontendapi";
import { getCurrentUserData } from "../../lib/session";
import { event } from "jquery";

interface UserData {
    id?: string;
}
export default function SelectedOptionsDocumentUpload(): any {
    const [proof_of_network, setProofOfNetwork] = useState(null);
    const [proof_of_income, setProofOfIncome] = useState(null);
    const [certificate_of_incorporation, setCertificateOfIncorporation] = useState(null);
    const [ca_signed_net_angeable_2_crore, setCASignedNetAngeable2Crore] = useState(null);
    const [net_worth_atleast_10_crore, setNetWorthAtleast10Crore] = useState(null);
    const [bank_statement_3_years, setBankStatement3Years] = useState(null);
    const [incorporation_certificate, setIncorporationCertificate] = useState(null);
    
    const [signup_success, setSignupSuccess] = useState(false);
    const [document_id, setDocumentId] = useState("");
    const [errors, setErrors] = useState({
        proof_of_network: "",
        proof_of_income: "",
        certificate_of_incorporation: "",
        ca_signed_net_angeable_2_crore: "",
        net_worth_atleast_10_crore:"",
        bank_statement_3_years:"",
        incorporation_certificate:""
    });
    const [basicDetails, setBasicDetails] = useState({
        proof_of_network: "",
        proof_of_income: "",
        certificate_of_incorporation: "",
        ca_signed_net_angeable_2_crore: "",
        net_worth_atleast_10_crore: "",
        bank_statement_3_years:"",
        incorporation_certificate:"",
        documnet_id: '',
    });
    const [current_user_id, setCurrentUserId] = useState("");
    const [users, setUsers] = useState<any>({});
    const [terms, setTerms] = useState({
        category: "",
        principal_residence: "0",
        cofounder: "0",
        prev_investment_exp: "0",
        experience: "0",
        net_worth: "0",
        no_requirements: "0"
    });
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

            // fetchSingleUserDocuments(current_user_data.id)
            //     .then((res) => {
            //         if (res.status == true) {
            //             setBasicDetails(res.data);
            //             //console.log(res.data);
            //             setProofOfNetwork(res.data.pan_card_front);
            //             setProofOfIncome(res.data.pan_card_back);
            //             setCertificateOfIncorporation(res.data.adhar_card_front);
            //             setCASignedNetAngeable2Crore(res.data.adhar_card_back);
            //             setNetWorthAtleast10Crore(res.data.adhar_card_back);
            //             setBankStatement3Years(res.data.adhar_card_back);
            //             setIncorporationCertificate(res.data.adhar_card_back);
            //         } else {
            //             toast.error(res.message, {
            //                 position: toast.POSITION.TOP_RIGHT,
            //             });
            //         }
            //     })
            //     .catch((err) => {
            //         toast.error(err.message, {
            //             position: toast.POSITION.BOTTOM_RIGHT,
            //         });
            //     });
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

    const handlMenuSubmit = (event: any) => {
        event.preventDefault();
        const errors: any = {};
        if(users.investorType === 'Accredited Investors'){
            if(terms.category == '2' || terms.category == '3'){
                if (!proof_of_network) {
                    errors.proof_of_network = "File is required";
                }
                if (!proof_of_income) {
                    errors.proof_of_income = "File is required";
                }
                if (!certificate_of_incorporation) {
                    errors.certificate_of_incorporation = "File is required";
                }
            } else {
                if (!proof_of_network) {
                    errors.proof_of_network = "File is required";
                }
                if (!proof_of_income) {
                    errors.proof_of_income = "File is required";
                }
            }
        }
        if(users.investorType === 'Angel Investor'){
            if(terms.category == '2'){
                if (!net_worth_atleast_10_crore) {
                    errors.net_worth_atleast_10_crore = "File is required";
                }
                if (!bank_statement_3_years) {
                    errors.bank_statement_3_years = "File is required";
                }
                if (!incorporation_certificate) {
                    errors.incorporation_certificate = "File is required";
                }
            }
            if(terms.category == '3'){
                if (!bank_statement_3_years) {
                    errors.bank_statement_3_years = "File is required";
                }
                if (!incorporation_certificate) {
                    errors.incorporation_certificate = "File is required";
                }
            }
            if(terms.category == '1'){
                if (!ca_signed_net_angeable_2_crore) {
                    errors.ca_signed_net_angeable_2_crore = "File is required";
                }
            }
        }
        setErrors(errors);
        console.log(Object.keys(errors).length);
        if (Object.keys(errors).length === 0) {
            const currentUserData: any = getCurrentUserData();
            const data = {
                user_id: currentUserData.id,
            };
            SelectedOptionsuploadDocuments(data, proof_of_network, proof_of_income, certificate_of_incorporation, ca_signed_net_angeable_2_crore, net_worth_atleast_10_crore, bank_statement_3_years, incorporation_certificate)
                .then((res) => {
                    if (res.status == true) {
                        console.log(data);
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                        if(users.investorType !== 'Regular Investor'){
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

    const handleProofOfNetworkChange = (event: any) => {
        const file = event.target.files[0];
        setProofOfNetwork(file);
    };


    const handleProofOfIncomeChange = (event: any) => {
        const file = event.target.files[0];
        setProofOfIncome(file);
    };

    const handleCertificateOfIncorporationChange = (event: any) => {
        const file = event.target.files[0];
        setCertificateOfIncorporation(file);
    };

    const handleCASignedNetAngeable2CroreChange = (event: any) => {
        const file = event.target.files[0];
        setCASignedNetAngeable2Crore(file);
    };

    const handleNetWorthAtleast10CroreChange = (event: any) => {
        const file = event.target.files[0];
        setNetWorthAtleast10Crore(file);
    };

    const handleBankStatement3YearsChange = (event: any) => {
        const file = event.target.files[0];
        setBankStatement3Years(file);
    };

    const handleIncorporationCertificateChange = (event: any) => {
        const file = event.target.files[0];
        setIncorporationCertificate(file);
    }

    const handleClickGoBackButton = () => {
        const status = 'go_back_invisitor_type';
        localStorage.setItem('go_back_selected_options_document_upload', 'go_back_invisitor_type');
        window.location.href = '/investor-steps/investor-type';
    }

    return (
        <>
            <div className="left-bar">
                <div className="container">
                    <div id="app">
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
                                                        {users.investorType === 'Accredited Investors' 
                                                            ?
                                                                
                                                                terms.category == '2' || terms.category == '3'
                                                                ?
                                                                    <>
                                                                        <div className="col-md-6 mt-5">
                                                                            <label
                                                                                htmlFor="exampleFormControlInput1"
                                                                                className="form-label"
                                                                            >
                                                                                Proof Of Network{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="proof_of_network" onChange={handleProofOfNetworkChange} accept="image/jpeg, image/png" />
                                                                            <p>
                                                                                You can upload proof of network 
                                                                                pdf, docs, xls, jpg, jpeg, png file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.proof_of_network && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.proof_of_network}</span>}
                                                                            {basicDetails.proof_of_network ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.proof_of_network} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
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
                                                                                Proof Of Income{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="proof_of_income" onChange={handleProofOfIncomeChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload proof of income
                                                                                pdf, docs, xls, jpg, jpeg, png file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.proof_of_income && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.proof_of_income}</span>}

                                                                            {basicDetails.proof_of_income ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.proof_of_income} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
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
                                                                                Certificate Of Incorporation{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="certificate_of_incorporation" onChange={handleCertificateOfIncorporationChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload certificate of incorporation
                                                                                pdf, docs, xls, jpg, jpeg, png file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.certificate_of_incorporation && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.certificate_of_incorporation}</span>}

                                                                            {basicDetails.certificate_of_incorporation ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.certificate_of_incorporation} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }}/>
                                                                            ) : (
                                                                                null
                                                                            )
                                                                            }

                                                                        </div>
                                                                    </>
                                                                :
                                                                    <>
                                                                        <div className="col-md-6 mt-5">
                                                                            <label
                                                                                htmlFor="exampleFormControlInput1"
                                                                                className="form-label"
                                                                            >
                                                                                Proof Of Network{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="proof_of_network" onChange={handleProofOfNetworkChange} accept="image/jpeg, image/png" />
                                                                            <p>
                                                                                You can upload proof of network 
                                                                                pdf, docs, xls, jpg, jpeg, png file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.proof_of_network && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.proof_of_network}</span>}
                                                                            {basicDetails.proof_of_network ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.proof_of_network} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
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
                                                                                Proof Of Income{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="proof_of_income" onChange={handleProofOfIncomeChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload proof of income
                                                                                pdf, docs, xls, jpg, jpeg, png file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.proof_of_income && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.proof_of_income}</span>}

                                                                            {basicDetails.proof_of_income ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.proof_of_income} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                                            ) : (
                                                                                null
                                                                            )
                                                                            }

                                                                        </div>
                                                                    </>
                                                            :
                                                                ''
                                                        }
                                                        {users.investorType === 'Angel Investor' 
                                                            ?
                                                                terms.category == '2'
                                                                ?
                                                                    <>
                                                                        <div className="col-md-6 mt-5">
                                                                            <label
                                                                                htmlFor="exampleFormControlInput1"
                                                                                className="form-label"
                                                                            >
                                                                                Net Worth of at least INR 10 Crore{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="ca_signed_net_angeable_2_crore" onChange={handleNetWorthAtleast10CroreChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload Net worth of at least INR 10 Crore
                                                                                docs, pdf file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.net_worth_atleast_10_crore && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.net_worth_atleast_10_crore}</span>}

                                                                            {basicDetails.net_worth_atleast_10_crore ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.net_worth_atleast_10_crore} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
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
                                                                                3 Years Bank Statement{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="3_years_bank_statement" onChange={handleBankStatement3YearsChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload 3 Years Bank Statement
                                                                                docs, pdf file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.bank_statement_3_years && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.bank_statement_3_years}</span>}

                                                                            {basicDetails.bank_statement_3_years ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.bank_statement_3_years} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
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
                                                                                Incorporation Certificate{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="incorporation_certificate" onChange={handleIncorporationCertificateChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload incorporation certificate
                                                                                docs, pdf, jpg, png, jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.incorporation_certificate && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.incorporation_certificate}</span>}

                                                                            {basicDetails.incorporation_certificate ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.incorporation_certificate} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                                            ) : (
                                                                                null
                                                                            )
                                                                            }
                                                                        </div>
                                                                    </>
                                                                :
                                                                    terms.category == '3'
                                                                    ?
                                                                        <>
                                                                            <div className="col-md-6 mt-5">
                                                                            <label
                                                                                htmlFor="exampleFormControlInput1"
                                                                                className="form-label"
                                                                            >
                                                                                3 Years Bank Statement{" "}
                                                                                <span style={{ color: "red" }}>*</span>
                                                                            </label>
                                                                            <input type="file" name="3_years_bank_statement" onChange={handleBankStatement3YearsChange} accept="image/jpeg, image/png"></input>
                                                                            <p>
                                                                                You can upload 3 Years Bank Statement
                                                                                docs, pdf file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                            </p>
                                                                            {errors.bank_statement_3_years && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.bank_statement_3_years}</span>}

                                                                            {basicDetails.bank_statement_3_years ? (
                                                                                <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.bank_statement_3_years} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
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
                                                                                    Incorporation Certificate{" "}
                                                                                    <span style={{ color: "red" }}>*</span>
                                                                                </label>
                                                                                <input type="file" name="incorporation_certificate" onChange={handleIncorporationCertificateChange} accept="image/jpeg, image/png"></input>
                                                                                <p>
                                                                                    You can upload incorporation certificate
                                                                                    docs, pdf, jpg, png, jpeg file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                                </p>
                                                                                {errors.incorporation_certificate && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.incorporation_certificate}</span>}

                                                                                {basicDetails.incorporation_certificate ? (
                                                                                    <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.incorporation_certificate} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                                                ) : (
                                                                                    null
                                                                                )
                                                                                }
                                                                            </div>
                                                                        </>
                                                                    :
                                                                        terms.category == '1'
                                                                        ?
                                                                            <>
                                                                                <div className="col-md-6 mt-5">
                                                                                    <label
                                                                                        htmlFor="exampleFormControlInput1"
                                                                                        className="form-label"
                                                                                    >
                                                                                        CA Signed of Net Angeable of 2 Crore{" "}
                                                                                        <span style={{ color: "red" }}>*</span>
                                                                                    </label>
                                                                                    <input type="file" name="ca_signed_net_angeable_2_crore" onChange={handleCASignedNetAngeable2CroreChange} accept="image/jpeg, image/png"></input>
                                                                                    <p>
                                                                                        You can upload CA signed of net angeable of 2 crore
                                                                                        docs, pdf file only (max size 20 MB) <span style={{ color: "red" }}>*</span>
                                                                                    </p>
                                                                                    {errors.ca_signed_net_angeable_2_crore && <span className="small error text-danger mb-2 d-inline-block error_login">{errors.ca_signed_net_angeable_2_crore}</span>}

                                                                                    {basicDetails.ca_signed_net_angeable_2_crore ? (
                                                                                        <img src={process.env.NEXT_PUBLIC_IMAGE_URL + "docs/" + basicDetails.ca_signed_net_angeable_2_crore} alt="Document Image" style={{ width: '150px', height: '100px', margin: ' 5% 0% ', objectFit: 'cover' }} />
                                                                                    ) : (
                                                                                        null
                                                                                    )
                                                                                    }

                                                                                </div>
                                                                            </>
                                                                        :
                                                                            ''
                                                            :
                                                                ''
                                                        }
                                                    </div>
                                                    <div className="row mt-3">
                                                        <div className="col-md-6" style={{ textAlign: "left", fontSize: "12px" }}>
                                                            <a
                                                                href='#'
                                                                className="btnclasssmae" id="back"
                                                                onClick={handleClickGoBackButton}
                                                            >
                                                                Go back
                                                            </a>
                                                            {/* <a
                                                                href={`/investor-steps/investor-type`}
                                                                className="btnclasssmae" id="back"
                                                            >
                                                                Go back
                                                            </a> */}
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
