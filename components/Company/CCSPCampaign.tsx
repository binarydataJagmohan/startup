import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getCurrentUserData } from '@/lib/session';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getStartupIfinworthDetail, insertIfinWorthDetails } from "@/lib/investorapi";
import { useRouter } from "next/router";
import { getAllInvestors } from "@/lib/frontendapi";
interface UserData {
    id?: any;
}
type Investor = {
    id: number;
    name: string;
    email: string;
    investorType: string;
    status: string;
    approval_status: string;
};

const CCSPCampaign = () => {
    const [otherDocumentsName, setOtherDocumentsName] = useState('');
    const [otherDocumentsSizeError, setOtherDocumentsSizeError] = useState('');
    const [otherDocumentsError, setOtherDocumentsError] = useState('');
    const [latestCapTableName, setLatestCapTableName] = useState('');
    const [latestCapTableSizeError, setLatestCapTableSizeError] = useState('');
    const [latestCapTableError, setLatestCapTableError] = useState('');
    const [onePagerName, setOnePagerName] = useState('');
    const [onePagerSizeError, setOnePagerSizeError] = useState('');
    const [onePagerError, setOnePagerError] = useState('');
    const [previousFinancialName, setPreviousFinancialName] = useState('');
    const [previousFinancialSizeError, setPreviousFinancialSizeError] = useState('');
    const [previousFinancialError, setPreviousFinancialError] = useState('');
    const [pitchDeckName, setPitchDeckName] = useState('');
    const [pitchDeckSizeError, setPitchDeckSizeError] = useState('');
    const [pitchDeckError, setPitchDeckError] = useState('');
    const [current_user_id, setCurrentUserId] = useState("");
    const router = useRouter();
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [showInvestorDropdown, setShowInvestorDropdown] = useState(false);
    const [filteredInvestors, setFilteredInvestors] = useState<Investor[]>([]);
    const [selectedInvestors, setSelectedInvestors] = useState<string[]>([]);
    const [preCommitedInvestor, setPreCommitedInvestor] = useState('');

    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            setCurrentUserId(current_user_data.id);
        }

        getStartupIfinworthDetail(current_user_data.id)
            .then((res) => {
                if (res.status == true) {
                    setUser(res.data);
                    setPreCommitedInvestor(res.data.pre_committed_investor);
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
        const fetchData = async () => {
            const data = await getAllInvestors({});
            if (data) {
                setInvestors(data.data);
            }
        };

        fetchData();
    }, []);

    const [user, setUser] = useState({
        startup_id: "",
        round_of_ifinworth: "",
        ifinworth_currency: "",
        ifinworth_amount: "",
        pre_committed_ifinworth_currency: "",
        pre_committed_ifinworth_amount: "",
        pre_committed_investor: "",
        accredited_investors: 'false',
        angel_investors: 'false',
        regular_investors: 'false',
        other_funding_detail: "",
        pitch_deck: "",
        one_pager: "",
        previous_financials: "",
        latest_cap_table: "",
        other_documents: "",
    });

    const handlePitchDecker = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 10 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setUser({ ...user, pitch_deck: file })
                    setPitchDeckName(file.name);
                    setPitchDeckSizeError('');
                    setPitchDeckError('');
                } else {
                    setPitchDeckSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setPitchDeckError('* Please upload a PPT, DOC or PDF file');
                e.target.value = null;
            }
        }
    };
    const handleOnePager = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 10 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setUser({ ...user, one_pager: file })
                    setOnePagerName(file.name);
                    setOnePagerSizeError('');
                    setOnePagerError('');
                } else {
                    setOnePagerSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setOnePagerError('* Please upload a PPT, DOC or PDF file');
                e.target.value = null;
            }
        }
    };
    const handlePreviousFinancial = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 10 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setUser({ ...user, previous_financials: file })
                    setPreviousFinancialName(file.name);
                    setPreviousFinancialSizeError('');
                    setPreviousFinancialError('');
                } else {
                    setPreviousFinancialSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setPreviousFinancialError('* Please upload a PPT, DOC or PDF file');
                e.target.value = null;
            }
        }
    };
    const handleLatestCapTable = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 10 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setUser({ ...user, latest_cap_table: file })
                    setLatestCapTableName(file.name);
                    setLatestCapTableSizeError('');
                    setLatestCapTableError('');
                } else {
                    setLatestCapTableSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setLatestCapTableError('* Please upload a PPT, DOC or PDF file');
                e.target.value = null;
            }
        }
    };
    const handleOtherDocuments = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
            const maxSize = 10 * 1024 * 1024;

            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSize) {
                    setUser({ ...user, other_documents: file })
                    setOtherDocumentsName(file.name);
                    setOtherDocumentsSizeError('');
                    setOtherDocumentsError('');
                } else {
                    setOtherDocumentsSizeError('* Please upload a file that is no larger than 2MB.');
                }
            } else {
                setOtherDocumentsError('* Please upload a PPT, DOC or PDF file');
                e.target.value = null;
            }
        }
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
            if (user.pitch_deck == '') {
                setPitchDeckError('* Please upload a PPT, DOC or PDF file');
                return;
            } else {
                formData.append("pitch_deck", user.pitch_deck);
            }
            if (user.one_pager == '') {
                setOnePagerError('* Please upload a PPT, DOC or PDF file');
                return;
            } else {
                formData.append("one_pager", user.one_pager);
            }
            if (user.previous_financials == '') {
                setPreviousFinancialError('* Please upload a PPT, DOC or PDF file');
                return;
            } else {
                formData.append("previous_financials", user.previous_financials);
            }
            if (user.latest_cap_table == '') {
                setLatestCapTableError('* Please upload a PPT, DOC or PDF file');
                return;
            } else {
                formData.append("latest_cap_table", user.latest_cap_table);
            }
            if (user.other_documents == '') {
                setOtherDocumentsError('* Please upload a PPT, DOC or PDF file');
                return;
            } else {
                formData.append("other_documents", user.other_documents);
            }


            formData.append("startup_id", user.startup_id);
            formData.append("round_of_ifinworth", user.round_of_ifinworth);
            formData.append("ifinworth_currency", user.ifinworth_currency);
            formData.append("ifinworth_amount", user.ifinworth_amount);
            formData.append("pre_committed_ifinworth_currency", user.pre_committed_ifinworth_currency);
            formData.append("pre_committed_ifinworth_amount", user.pre_committed_ifinworth_amount);
            formData.append("pre_committed_investor", user.pre_committed_investor);
            formData.append("accredited_investors", user.accredited_investors.toString());
            formData.append("angel_investors", user.angel_investors.toString());
            formData.append("regular_investors", user.regular_investors.toString());

            formData.append("other_funding_detail", user.other_funding_detail);

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
            const errorFields = ["round_of_ifinworth", "ifinworth_currency", "ifinworth_amount", "pre_committed_ifinworth_currency", "pre_committed_ifinworth_amount", "pre_committed_investor", "accredited_investors", "other_documents"];
            if (err.response.data.errors) {
                errorFields.forEach((field) => {
                    if (err.response.data.errors[field]) {
                        toast.error(err.response.data.errors[field][0], {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "error",
                        });
                    }
                });
            } else {
                toast.error("An error occurred. Please try again.", {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, type, value, checked }: any = e.target;

        setUser((prevUser) => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked.toString() : value,
        }));
    };

    const handleInvestorSelect = (investorName: string) => {
        setUser((prevUser) => ({ ...prevUser, pre_committed_investor: investorName }));
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredList = investors.filter((investor) =>
            investor.name.toLowerCase().includes(searchTerm)
        );
        setFilteredInvestors(filteredList);
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
                                <p className="label-text mt-4">How much amount is "IFinWorth" looking to raise? </p>
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
                                        <input type="number" name="ifinworth_amount" className="form-control fild-des" placeholder="Enter Amount" value={
                                            user.ifinworth_amount
                                                ? user.ifinworth_amount
                                                : ""
                                        } onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text mt-4">How much funding is pre-committed to"IFinWorth" </p>
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
                                        <input type="number" className="form-control" name="pre_committed_ifinworth_amount" placeholder="Enter Amount" value={
                                            user.pre_committed_ifinworth_amount
                                                ? user.pre_committed_ifinworth_amount
                                                : ""
                                        } onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text">
                                    Which investor has pre-committed the funding amount?{" "}
                                    <span>(You can add multiple investors here)</span>
                                </p>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <div className="form-icon">
                                            <input
                                                type="text"
                                                placeholder="Search & Add Investors"
                                                className="fild-des sp-left"
                                                name="pre_committed_investor"
                                                autoComplete="off"
                                                // value={preCommitedInvestor ? preCommitedInvestor : ''}
                                                onChange={handleSearchInputChange}
                                            />
                                            <div className="left-icon-eye">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                        </div>
                                        {/* Display filtered investor list */}
                                        {filteredInvestors && filteredInvestors.length > 0 ? (
                                            <div className="investor-dropdown">
                                                {filteredInvestors.map((investor, index) => (
                                                    <p style={{ cursor: "pointer" }} key={index} onClick={() => handleInvestorSelect(investor.name)}>
                                                        {investor.name}
                                                    </p>
                                                ))}
                                            </div>
                                        ) : (
                                            <p>No matching investors found.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-12">
                                <p className="label-text">Is "IFinWorth" looking for any specific kind of investors? <span>(You can select multiple) </span></p>
                                <ul className="checkbox-lead">
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="accredited_investors"
                                                checked={user.accredited_investors === 'true'}
                                                onChange={handleInputChange}
                                            />
                                            Accredited Investors
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="angel_investors"
                                                checked={user.angel_investors === 'true'}
                                                onChange={handleInputChange}
                                            />
                                            Angel Investors
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input
                                                type="checkbox"
                                                name="regular_investors"
                                                checked={user.regular_investors === 'true'}
                                                onChange={handleInputChange}
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
                                            <p className="c-blue"><i className="fa-solid fa-upload"></i> Upload Documents <span className="span-text"></span></p>
                                        </div>

                                        <div className="alt-message">
                                            <p><i className="fa-solid fa-circle-exclamation"></i> Don't have the Documents handy? Do not worry, you can upload them later to your deal</p>
                                        </div>

                                        <p className="label-text">Upload any reference document of "IFinWorth"</p>
                                        <p className="note"><i>Note: These documents will be visible to the user.</i></p>

                                        <ul className="upload-list">
                                            <li><p>Pitchdeck </p>  <input type="file" className="upload-fild" name="pitch_deck"
                                                accept='.pdf, .docx, .ppt'
                                                onChange={handlePitchDecker} />Upload File
                                                {pitchDeckName ? pitchDeckName : (user.pitch_deck ? user.pitch_deck : "No File Chosen ...")}
                                            </li>
                                            {pitchDeckSizeError ? (
                                                <p className='text-danger'>{pitchDeckSizeError}</p>
                                            ) : (
                                                pitchDeckError && <p className='text-danger'>{pitchDeckError}</p>
                                            )}
                                            <li><p>One Pager </p>  <input type="file" className="upload-fild" name="one_pager"
                                                accept='.pdf, .docx, .ppt'
                                                onChange={handleOnePager} />Upload File{onePagerName ? onePagerName : (user.one_pager ? user.one_pager : "No File Chosen ...")}</li>

                                            {onePagerSizeError ? (
                                                <p className='text-danger'>{onePagerSizeError}</p>
                                            ) : (
                                                onePagerError && <p className='text-danger'>{onePagerError}</p>
                                            )}
                                            <li><p>Previous Financials </p>  <input type="file" className="upload-fild" name="previous_financials"
                                                accept='.pdf, .docx, .ppt'
                                                onChange={handlePreviousFinancial} />Upload File {previousFinancialName ? previousFinancialName : (user.previous_financials ? user.previous_financials : "No File Chosen ...")}</li>

                                            {previousFinancialError ? (
                                                <p className='text-danger'>{previousFinancialError}</p>
                                            ) : (
                                                previousFinancialError && <p className='text-danger'>{previousFinancialError}</p>
                                            )}
                                            <li><p>Latest Cap Table </p>  <input type="file" className="upload-fild" name="latest_cap_table" accept='.pdf, .docx, .ppt'
                                                onChange={handleLatestCapTable} />Upload File {latestCapTableName ? latestCapTableName : (user.latest_cap_table ? user.latest_cap_table : "No File Chosen ...")}</li>

                                            {latestCapTableError ? (
                                                <p className='text-danger'>{latestCapTableError}</p>
                                            ) : (
                                                latestCapTableError && <p className='text-danger'>{latestCapTableError}</p>
                                            )}
                                            <li><p>Other Documents </p>   <input type="file" className="upload-fild" name="other_documents"
                                                accept='.pdf, .docx, .ppt'
                                                onChange={handleOtherDocuments} />Upload File {otherDocumentsName ? otherDocumentsName : (user.other_documents ? user.other_documents : "No File Chosen ...")}</li>

                                            {otherDocumentsError ? (
                                                <p className='text-danger'>{otherDocumentsError}</p>
                                            ) : (
                                                otherDocumentsError && <p className='text-danger'>{otherDocumentsError}</p>
                                            )}
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