import { getStartupIfinworthDetail } from "@/lib/investorapi";
import { getCurrentUserData } from "@/lib/session";
import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getBusinessInformation, getSingleUserData } from "@/lib/frontendapi";
import Image from "next/image";
import Link from "next/link";
interface UserData {
    id?: any;
}
const CCSPCampaign = () => {

    const [ifinworth, setIfinworth] = useState({
        startup_id: "",
        round_of_ifinworth: "",
        ifinworth_currency: "",
        ifinworth_amount: "",
        pre_committed_ifinworth_currency: "",
        pre_committed_ifinworth_amount: "",
        pre_committed_investor: "",
        ifinworth_kind_of_investor: [],
        other_funding_detail: "",
        pitch_deck: "",
        one_pager: "",
        previous_financials: "",
        latest_cap_table: "",
        other_documents: "",
        updated_at: "",
    });

    const [businessDetails, setBusinessDetails] = useState({
        business_name: "",
        reg_businessname: "",
        website_url: "",
        sector: "",
        stage: "",
        startup_date: "",
        tagline: "",
        logo: "",
        type: "",
        description: "",
        cofounder: "0",
        kyc_purposes: "0",
    });


    const [user, setUser] = useState({
        name: "",
        country: "",
    });
    const [current_user_id, setCurrentUserId] = useState("");
    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            setCurrentUserId(current_user_data.id);
        }

        getStartupIfinworthDetail(current_user_data.id)
            .then((res) => {
                if (res.status == true) {
                    setIfinworth(res.data);

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
        getSingleUserData(current_user_data.id)
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
        getBusinessInformation(current_user_data.id)
            .then((res) => {
                if (res.status === true) {
                    setBusinessDetails(res.data);

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
    const shortDescription = (description: any, words: any) => {
        const wordArray = description.split(' ');
        const truncatedDescription = wordArray.slice(0, words).join(' ');
        return truncatedDescription;
    };
    return (
        <>
            <section className="step-form pt-5 pb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="form-part">
                                <div className="upload-file">
                                    <input type="file" className="upload-fild" />
                                    <p className="c-blue"><i className="fa-solid fa-upload"></i> Preview  Publish </p>
                                </div>

                                <p className="label-text">Once published, this is how your listing will look like.</p>
                                <div className="fund">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <Image className="logo-portfolio" src={process.env.NEXT_PUBLIC_IMAGE_URL + "images/profile/" + (businessDetails.logo || 'default.png')} alt="portfolio" width={55} height={53} />
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="f-20 c-blue mb-2"><b>{user.name}</b></p>
                                            <p className="f-16 mb-2">7zesomw Ifihnworth Advisors</p>
                                            <p className="f-16 mb-2"> {user.country} {businessDetails.startup_date.split('-')[0]} Unfunded </p>
                                            <p className="f-16 mb-2"><i className="fa-solid fa-rss"></i> Healthcare Booking Platforms</p>

                                        </div>
                                    </div>
                                    <hr className="opacity-25" />

                                    <div className="row">
                                        <div className="col-4">
                                            <p>Fund Raising Stage:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>Open For Conversation</p>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-4">
                                            <p>Looking to raise:</p>
                                        </div>
                                        <div className="col-8">
                                            <p>{ifinworth.round_of_ifinworth}</p>
                                        </div>
                                    </div>

                                    <div className="deal-text">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <p className="post-text">Posted as Per the information provided by {user.name}</p>
                                            </div>
                                            <div className="col-sm-6 text-end">
                                                <p className="post-text">Deal updated: {new Date(ifinworth.updated_at).toLocaleDateString()} - {new Date(ifinworth.updated_at).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12">
                            <div className="form-part">
                                <div className="your-selection">
                                    <h5 className="up-file"> Your Selection</h5>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6"> <p className="label-text mt-0">Company Details</p></div>
                                    <div className="col-6 text-end"><Link href="/company/profile" className="pen"><i className="fa-solid fa-pencil"></i> Edit</Link></div>
                                </div>


                                <div className="row mb-1">
                                    <div className="col-6">Company</div>
                                    <div className="col-6">{user.name}</div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6">Description</div>
                                    <div className="col-6">{shortDescription(businessDetails.description, 3)}...</div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6">Founded year</div>
                                    <div className="col-6">{businessDetails.startup_date.split('-')[0]}</div>
                                </div>

                                <div className="row mb-1">
                                    <div className="col-6">Location</div>
                                    <div className="col-6">{user.country}</div>
                                </div>


                                <div className="row mb-1">
                                    <div className="col-6">Sector</div>
                                    <div className="col-6">{businessDetails.sector}</div>
                                </div>

                                <div className="row">
                                    <div className="col-6">Company Stage</div>
                                    <div className="col-6">{businessDetails.stage}</div>
                                </div>



                                <div className="row mt-4">
                                    <div className="col-6"> <p className="label-text mt-0">Deal Details</p></div>
                                    <div className="col-6 text-end"><Link href="/company/ccsp-campaign" className="pen"><i className="fa-solid fa-pencil"></i> Edit</Link></div>
                                </div>


                                <div className="row mb-1">
                                    <div className="col-6">Tyepe of Round</div>
                                    <div className="col-6">{ifinworth.round_of_ifinworth}</div>
                                </div>

                                {/* <div className="row mb-1">
                                    <div className="col-6">Current stage of Funding</div>
                                    <div className="col-6">Not yet started but open for Conversation  Open for conversation</div>
                                </div> */}

                                <div className="row mb-1">
                                    <div className="col-6">Looking to raise (Amount)</div>
                                    <div className="col-6">{ifinworth.ifinworth_amount}</div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-5">
                        <button className="back-step">Previous </button>&nbsp;
                        <button className="continue">Save As Draft </button>&nbsp;
                        <button className="back-step">Publish</button>&nbsp;
                    </div>

                </div>
            </section>
        </>
    );
}

export default CCSPCampaign;