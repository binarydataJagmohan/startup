import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getCurrentUserData } from '@/lib/session';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getStartupIfinworthDetail, insertIfinWorthDetails } from "@/lib/investorapi";
import { useRouter } from "next/router";
interface UserData {
    id?: any;
}
const CCSPCampaign = () => {

    const [current_user_id, setCurrentUserId] = useState("");
    const router = useRouter();
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            setCurrentUserId(current_user_data.id);
        }

        getStartupIfinworthDetail(current_user_data.id)
            .then((res) => {
                if (res.status == true) {
                    setUser(res.data);

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

    const [user, setUser] = useState({
        startup_id: "",
        round_of_ifinworth: "",
        ifinworth_currency: "",
        ifinworth_amount: "",
        pre_committed_ifinworth_currency: "",
        pre_committed_ifinworth_amount: "",
        pre_committed_investor: "",
        accredited_investors: false as any,
        angel_investors: false as any,
        regular_investors: false as any,
        other_funding_detail: "",
        pitch_deck: "",
        one_pager: "",
        previous_financials: "",
        latest_cap_table: "",
        other_documents: "",
    });

    const handlePitchDecker = (e: any) => {
        const file = e.target.files[0];
        setUser({ ...user, pitch_deck: file })
    };
    const handleOnePager = (e: any) => {
        const file = e.target.files[0];
        setUser({ ...user, one_pager: file })
    };
    const handlePreviousFinancial = (e: any) => {
        const file = e.target.files[0];
        setUser({ ...user, previous_financials: file })
    };
    const handleLatestCapTable = (e: any) => {
        const file = e.target.files[0];
        setUser({ ...user, latest_cap_table: file })
    };
    const handleOtherDocuments = (e: any) => {
        const file = e.target.files[0];
        setUser({ ...user, other_documents: file })
    };
    useEffect(() => {
        setUser((prevUser) => ({
            ...prevUser,
            startup_id: current_user_id,
        }));
    }, [current_user_id]);

    const submitIfinWorthDetails = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("startup_id", user.startup_id);
            formData.append("round_of_ifinworth", user.round_of_ifinworth);
            formData.append("ifinworth_currency", user.ifinworth_currency);
            formData.append("ifinworth_amount", user.ifinworth_amount);
            formData.append("pre_committed_ifinworth_currency", user.pre_committed_ifinworth_currency);
            formData.append("pre_committed_ifinworth_amount", user.pre_committed_ifinworth_amount);
            formData.append("pre_committed_investor", user.pre_committed_investor);
            formData.append("accredited_investors", user.accredited_investors ? "true" : "false");
            formData.append("angel_investors", user.angel_investors ? "true" : "false");
            formData.append("regular_investors", user.regular_investors ? "true" : "false");
            formData.append("other_funding_detail", user.other_funding_detail);
            formData.append("pitch_deck", user.pitch_deck);
            formData.append("one_pager", user.one_pager);
            formData.append("previous_financials", user.previous_financials);
            formData.append("latest_cap_table", user.latest_cap_table);
            formData.append("other_documents", user.other_documents);
            if (formData) {
                const res = await insertIfinWorthDetails(formData);
                if (res.status === true) {
                    toast.success(res.message, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "success",
                    });
                    setTimeout(() => {
                        router.push("/company/ccsp-preview");
                    });
                } else {
                    toast.error(res.msg, {
                        position: toast.POSITION.TOP_RIGHT,
                        toastId: "error",
                    });
                }
            } else {
                console.log('form data null');

            }
        }
        catch (err: any) {
            console.error(err);
        }
    };

    const handleInputChange = (e: any) => {
        const { name, type, value, checked } = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };


    return (
        <>
            <section className="step-form pt-4 pb-4 ml-auto">
                <div className="container">
                    <form onSubmit={submitIfinWorthDetails}>
                        <div className="step-portfolio">
                            <div className="row">
                                <div className="col-sm-2">
                                    <Image src="/assets/images/step1.jpg" alt="" width={190} height={53} />
                                </div>
                                <div className="col-sm-7">
                                    <h3>Looking to raise funds for your Company or Portfolio?</h3>
                                    <h4>Tracxn's Live Deals can make it easy for you!</h4>
                                    <p className="f-20 c-blue">Know more about Live Deals</p>
                                </div>
                                <div className="col-sm-3">
                                    <button className="create-deal" type="button">CREATE A DEAL FOR FREE</button>
                                </div>
                            </div>
                        </div>

                        <div className="form-part mt-5">
                            <div className="col-sm-12">
                                <p className="label-text">Which round is "IFinWorth" looking to raise?*</p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <select className="fild-des" name="round_of_ifinworth" value={
                                            user.round_of_ifinworth
                                                ? user.round_of_ifinworth
                                                : ""
                                        } onChange={handleInputChange}>
                                            <option selected>Select round</option>
                                            <option value="Angel">Angel</option>
                                            <option value="Pre-Seed">Pre-Seed</option>
                                            <option value="Seed">Seed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text mt-4">How much amount is "IFinWorth" looking to raise? <span>Optional <i className="fa-solid fa-circle-exclamation"></i></span></p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <select className="fild-des" name="ifinworth_currency" value={
                                            user.ifinworth_currency
                                                ? user.ifinworth_currency
                                                : ""
                                        } onChange={handleInputChange}>
                                            <option selected>Select currency</option>
                                            <option value="USD - US Dollar">USD - US Dollar</option>
                                            <option value="AUD - Australian Dollar">AUD - Australian Dollar</option>
                                            <option value="AED - United Arab Emirates Dirham">AED - United Arab Emirates Dirham</option>
                                            <option value="CNY - Chinese Yuan Renminbi">CNY - Chinese Yuan Renminbi</option>
                                            <option value="ININR - Indian RupeeR">INR - Indian Rupee</option>
                                            <option value="JPY - Japanese Yen">JPY - Japanese Yen</option>
                                            <option value="GBP - British Pound Sterling">GBP - British Pound Sterling</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" name="ifinworth_amount" className="form-control fild-des" placeholder="Enter Amount" value={
                                            user.ifinworth_amount
                                                ? user.ifinworth_amount
                                                : ""
                                        } onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text mt-4">How much funding is pre-committed to"IFinWorth" <span>Optional <i className="fa-solid fa-circle-exclamation"></i></span></p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <select className="fild-des" name="pre_committed_ifinworth_currency" value={
                                            user.pre_committed_ifinworth_currency
                                                ? user.pre_committed_ifinworth_currency
                                                : ""
                                        } onChange={handleInputChange}>
                                            <option selected>Select currency</option>
                                            <option value="USD - US Dollar">USD - US Dollar</option>
                                            <option value="AUD - Australian Dollar">AUD - Australian Dollar</option>
                                            <option value="AED - United Arab Emirates Dirham">AED - United Arab Emirates Dirham</option>
                                            <option value="CNY - Chinese Yuan Renminbi">CNY - Chinese Yuan Renminbi</option>
                                            <option value="ININR - Indian RupeeR">INR - Indian Rupee</option>
                                            <option value="JPY - Japanese Yen">JPY - Japanese Yen</option>
                                            <option value="GBP - British Pound Sterling">GBP - British Pound Sterling</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" name="pre_committed_ifinworth_amount" placeholder="Enter Amount" value={
                                            user.pre_committed_ifinworth_amount
                                                ? user.pre_committed_ifinworth_amount
                                                : ""
                                        } onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text">Which investor has pre-committed the funding amount? <span>(You can add multiple investors here) Optional ✪</span></p>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-icon">
                                            <input type="text" placeholder="Search & Add Investors" className="fild-des sp-left" name="pre_committed_investor" value={
                                                user.pre_committed_investor
                                                    ? user.pre_committed_investor
                                                    : ""
                                            } onChange={handleInputChange} />
                                            <div className="left-icon-eye"><i className="fa-solid fa-magnifying-glass"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text">Is "IFinWorth" looking for any specific kind of investors? <span>(You can select multiple) Optional <i className="fa-solid fa-circle-exclamation"></i></span></p>
                                <ul className="checkbox-lead">
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={user.accredited_investors === 'true'}
                                                onChange={(e) => setUser({ ...user, accredited_investors: e.target.checked })}
                                            />
                                            Accredited Investors
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                        <input
                                                type="checkbox"
                                                checked={user.angel_investors === 'true'}
                                                onChange={(e) => setUser({ ...user, angel_investors: e.target.checked })}
                                            />
                                            Angel Investors
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                        <input
                                                type="checkbox"
                                                checked={user.regular_investors === 'true'}
                                                onChange={(e) => setUser({ ...user, regular_investors: e.target.checked })}
                                            />
                                            Regular Investors
                                        </label>
                                    </li>
                                </ul>
                            </div>


                            <div className="col-sm-12">
                                <p className="label-text">Any other funding round details you want to enter? <a href="#" className="form-link-a  c-blue">Optional what information can you add here</a></p>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <textarea className="fild-des h-120" name="other_funding_detail" placeholder="You can add more information here, which will help enhance your deal quality and make it more informative." value={
                                            user.other_funding_detail
                                                ? user.other_funding_detail
                                                : ""
                                        } onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                            <section className="step-formm pt-5 pb-5">
                                <div className="container">
                                    <div className="form-part">
                                        <div className="upload-file">
                                            <p className="c-blue"><i className="fa-solid fa-upload"></i> Upload Documents <span className="span-text">(Optional)</span></p>
                                        </div>

                                        <div className="alt-message">
                                            <p><i className="fa-solid fa-circle-exclamation"></i> Don't have the Documents handy? Do not worry, you can upload them later to your deal</p>
                                        </div>

                                        <p className="label-text">Upload any reference document of "IFinWorth"</p>
                                        <p className="note"><i>Note: These documents will be visible to the user.</i></p>

                                        <ul className="upload-list">
                                            <li><p>Pitchdeck </p>  <input type="file" className="upload-fild" name="pitch_deck" onChange={handlePitchDecker} />Upload File</li>
                                            <li><p>One Pager </p>  <input type="file" className="upload-fild" name="one_pager" onChange={handleOnePager} />Upload File</li>
                                            <li><p>Previous Financials </p>  <input type="file" className="upload-fild" name="previous_financials" onChange={handlePreviousFinancial} />Upload File</li>
                                            <li><p>Latest Cap Table </p>  <input type="file" className="upload-fild" name="latest_cap_table" onChange={handleLatestCapTable} />Upload File</li>
                                            <li><p>Other Documents </p>   <input type="file" className="upload-fild" name="other_documents" onChange={handleOtherDocuments} />Upload File</li>
                                        </ul>

                                    </div>
                                </div>
                            </section>
                            <div className="text-center">
                                <button className="back-step" type="button">Previous </button>&nbsp;
                                <button className="continue" type="button">Save As Draft </button>&nbsp;
                                <button className="back-step" type="submit">Next Step</button>&nbsp;
                            </div>

                        </div>
                    </form>
                </div>
                <ToastContainer autoClose={2000} />
            </section>
            <br /><br /><br />
        </>
    );

};
export default CCSPCampaign;