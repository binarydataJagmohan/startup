import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { removeToken, removeStorageData, getCurrentUserData, } from "../../lib/session";
import { fundInformationSave, getSingleBusinessInformation } from '../../lib/adminapi';

import { getSingleFundRaiseData } from "../../lib/adminapi"
import { sendNotification, getBusinessInformation } from "../../lib/frontendapi"
import { FundRaisedSendNotification } from '../../lib/investorapi'
import Link from 'next/link';

interface UserData {
    id?: string;
}
interface FundRaiseData {
    id: "";
    user_id?: number;
    business_id?: number;
    total_units?: string;
    amount?: string;
    minimum_subscription?: string;
    avg_amt_per_person?: number;
    tenure?: number | string;
    repay_date?: string;
    closed_in?: string;
    resource?: string;
    xirr?: number | string;
    desc: string;
}
const FundRaiseForm = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const [current_user_id, setCurrentUserId] = useState("");
    const [businessInfo, setBusinessInfo] = useState("");
    const [invalidFields, setInvalidFields] = useState<string[]>([]);
    const [fundRaiseData, setFundRaiseData] = useState<any>({
        id: "",
        user_id: current_user_id,
        business_id: businessInfo,
        total_units: "",
        minimum_subscription: "",
        avg_amt_per_person: "",
        tenure: "",
        repay_date: "",
        closed_in: "",
        resource: "",
        xirr: "",
        amount: "",
        desc: "",
    });
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchData = async (id: any) => {
            const data = await getBusinessInformation(id);

            if (data) {
                setBusinessInfo(data.data.id);
            }
        };

        if (router.query.id) {
            fetchData(router.query.id);
        }
    }, [router.query.id]);


    const handleUploadClick = (event: any) => {
        event.preventDefault();
        if (fileInputRef.current !== null) {
            (fileInputRef.current as HTMLInputElement).click();
        }
    };

    const fileInputRef1 = useRef<HTMLInputElement>(null);

    const handleUploadClick1 = (event: any) => {
        event.preventDefault();
        if (fileInputRef1.current !== null) {
            (fileInputRef1.current as HTMLInputElement).click();
        }
    };

    const fileInputRef2 = useRef<HTMLInputElement>(null);

    const handleUploadClick2 = (event: any) => {
        event.preventDefault();
        if (fileInputRef2.current !== null) {
            (fileInputRef2.current as HTMLInputElement).click();
        }
    };

    const [agreement, setAgreement] = useState(null);
    const [agreementError, setAgreementError] = useState('');
    const [invoice, setInvoice] = useState(null);
    const [invoiceError, setInvoiceError] = useState('');
    const [pdc, setPdc] = useState(null);
    const [pdcError, setPdcError] = useState('');
    const [agreementName, setAgreementName] = useState('');
    const [invoiceName, setInvoiceName] = useState('');
    const [pdcName, setPdcName] = useState('');
    // handleInvoiceFileChange for agreement pdf
    const handleAgreementFileChange = (event: any) => {
        const file = event.target.files[0];
        const allowedExtensions = ["pdf"];

        if (file) {
            const fileNameParts = file.name.split(".");
            const fileExtension =
                fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                setInvalidFields((prevFields) =>
                    prevFields.filter((field) => field !== "pdfvalidate")
                );
                setAgreement(file);
                setAgreementName(file.name);
            } else {
                setInvalidFields((prevFields) => [...prevFields, "pdfvalidate"]);
                // File is not a PDF, show error message or handle accordingly
            }
        }
    };

    // handleInvoiceFileChange for invoice pdf
    const handleInvoiceFileChange = (event: any) => {
        const file = event.target.files[0];
        const allowedExtensions = ["pdf"];
        if (file) {
            const fileNameParts = file.name.split(".");
            const fileExtension =
                fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                setInvalidFields((prevFields) =>
                    prevFields.filter((field) => field !== "invoicevalidate")
                );
                setInvoice(file);
                setInvoiceName(file.name);
            } else {
                setInvalidFields((prevFields) => [...prevFields, "invoicevalidate"]);
                // File is not a PDF, show error message or handle accordingly
            }
        }
    };
    // handlePDCFileChange for invoice pdf
    const handlePDCFileChange = (event: any) => {
        // setPdc(event.target.files[0]);
        const file = event.target.files[0];
        const allowedExtensions = ["pdf"];
        if (file) {
            const fileNameParts = file.name.split(".");
            const fileExtension =
                fileNameParts[fileNameParts.length - 1].toLowerCase();

            if (allowedExtensions.includes(fileExtension)) {
                setInvalidFields((prevFields) =>
                    prevFields.filter((field) => field !== "pdcvalidate")
                );
                setPdc(file);
                setPdcName(file.name);
            } else {
                setInvalidFields((prevFields) => [...prevFields, "pdcvalidate"]);
                // File is not a PDF, show error message or handle accordingly
            }
        }
    };
    const handleChange = (event: any) => {
        let { name, value } = event.target;
        if (name === "amount" || name === "total_units") {
            setFundRaiseData({ ...fundRaiseData, [name]: value });
            const amount = name === "amount" ? Number(value) : fundRaiseData.amount;
            const totalUnits = name === "total_units" ? Number(value) : fundRaiseData.total_units;
            // if (typeof amount === "number" && typeof totalUnits === "number") {
            if (amount && totalUnits) {
                const minimum_value = amount / totalUnits;
                setFundRaiseData({
                    ...fundRaiseData,
                    minimum_subscription: Math.floor(minimum_value).toString(),
                });
                // }
            }
        }
        if (name === "tenure") {
            const tenureDays = parseInt(value);
            const today = new Date();
            const repayDate = new Date(
                today.getTime() + tenureDays * 24 * 60 * 60 * 1000
            )
                .toISOString()
                .substr(0, 10);
            // const closedDate = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            const closedDate = new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000)
                .toISOString()
                .substr(0, 10);
            setFundRaiseData({
                ...fundRaiseData,
                [name]: value,
                repay_date: repayDate,
                closed_in: closedDate,
            });
        }
        // else {
        setFundRaiseData((prevState: FundRaiseData) => {
            return {
                ...prevState,
                [name]: value,
                user_id: current_user_id,
                business_id: businessInfo,
            };
        });
        // }
    };
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id)
                : setCurrentUserId("");

            getBusinessInformation(current_user_data.id)
                .then((res) => {
                    if (res.status == true) {
                        setBusinessInfo(res.data.id);

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

        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        getSingleFundRaiseData(id)
            .then((res) => {
                if (res.status == true) {
                    setFundRaiseData(res.data);

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
    }, []);

    const SubmitForm = async () => {
        try {
            console.log(fundRaiseData);
            if (invalidFields.length > 0) {
                // Show error message or handle accordingly   

            } else {

                const data = {
                    notify_from_user: current_user_id,
                    notify_to_user: "1",
                    notify_msg:
                        "The startup has successfully raised funds! Please review the details and take necessary actions.",
                    notification_type: "Fund Raised",
                    each_read: "unread",
                    status: "active",
                };
                const formData = new FormData();
                if (agreement === null) {
                    setAgreementError('* Please select your legal agreement.');

                } else {
                    formData.append("agreement", agreement);
                }
                if (invoice === null) {
                    setInvoiceError('* Please select your legal invoice.');
                    // return;
                } else {
                    formData.append("invoice", invoice);
                }
                if (pdc === null) {
                    setPdcError('* Please select your pdc.');
                    // return;
                } else {
                    const urlParams = new URLSearchParams(window.location.search);
                    const id = urlParams.get("id");
                    if (id) {
                        formData.append("user_id", id);
                    }
                    formData.append("business_id", fundRaiseData.business_id);
                    formData.append("total_units", fundRaiseData.total_units);
                    formData.append(
                        "minimum_subscription",
                        fundRaiseData.minimum_subscription
                    );
                    formData.append("avg_amt_per_person", fundRaiseData.minimum_subscription);
                    formData.append("tenure", fundRaiseData.tenure);
                    formData.append("repay_date", fundRaiseData.repay_date);
                    formData.append("closed_in", fundRaiseData.closed_in);
                    formData.append("resource", fundRaiseData.resource);
                    formData.append("type", fundRaiseData.type);

                    formData.append("xirr", fundRaiseData.xirr);
                    formData.append("amount", fundRaiseData.amount);
                    formData.append("desc", fundRaiseData.desc);
                    const res = await fundInformationSave(formData);

                    if (res.status === true) {
                        sendNotification(data)
                            .then((notificationRes) => {
                                console.log("success");
                            })
                            .catch((error) => {
                                console.log("error occured");
                            });


                        FundRaisedSendNotification(data)
                            .then((notificationRes) => {
                                console.log("success");
                            })
                            .catch((error) => {
                                console.log("error occured");
                            });

                        toast.success(res.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                        setTimeout(() => {
                            router.push("/admin/all-startup-companies");
                        }, 1000);

                    } else {
                        toast.error(res.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                }
            }
        } catch (err: any) {
            toast.error(err.response.data.message, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: "error",
            });
        }
    };
    return (
        <>
            <div className="main-content">
                <div className="page-content">
                    <div className="container-fluid">
                        {/* start page title */}
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-md-8">
                                    <h6 className="page-title">Startup</h6>
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item">
                                            <Link href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"}>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Fund Raise
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                        {/* end page title */}
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-header text-white bg-dark" id="title">
                                        <h3 className="card-title">Add New Fund Raise</h3>
                                    </div>
                                    <div className="card-body">
                                        <form
                                            className="needs-validation mb-4"
                                            onSubmit={handleSubmit(SubmitForm)}
                                        >
                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        Total Amount <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="amount"
                                                        {...register("amount", {
                                                            required: true,
                                                        })}
                                                        name="amount"
                                                        placeholder="Total Amount"
                                                        onInput={(e) => {
                                                            const input = (e.target as HTMLInputElement)
                                                                .value;
                                                            const numericInput = input.replace(
                                                                /[^0-9.]/g,
                                                                ""
                                                            ); // Remove non-numeric characters except dot
                                                            if (numericInput !== input) {
                                                                (e.target as HTMLInputElement).value =
                                                                    numericInput;
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                        value={
                                                            fundRaiseData.amount ? fundRaiseData.amount : ""
                                                        }
                                                    />
                                                    {errors.amount && (
                                                        <p
                                                            className="text-danger mt-1"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill total amount field.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        Total Units <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="total_units"
                                                        {...register("total_units", {
                                                            value: !fundRaiseData.total_units,
                                                            required: true,
                                                        })}
                                                        name="total_units"
                                                        placeholder="Total Units"
                                                        onInput={(e) => {
                                                            const input = (e.target as HTMLInputElement)
                                                                .value;
                                                            const numericInput = input.replace(
                                                                /[^0-9.]/g,
                                                                ""
                                                            ); // Remove non-numeric characters except dot
                                                            if (numericInput !== input) {
                                                                (e.target as HTMLInputElement).value =
                                                                    numericInput;
                                                            }
                                                        }}
                                                        onChange={handleChange}
                                                        value={
                                                            fundRaiseData.total_units
                                                                ? fundRaiseData.total_units
                                                                : ""
                                                        }
                                                    />
                                                    {errors.total_units && (
                                                        <p
                                                            className="text-danger mt-1"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill total units field.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        XIRR(in %)<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="xirr"
                                                        {...register("xirr", {
                                                            value: !fundRaiseData.xirr,
                                                            required: true,
                                                            // pattern: /^[0-9]*$/,
                                                            pattern: /^\d+(\.\d{1,2})?$/,
                                                        })}
                                                        name="xirr"
                                                        onInput={(e) => {
                                                            const input = (e.target as HTMLInputElement)
                                                                .value;
                                                            const numericInput = input.replace(
                                                                /[^0-9.]/g,
                                                                ""
                                                            ); // Remove non-numeric characters except dot
                                                            if (numericInput == input) {
                                                                (e.target as HTMLInputElement).value =
                                                                    numericInput;
                                                            }
                                                        }}
                                                        placeholder="Xirr( calculate in%)"
                                                        inputMode="numeric"
                                                        onChange={handleChange}
                                                        value={fundRaiseData.xirr ? fundRaiseData.xirr : ""}
                                                    />
                                                    {errors.xirr && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill xirr field.
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="col-md-6">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        Amount(Per Unit){" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="minimum_subscription"
                                                        {...register("minimum_subscription", {
                                                            value: !fundRaiseData.minimum_subscription,
                                                        })}
                                                        name="minimum_subscription"
                                                        placeholder="Total Subscription"
                                                        value={
                                                            fundRaiseData.minimum_subscription
                                                                ? fundRaiseData.minimum_subscription
                                                                : ""
                                                        }
                                                        onChange={handleChange}
                                                    />
                                                    {errors.minimum_subscription && (
                                                        <p
                                                            className="text-danger mt-1"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill minimum subscription field.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-sm-6 mt-3">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label mb-4"
                                                    >
                                                        Recourse<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg css-1492t68"
                                                        {...register("resource", {
                                                            value: !fundRaiseData.resource,
                                                            required: true,
                                                            onChange: handleChange,
                                                        })}
                                                        name="resource"
                                                        value={
                                                            fundRaiseData.resource
                                                                ? fundRaiseData.resource
                                                                : ""
                                                        }
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="">--SELECT RESOURCE--</option>
                                                        <option value="Buyer">Buyer</option>
                                                        <option value="Seller">Seller</option>
                                                    </select>
                                                    {errors.resource && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill resource type field.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col-sm-6 mt-3">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label mb-4"
                                                    >
                                                        Tenure <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <select
                                                        className="form-select form-select-lg  css-1492t68"
                                                        {...register("tenure", {
                                                            required: true,
                                                            onChange: handleChange,
                                                            value: !fundRaiseData.tenure,
                                                        })}
                                                        name="tenure"
                                                        value={
                                                            fundRaiseData.tenure ? fundRaiseData.tenure : ""
                                                        }
                                                        aria-label="Default select example"
                                                    >
                                                        <option value="" disabled>
                                                            --SELECT TENURE--
                                                        </option>
                                                        <option value="15">15 Days</option>
                                                        <option value="30">30 Days</option>
                                                        <option value="45">45 Days</option>
                                                        <option value="60">60 Days</option>
                                                        <option value="90">90 Days</option>
                                                        <option value="120">120 Days</option>
                                                        <option value="120">365 Days</option>
                                                    </select>
                                                    {errors.tenure && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill tenure field.
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        Repay On Date{" "}
                                                        <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="repay_date"
                                                        {...register("repay_date", {
                                                            value: fundRaiseData.repay_date || "",
                                                        })}
                                                        name="repay_date"
                                                        value={
                                                            fundRaiseData.repay_date
                                                                ? fundRaiseData.repay_date
                                                                : ""
                                                        }
                                                        readOnly
                                                        onChange={handleChange}
                                                    />
                                                    {errors.repay_date && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill repay date field.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col-md-3">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        {" "}
                                                        Closing Date <span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="closed_in"
                                                        {...register("closed_in", {
                                                            value: fundRaiseData.closed_in || "",
                                                        })}
                                                        name="closed_in"
                                                        value={
                                                            fundRaiseData.closed_in
                                                                ? fundRaiseData.closed_in
                                                                : ""
                                                        }
                                                        readOnly
                                                        onChange={handleChange}
                                                    />
                                                    {errors.closed_in && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please fill closing date field.
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="col-sm-6 mt-3">
                                                <label
                                                    htmlFor="exampleFormControlInput1"
                                                    className="form-label mb-4"
                                                >
                                                    Fund Type<span style={{ color: "red" }}>*</span>
                                                </label>
                                                <select
                                                    className="form-select form-select-lg mb-3 css-1492t68"
                                                    aria-label="Default select example"
                                                    {...register("type", {
                                                        value: !fundRaiseData.type,
                                                        required: true,
                                                        onChange: handleChange,
                                                    })}
                                                    name="type"
                                                    value={
                                                        fundRaiseData.type
                                                            ? fundRaiseData.type
                                                            : ""
                                                    }
                                                    >
                                                    <option value="">SELECT TYPE</option>
                                                    <option value="Dicounting Invoice">Dicounting Invoice</option>
                                                    <option value="CSOP">CSOP</option>
                                                    <option value="CCSP">CCSP</option>
                                                </select>
                                                {errors.type && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please Select Fund Type.
                                                        </p>
                                                    )}
                                            </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-12">
                                                    <label
                                                        htmlFor="exampleFormControlInput1"
                                                        className="form-label"
                                                    >
                                                        Description<span style={{ color: "red" }}>*</span>
                                                    </label>
                                                    <textarea
                                                        rows={4}
                                                        placeholder="Enter details here"
                                                        className="form-control"
                                                        {...register("desc", {
                                                            value: !fundRaiseData.desc,
                                                        })}
                                                        name="desc"
                                                        onChange={handleChange}
                                                        value={fundRaiseData.desc ? fundRaiseData.desc : ""}
                                                    />
                                                </div>
                                            </div>

                                           

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6 mt-5">
                                                    <div
                                                        id="divHabilitSelectors"
                                                        className="input-file-container d-flex"
                                                     >
                                                        <div className="file-upload">
                                                            <div className="file-select">
                                                                <div
                                                                    className="file-select-button"
                                                                    id="fileName"
                                                                >
                                                                    Choose File
                                                                </div>
                                                                <div className="file-select-name" id="noFile">
                                                                    {agreementName ? agreementName : (fundRaiseData.agreement ? fundRaiseData.agreement : "No File Chosen ...")}
                                                                </div>
                                                                <input
                                                                    ref={fileInputRef}
                                                                    type="file"
                                                                    name="chooseFile"
                                                                    accept=".pdf"
                                                                    id="chooseFile"
                                                                    onChange={handleAgreementFileChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor="fileupload"
                                                            className="input-file-trigger"
                                                            id="labelFU"
                                                            style={{ fontSize: "12px", marginLeft: "12px" }}
                                                            tabIndex={0}
                                                        >
                                                            Drop your Legal Agreement here to{" "}
                                                            <a href="#" onClick={handleUploadClick}>
                                                                Upload
                                                            </a>{" "}
                                                            <br />
                                                            <p style={{ fontSize: "13px" }}>
                                                                You can upload a pdf file only (max size 20 MB)
                                                                <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                        </label>
                                                    </div>
                                                    {invalidFields.includes("pdfvalidate") && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please choose a PDF file..
                                                        </p>
                                                    )}
                                                    {agreementError && <p className="text-danger">{agreementError}</p>}
                                                </div>
                                                <div className="col-md-6  mt-5">
                                                    <div
                                                        id="divHabilitSelectors"
                                                        className="input-file-container d-flex"
                                                    >
                                                        <div className="file-upload">
                                                            <div className="file-select">
                                                                <div
                                                                    className="file-select-button"
                                                                    id="fileName"
                                                                >
                                                                    Choose File
                                                                </div>
                                                                <div className="file-select-name" id="noFile">
                                                                    {invoiceName ? invoiceName : (fundRaiseData.invoice ? fundRaiseData.invoice : "No File Chosen ...")}
                                                                </div>
                                                                <input
                                                                    ref={fileInputRef1}
                                                                    type="file"
                                                                    name="chooseFile"
                                                                    accept=".pdf"
                                                                    id="chooseFile"
                                                                    onChange={handleInvoiceFileChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor="fileupload"
                                                            className="input-file-trigger"
                                                            id="labelFU"
                                                            style={{ fontSize: "12px", marginLeft: "12px" }}
                                                            tabIndex={0}
                                                        >
                                                            Drop your Legal Invoice here to{" "}
                                                            <a href="#" onClick={handleUploadClick1}>
                                                                Upload
                                                            </a>{" "}
                                                            <br />
                                                            <p style={{ fontSize: "13px" }}>
                                                                You can upload a pdf file only (max size 20 MB)
                                                                <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                        </label>
                                                    </div>
                                                    {invalidFields.includes("invoicevalidate") && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please choose a PDF file..
                                                        </p>
                                                    )}
                                                    {invoiceError && <p className="text-danger">{invoiceError}</p>}
                                                </div>
                                            </div>

                                            <div className="row g-3 mt-1">
                                                <div className="col-md-6 mt-3">
                                                    <div
                                                        id="divHabilitSelectors"
                                                        className="input-file-container d-flex"
                                                    >
                                                        <div className="file-upload">
                                                            <div className="file-select">
                                                                <div
                                                                    className="file-select-button"
                                                                    id="fileName"
                                                                >
                                                                    Choose File
                                                                </div>
                                                                <div className="file-select-name" id="noFile">
                                                                    {pdcName ? pdcName : (fundRaiseData.pdc ? fundRaiseData.pdc : "No File Chosen ...")}
                                                                </div>
                                                                <input
                                                                    ref={fileInputRef2}
                                                                    type="file"
                                                                    name="chooseFile"
                                                                    accept=".pdf"
                                                                    id="chooseFile"
                                                                    onChange={handlePDCFileChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <label
                                                            htmlFor="fileupload"
                                                            className="input-file-trigger"
                                                            id="labelFU"
                                                            style={{ fontSize: "12px", marginLeft: "12px" }}
                                                            tabIndex={0}
                                                        >
                                                            Drop your PDC here to{" "}
                                                            <a href="#" onClick={handleUploadClick2}>
                                                                Upload
                                                            </a>{" "}
                                                            <br />
                                                            <p style={{ fontSize: "13px" }}>
                                                                You can upload a pdf file only (max size 20 MB)
                                                                <span style={{ color: "red" }}>*</span>
                                                            </p>
                                                        </label>
                                                    </div>
                                                    {invalidFields.includes("pdcvalidate") && (
                                                        <p
                                                            className="text-danger"
                                                            style={{ textAlign: "left", fontSize: "12px" }}
                                                        >
                                                            *Please choose a PDF file..
                                                        </p>
                                                    )}
                                                    {pdcError && <p className="text-danger">{pdcError}</p>}
                                                </div>
                                            </div>

                                            <div className="row mt-3">
                                                <div
                                                    className="col-md-6"
                                                    style={{ textAlign: "right" }}
                                                >
                                                    <button type="submit" className="btnclasssmae">
                                                        SUBMIT
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>{" "}
                    </div>{" "}
                    {/* container-fluid */}
                </div>
                <ToastContainer autoClose={2000} />
            </div>
        </>
    );
};

export default FundRaiseForm;
