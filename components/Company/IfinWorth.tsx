import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getCurrentUserData } from '@/lib/session';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { InsertIfinWorthDetails } from "@/lib/investorapi";
interface UserData {
    id?: string;
}
const IfinWorth = () => {

    const [current_user_id, setCurrentUserId] = useState("");

    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id)
                : setCurrentUserId("");
        }
    });

    const [user, setUser] = useState({
        id: current_user_id,
        round_of_ifinworth: "",
        ifinworth_currency: "",
        ifinworth_amount: "",
        pre_committed_ifinworth_currency: "",
        pre_committed_ifinworth_amount: "",
        pre_committed_investor: "",
        ifinworth_kind_of_investor: "",
        other_funding_detail: "",
    });

    const submitIfinWorthDetails = async (e: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("startup_id", user.id);
            formData.append("round_of_ifinworth", user.round_of_ifinworth);
            formData.append("ifinworth_currency", user.ifinworth_currency);
            formData.append("ifinworth_amount", user.ifinworth_amount);
            formData.append("pre_committed_ifinworth_currency", user.pre_committed_ifinworth_currency);
            formData.append("pre_committed_ifinworth_amount", user.pre_committed_ifinworth_amount);
            formData.append("pre_committed_investor", user.pre_committed_investor);
            formData.append("ifinworth_kind_of_investor", user.ifinworth_kind_of_investor);
            formData.append("other_funding_detail", user.other_funding_detail);
            // const res = await InsertIfinWorthDetails(formData);    
            // if (res.status === true) {
            //     toast.success(res.message, {
            //         position: toast.POSITION.TOP_RIGHT,
            //         toastId: "success",
            //     });
            //     setTimeout(() => {
            //         window.location.reload();
            //     }, 1000)
            // } else {
            //     toast.error(res.msg, {
            //         position: toast.POSITION.TOP_RIGHT,
            //         toastId: "error",
            //     });
            // }                   
        }
        catch (err: any) {

        }
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
                                    <button className="create-deal">CREATE A DEAL FOR FREE</button>
                                </div>
                            </div>
                        </div>

                        <div className="form-part mt-5">
                            <div className="col-sm-12">
                                <p className="label-text">Which round is "IFinWorth" looking to raise?*</p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <select className="fild-des" name="round_of_ifinworth">
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
                                        <select className="fild-des" name="ifinworth_currency">
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" name="ifinworth_amount" className="form-control fild-des" placeholder="Enter Amount" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text mt-4">How much funding is pre-committed to"IFinWorth" <span>Optional <i className="fa-solid fa-circle-exclamation"></i></span></p>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <select className="fild-des" name="pre_committed_ifinworth_currency">
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                            <option>USD - US Dollar</option>
                                        </select>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" name="pre_committed_ifinworth_amount" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text">Which investor has pre-committed the funding amount? <span>(You can add multiple investors here) Optional ✪</span></p>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-icon">
                                            <input type="text" placeholder="Search & Add Investors" className="fild-des sp-left" name="pre_committed_investor" />
                                            <div className="left-icon-eye"><i className="fa-solid fa-magnifying-glass"></i></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text">Is "IFinWorth" looking for any specific kind of investors? <span>(You can select multiple) Optional <i className="fa-solid fa-circle-exclamation"></i></span></p>
                                <ul className="checkbox-lead">
                                    <li>
                                        <label><input type="checkbox" className="checkbox-label" name="ifinworth_kind_of_investor" /> Lead Investors</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" className="checkbox-label" /> Co-investors</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" className="checkbox-label" /> Strategic Investors</label>
                                    </li>
                                    <li>
                                        <label><input type="checkbox" className="checkbox-label" /> Angel</label>
                                    </li>
                                </ul>
                            </div>


                            <div className="col-sm-12">
                                <p className="label-text">Any other funding round details you want to enter? <a href="#" className="form-link-a  c-blue">Optional what information can you add here</a></p>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <textarea className="fild-des h-120" name="other_funding_detail" placeholder="You can add more information here, which will help enhance your deal quality and make it more informative."></textarea>
                                    </div>
                                </div>
                            </div>
                            <section className="step-formm pt-5 pb-5">
                                <div className="container">
                                    <div className="form-part">
                                        <div className="upload-file">
                                            <input type="file" className="upload-fild" />
                                            <p className="c-blue"><i className="fa-solid fa-upload"></i> Upload Documents <span className="span-text">(Optional)</span></p>
                                        </div>

                                        <div className="alt-message">
                                            <p><i className="fa-solid fa-circle-exclamation"></i> Don't have the Documents handy? Do not worry, you can upload them later to your deal</p>
                                        </div>

                                        <p className="label-text">Upload any reference document of "IFinWorth"</p>
                                        <p className="note"><i>Note: These documents will be visible to the user.</i></p>

                                        <ul className="upload-list">
                                            <li><p>Pitchdeck </p> <a href="#">Add Link/File</a></li>
                                            <li><p>One Pager </p> <a href="#">Add Link/File</a></li>
                                            <li><p>Previous Financials </p> <a href="#">Add Link/File</a></li>
                                            <li><p>Latest Cap Table </p> <a href="#">Add Link/File</a></li>
                                            <li><p>Other Documents </p> <a href="#">Add Link/File</a></li>
                                        </ul>

                                    </div>
                                </div>
                            </section>
                            <div className="text-center">
                                <button className="back-step">Previous </button>&nbsp;
                                <button className="continue">Save As Draft </button>&nbsp;
                                <button className="back-step" type="submit">Next Step</button>&nbsp;
                            </div>

                        </div>
                    </form>
                </div>
            </section>
            <br /><br /><br />
        </>
    );

};
export default IfinWorth;