import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { getCurrentUserData } from "../../lib/session";
import { angelAccreditedTermsSave, getAccreditedInvestorTerms } from "../../lib/frontendapi";
import $ from "jquery";
const alertStyle = {
    color: 'red',
};

const textStyle = {
    textTransform: 'capitalize',
};

interface UserData {
    id?: string;
}

export default function AccreditedInvestors() {
    const router = useRouter();
    const [current_user_id, setCurrentUserId] = useState("");
    const [terms, setTerms] = useState({
        user_id: current_user_id,
        annual_income: "0",
        financial_net_worth: "0",
        financial_annual_net_worth: "0",
        foreign_annual_income: "0",
        foreign_net_worth: "0",
        foreign_annual_net_worth: "0",
        corporate_net_worth: "0",
        category: "",
    });
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [missingFields, setMissingFields] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMissingFields([]);
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox' && name === 'annual_income') {
            // Set the value of annual_income to '1' if the checkbox is checked, '0' otherwise
            const annual_incomeValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    annual_income: annual_incomeValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'financial_net_worth') {
            // Set the value of  financial_net_worth to '1' if the checkbox is checked, '0' otherwise
            const financial_net_worthValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    financial_net_worth: financial_net_worthValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'financial_annual_net_worth') {
            // Set the value of financial_annual_net_worth to '1' if the checkbox is checked, '0' otherwise
            const financial_annual_net_worthValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    financial_annual_net_worth: financial_annual_net_worthValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'foreign_annual_income') {
            // Set the value of foreign_annual_income to '1' if the checkbox is checked, '0' otherwise
            const foreign_annual_incomeValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    foreign_annual_income: foreign_annual_incomeValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'foreign_net_worth') {
            // Set the value of  foreign_net_worth to '1' if the checkbox is checked, '0' otherwise
            const foreign_net_worthValue = checked ? '1' : '0';
            // console.log( foreign_net_worthValue);
            setTerms((prevState) => {
                return {
                    ...prevState,
                    foreign_net_worth: foreign_net_worthValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'foreign_annual_net_worth') {
            // Set the value of foreign_annual_net_worth to '1' if the checkbox is checked, '0' otherwise
            const foreign_annual_net_worthValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    foreign_annual_net_worth: foreign_annual_net_worthValue,
                    user_id: current_user_id,
                };
            });
        } else if (type === 'checkbox' && name === 'corporate_net_worth') {
            // Set the value of corporate_net_worth to '1' if the checkbox is checked, '0' otherwise
            const corporate_net_worthValue = checked ? '1' : '0';
            setTerms((prevState) => {
                return {
                    ...prevState,
                    corporate_net_worth: corporate_net_worthValue,
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
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.id) {
            setCurrentUserId(current_user_data.id);
            getAccreditedInvestorTerms(current_user_data.id)
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

        $(document).ready(function () {
            $('#checkbox-group-1, #checkbox-group-2, #checkbox-group-3').hide();
            $('.options').on('change', function () {
                $('#checkbox-group-1, #checkbox-group-2, #checkbox-group-3').hide();
                var selectedOption = $(this).val();
                $('#checkbox-group-' + selectedOption).show();
            });
        });
    }, []);


    const SubmitForm = async () => {
        const updatedTerms = {
            ...terms,
            annual_income: terms.annual_income === '1' ? '1' : '0',
            financial_net_worth: terms.financial_net_worth === '1' ? '1' : '0',
            corporate_net_worth: terms.corporate_net_worth === '1' ? '1' : '0',
            financial_annual_net_worth: terms.financial_annual_net_worth === '1' ? '1' : '0',
            foreign_annual_income: terms.foreign_annual_income === '1' ? '1' : '0',
            foreign_annual_net_worth: terms.foreign_annual_net_worth === '1' ? '1' : '0',
            foreign_net_worth: terms.foreign_net_worth === '1' ? '1' : '0'
        }
        const category = updatedTerms.category;

        const checkAnnualIncome = category === '1';

        if (checkAnnualIncome && updatedTerms.annual_income !== '1') {
            setMissingFields(prevFeilds => [...prevFeilds, "annual_income"])
            // toast.error('First One Option Is Required', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     toastId: "error",
            // });
            return;
        }

        if (checkAnnualIncome && !(updatedTerms.financial_net_worth === '1' || updatedTerms.financial_annual_net_worth === '1')) {
            setMissingFields(prevFields => [...prevFields, "financial_net_worth"])
            // toast.error('Atleast One More Option is Required.', {

            //     position: toast.POSITION.TOP_RIGHT,
            //     toastId: "error",

            // });
            return;
        }

        const checkFinancialNetWorth = category === '2';
        if (checkFinancialNetWorth && updatedTerms.foreign_annual_income !== '1') {
            setMissingFields(prevFields => [...prevFields, "foreign_annual_income"])
          
            return;
        }

        if (checkFinancialNetWorth && !(updatedTerms.foreign_net_worth === '1' || updatedTerms.foreign_annual_net_worth === '1')) {
            setMissingFields(prevFields => [...prevFields, "foreign_net_worth"])
            // toast.error('Atleast One More Option is Required.', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     toastId: "error",

            // });
            return;
        }


        const selectedCategoryRequiresCheckbox = category === '3';
        if (selectedCategoryRequiresCheckbox && !(updatedTerms.corporate_net_worth === '1')) {
            setMissingFields(prevFields => [...prevFields, "corporate_net_worth"])
            // toast.error('Option Is Required', {
            //     position: toast.POSITION.TOP_RIGHT,
            //     toastId: "error",
            // });
            return;
        }


        try {
            const res = await angelAccreditedTermsSave(terms);

            if (res.status == true) {
                toast.success(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
                setTimeout(() => {
                    router.push("/investor/thank-you");
                }, 1000);
            } else {
                toast.error(res.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        } catch (err) {
            toast.error(err as string, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: "error",
            });
        }
    };


    return (
        <>
            <div className="page-title-area item-bg-5">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Complete Account Details</h2>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                </ul>
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
                            <li className="">
                                <div className="step_name">
                                    Step <span>2</span>
                                </div>
                                <div className="step_border">
                                    <div className="step_complete">
                                        <i className="flaticon-checked" aria-hidden="true"></i>
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm" style={{ color: "#82b440" }}>
                                    <span>INVESTOR INFORMATION</span>
                                </div>
                            </li>
                            <li className="active">
                                <div className="step_name">
                                    Step <span>3</span>
                                </div>
                                <div className="step_border">
                                    <div className="step">
                                        <img
                                            className="sidebar-img w-50"
                                            src="/assets/img/investor/download2.png"
                                        />
                                    </div>
                                </div>
                                <div className="caption hidden-xs hidden-sm">
                                    <span>Terms & Conditions</span>
                                </div>
                            </li>
                        </ol>
                        <div className="container">
                            <div className="register-form">
                                <div className="row step_one">
                                    <div className="col-md-12">
                                        <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                                            {" "}
                                            Terms & Conditions{" "}
                                            <i
                                                style={{ cursor: "pointer" }}
                                                className="fa fa-info-circle"
                                                aria-hidden="true"
                                                data-toggle="tooltip"
                                                data-placement="top"
                                                title="Please select your investor type category and apply terms & conditions.That would be helpful to verify your account."
                                            ></i>
                                        </h4>
                                        <div className="container" id="option_select">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    {/* <form  className="needs-validation mb-4"  onSubmit={SubmitForm} > */}
                                                    <select className="options" {...register("category", { validate: (value) => value != "", required: true, onChange: handleChange })}
                                                        name="category" value={terms ? terms.category : ""}>
                                                        <option value="">--SELECT CATEGORY--</option>
                                                        <option value="1">Indian Individuals/HUFs/Family Trusts/Sole Proprietorships</option>
                                                        <option value="2">Foreign Individuals/HUFs/Family Trusts/Sole Proprietorships</option>
                                                        <option value="3">Body Corporates</option>
                                                    </select>
                                                    <div id="checkbox-group-1" className="hidden">
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox1" value="1"
                                                                        {...register("annual_income", { value: true, required: true })}
                                                                        name="annual_income" onChange={handleChange} checked={terms.annual_income === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox1">
                                                                        Have an annual income of at least ₹2 crore in the preceding financial year.
                                                                    </label>
                                                                    {missingFields.includes("annual_income") && (
                                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                            * Annual income option is required.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox2" value="1" {...register("financial_net_worth", { value: true, required: true })}
                                                                        name="financial_net_worth" onChange={handleChange} checked={terms.financial_net_worth === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox2">Have a net worth of at least ₹7.5 crore with more than ₹3.75 crore of financial assets.</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox3" value="1" {...register("financial_annual_net_worth", { value: true, required: true })}
                                                                        name="financial_annual_net_worth" onChange={handleChange} checked={terms.financial_annual_net_worth === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox3">Have an annual income of at least ₹1 crore and a net worth of at least ₹ 5 crore with more
                                                                        than ₹ 2.5 crore of financial assets.</label>
                                                                    {missingFields.includes("financial_net_worth") && (
                                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                            * One more option is required.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="checkbox-group-2" className="hidden">
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox4" value="1" {...register("foreign_annual_income", { value: true, required: true })}
                                                                        name="foreign_annual_income" onChange={handleChange} checked={terms.foreign_annual_income === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox4">Have an annual income of at least $300,000.</label>
                                                                    {missingFields.includes("foreign_annual_income") && (
                                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                            * Annual income option is required.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox5" value="1" {...register("foreign_net_worth", { value: true, required: true })}
                                                                        name="foreign_net_worth" onChange={handleChange} checked={terms.foreign_net_worth === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox5">Have a net worth of at least $1 million with more than $500,000 of financial assets.</label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox6" value="1" {...register("foreign_annual_net_worth", { value: true, required: true })}
                                                                        name="foreign_annual_net_worth" onChange={handleChange} checked={terms.foreign_annual_net_worth === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox6">Have an annual income of at least $150,000 and a net worth of at least $750,000 with more
                                                                        than $350,000 of financial assets.</label>
                                                                    {missingFields.includes("foreign_net_worth") && (
                                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                            *One more options is required.
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="checkbox-group-3" className="hidden">
                                                        <div className="same-card">
                                                            <div className="row">
                                                                <div className="col-auto">
                                                                    <input type="checkbox" id="checkbox7" value="1" {...register("corporate_net_worth", { value: true, required: true })}
                                                                        name="corporate_net_worth" onChange={handleChange} checked={terms.corporate_net_worth === '1'} />
                                                                </div>
                                                                <div className="col">
                                                                    <label htmlFor="checkbox7">Net worth greater than or equal to INR 50 crore or, $7.5 million.</label>
                                                                    {missingFields.includes("corporate_net_worth") && (
                                                                        <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                                                            * Net worth option is required.
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
                                                                href={`/investor-steps/investor-type`}
                                                                className="btnclasssmae"
                                                                id="back"
                                                            >
                                                                Go back
                                                            </a>
                                                        </div>

                                                        <div
                                                            className="col-md-6"
                                                            style={{ textAlign: "right" }}
                                                        >
                                                            <button type="submit" className="btnclasssmae" onClick={SubmitForm}>
                                                                Submit
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* </form> */}
                                                </div>
                                            </div>
                                        </div>


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
