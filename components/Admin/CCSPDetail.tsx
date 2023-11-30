import Image from "next/image";
import React, { useState, useEffect } from "react";
import { getCurrentUserData } from '@/lib/session';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { addPreCommitedInvestor, deletePreCommitedinvestor, getPreCommitedInvestor, getStartupIfinworthDetail, insertIfinWorthDetails } from "@/lib/investorapi";
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

const CCSPRequest = () => {
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
    const [selectedInvestors, setSelectedInvestors] = useState<{ id: any; name: any; }[]>([]);

    const { id } = router.query;
    const current_user_data: UserData = getCurrentUserData();
    const [CCSPFundId, setCCSPFundId] = useState('');
    useEffect(() => {

        if (current_user_data?.id != null) {
            setCurrentUserId(current_user_data.id);
        }
        getStartupIfinworthDetail(id)
            .then((res) => {
                if (res.status == true) {
                    setUser(res.data);
                    setCCSPFundId(res.data.ccsp_fund_id)
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
        fetchPreCommitedInvestor();
    }, []);
    const fetchPreCommitedInvestor = async () => {
        try {
            const res = await getPreCommitedInvestor(id);

            if (res.status === true) {
                setSelectedInvestors(res.data);
            }
        } catch (err) {
            console.log(err);
        }
    }

    const [user, setUser] = useState({
        startup_id: "",
        fund_name: "",
        round_of_ifinworth: "",
        ifinworth_currency: "",
        ifinworth_amount: "",
        pre_committed_ifinworth_currency: "",
        pre_committed_ifinworth_amount: "",
        pre_committed_investor: [],
        accredited_investors: 'false',
        angel_investors: 'false',
        regular_investors: 'false',
        other_funding_detail: "",
        pitch_deck: "",
        one_pager: "",
        previous_financials: "",
        latest_cap_table: "",
        other_documents: "",
        approval_status: "",
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

                    setPitchDeckError('');
                } else {
                    setPitchDeckSizeError('* Please upload a file that is no larger than 10MB.');
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

                    setOnePagerError('');
                } else {
                    setOnePagerSizeError('* Please upload a file that is no larger than 10MB.');
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

                    setPreviousFinancialError('');
                } else {
                    setPreviousFinancialSizeError('* Please upload a file that is no larger than 10MB.');
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

                    setLatestCapTableError('');
                } else {
                    setLatestCapTableSizeError('* Please upload a file that is no larger than 10MB.');

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

                    setOtherDocumentsError('');
                } else {
                    setOtherDocumentsSizeError('* Please upload a file that is no larger than 10MB.');
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
            if (CCSPFundId) {
                formData.append("ccsp_fund_id", CCSPFundId);
            }
            formData.append("other_documents", user.other_documents);
            formData.append("latest_cap_table", user.latest_cap_table);
            formData.append("previous_financials", user.previous_financials);
            formData.append("one_pager", user.one_pager);
            formData.append("pitch_deck", user.pitch_deck);
            formData.append("startup_id", user.startup_id);
            formData.append("round_of_ifinworth", user.round_of_ifinworth);
            formData.append("fund_name", user.fund_name);
            formData.append("ifinworth_currency", user.ifinworth_currency);
            formData.append("ifinworth_amount", user.ifinworth_amount);
            formData.append("pre_committed_ifinworth_currency", user.pre_committed_ifinworth_currency);
            formData.append("pre_committed_ifinworth_amount", user.pre_committed_ifinworth_amount);
            if (selectedInvestors == null || selectedInvestors.length === 0) {
                toast.error(' Please add a pre-committed investor', {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "error",
                });
                return;
            } else {
                formData.append("pre_committed_investor", JSON.stringify(selectedInvestors));
            }
            formData.append("accredited_investors", user.accredited_investors.toString());
            formData.append("angel_investors", user.angel_investors.toString());
            formData.append("regular_investors", user.regular_investors.toString());
            formData.append("other_funding_detail", user.other_funding_detail);

            if (formData) {
                const res = await insertIfinWorthDetails(formData);
                if (res.status === true) {
                    const current_user_data: any = getCurrentUserData();
                    const userId = current_user_data && current_user_data.id ? current_user_data.id : null;
                    for (const selectedInvestor of selectedInvestors) {
                        const data = {
                            user_id: userId,
                            investor_id: selectedInvestor,
                            ccsp_fund_id: res.ccsp_fund_id
                        };
                        await addPreCommitedInvestor(data);

                        toast.success(res.message, {
                            position: toast.POSITION.TOP_RIGHT,
                            toastId: "success",
                        });
                    }


                    setTimeout(() => {
                        if (CCSPFundId) {
                            router.push("/admin/all-active-campaign?id=" + CCSPFundId);
                        }
                    }, 2500);
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
            const errorFields = ["round_of_ifinworth", 'fund_name', "ifinworth_currency", "ifinworth_amount", "pre_committed_ifinworth_currency", "pre_committed_ifinworth_amount", "pre_committed_investor", "other_funding_detail", "accredited_investors", "other_documents"];
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

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState<Investor[]>([]);


    const handleInvestorSelect = (selectedInvestorId: any, selectedInvestorName: any) => {
        if (!selectedInvestors.some((investor) => investor.id === selectedInvestorId)) {
            setSelectedInvestors((prevSelected) => [
                ...prevSelected,
                { id: selectedInvestorId, name: selectedInvestorName },
            ]);
            const current_user_data: any = getCurrentUserData();
            const userId = current_user_data && current_user_data.id ? current_user_data.id : null;
            const data = {
                user_id: userId,
                investor_id: selectedInvestorId,
                name: selectedInvestorName,
            };
            // ... rest of your logic
        }
        setSearch('');
        setSearchResults([]);
    };


    const handleDeleteSkill = async (deleteId: any) => {
        try {
            const data = {
                investor_id: deleteId,
                ccsp_fund_id: CCSPFundId,
            };
            const response = await deletePreCommitedinvestor(data);
            if (response.status === 'true') {
                toast.success(response.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    toastId: "success",
                });
                setTimeout(() => {
                    if (id) {
                        router.push("/admin/ccsp-detail?id=" + id);
                    }
                }, 1000);
            }
        } catch (error) {
            setSelectedInvestors((prevSelected) => prevSelected.filter(investor => investor.id !== deleteId));
        }
    };

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);

        const matchingResults = investors.filter(
            (result: Investor) => result.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(matchingResults);
    };


    return (
        <>
            <section className="step-form pt-4 pb-4 ml-auto">
                <div className="container">

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
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="label-text">Which round is "IFinWorth" looking to raise?*</p>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <select className="fild-des" name="round_of_ifinworth"
                                                value={
                                                    id !== null ? (user.round_of_ifinworth ? user.round_of_ifinworth : "") : ""
                                                }
                                                onChange={handleInputChange}>
                                                <option selected>Select round</option>
                                                <option value="Angel">Angel</option>
                                                <option value="Pre-Seed">Pre-Seed</option>
                                                <option value="Seed">Seed</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <p className="label-text">Fund Name*</p>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <input type="text" name="fund_name" className="form-control fild-des" placeholder="Enter fund name"
                                                value={
                                                    id !== null ? (user.fund_name ? user.fund_name : "") : ""
                                                }
                                                onChange={handleInputChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <p className="label-text mt-4">How much amount is "IFinWorth" looking to raise? </p>
                            <div className="row">
                                <div className="col-sm-6">
                                    <select className="fild-des" name="ifinworth_currency"
                                        value={
                                            id !== null ? (user.ifinworth_currency ? user.ifinworth_currency : "") : ""
                                        }
                                        onChange={handleInputChange}>
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
                                    <input type="number" className="form-control" name="pre_committed_ifinworth_amount" placeholder="Enter Amount"
                                        value={
                                            id !== null ? (user.pre_committed_ifinworth_amount ? user.pre_committed_ifinworth_amount : "") : ""
                                        }
                                        onChange={handleInputChange} />
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
                                    <div>
                                        <div>
                                            {/* Display selected investors */}
                                            {selectedInvestors.map((investor: any, index) => (
                                                <span key={index} className="selected-investor set-detail-btn">
                                                    {investor.name} {/* Use investor.name instead of selectedInvestors.name */}
                                                    <button className="btn btn-secondary set-detail-btn" onClick={() => handleDeleteSkill(investor.id)}>
                                                        <sup> X</sup>
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="form-icon">
                                            <input
                                                type="text"
                                                placeholder="Search & Add Investors"
                                                className="fild-des sp-left"
                                                name="selectedInvestors"
                                                autoComplete="off"
                                                // value={search}
                                                onChange={handleSearchInputChange}
                                            />
                                            <div className="left-icon-eye">
                                                <i className="fa-solid fa-magnifying-glass"></i>
                                            </div>
                                        </div>

                                        {/* Display filtered investor list */}
                                        {searchResults.length > 0 && (
                                            <div className="investor-dropdown">
                                                <div className="scrollable-menu">
                                                    {searchResults.map((investor: any, index) => (
                                                        <p
                                                            style={{ cursor: "pointer" }}
                                                            key={index}
                                                            onClick={(e) => handleInvestorSelect(investor.id, investor.name)}
                                                        >
                                                            {investor.name}
                                                        </p>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
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
                            <p className="label-text">Any other funding round details you want to enter? <span className="form-link-a  c-blue">Optional what information can you add here</span></p>
                            <div className="row">
                                <div className="col-sm-12">
                                    <textarea className="fild-des h-120" name="other_funding_detail" placeholder="You can add more information here, which will help enhance your deal quality and make it more informative."
                                        value={
                                            id !== null ? (user.other_funding_detail ? user.other_funding_detail : "") : ""
                                        }
                                        onChange={handleInputChange} />
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

                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Pitchdeck </p>
                                            </div>
                                            <div className="col-md-8 col-sm-12">
                                                <div
                                                    id="divHabilitSelectors"
                                                    className="input-file-container ccsp_fund_file_upload "
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
                                                                {
                                                                    id !== null ? (pitchDeckName ? pitchDeckName : (user.pitch_deck ? user.pitch_deck.substring(0, 20) + '.....' : "No File Chosen ...")) : "No File Chosen ..."
                                                                }

                                                            </div>

                                                            <input type="file" className="upload-fild" name="pitch_deck"
                                                                accept='.pdf, .docx, .ppt'
                                                                onChange={handlePitchDecker} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {pitchDeckSizeError ? (
                                                    <p className='text-danger p-2'>{pitchDeckSizeError}</p>
                                                ) : (
                                                    pitchDeckError && <p className='text-danger p-2'>{pitchDeckError}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>One Pager </p>
                                            </div>
                                            <div className="col-md-8">
                                                <div
                                                    id="divHabilitSelectors"
                                                    className="input-file-container ccsp_fund_file_upload "
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
                                                                {
                                                                    id !== null ? (onePagerName ? onePagerName : (user.one_pager ? user.one_pager.substring(0, 20) + '.....' : "No File Chosen ...")) : "No File Chosen ..."
                                                                }
                                                            </div>

                                                            <input type="file" className="upload-fild" name="one_pager"
                                                                accept='.pdf, .docx, .ppt'
                                                                onChange={handleOnePager} />
                                                        </div>
                                                    </div>
                                                </div>
                                                {onePagerSizeError ? (
                                                    <p className='text-danger p-2'>{onePagerSizeError}</p>
                                                ) : (
                                                    onePagerError && <p className='text-danger p-2'>{onePagerError}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 col-sm-12">
                                                <p>Previous Financials</p>
                                            </div>
                                            <div className="col-md-8 col-sm-12">
                                                <div
                                                    id="divHabilitSelectors"
                                                    className="input-file-container ccsp_fund_file_upload "
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
                                                                {
                                                                    id !== null ? (previousFinancialName ? previousFinancialName : (user.previous_financials ? user.previous_financials.substring(0, 20) + '.....' : "No File Chosen ...")) : "No File Chosen ..."
                                                                }
                                                            </div>

                                                            <input type="file" className="upload-fild" name="previous_financials"
                                                                accept='.pdf, .docx, .ppt'
                                                                onChange={handlePreviousFinancial} />
                                                        </div>
                                                    </div>
                                                </div>{previousFinancialError ? (
                                                    <p className='text-danger p-2'>{previousFinancialError}</p>
                                                ) : (
                                                    previousFinancialError && <p className='text-danger p-2'>{previousFinancialError}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Latest Cap Table</p>
                                            </div>
                                            <div className="col-md-8">
                                                <div
                                                    id="divHabilitSelectors"
                                                    className="input-file-container ccsp_fund_file_upload "
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
                                                                {
                                                                    id !== null ? (latestCapTableName ? latestCapTableName : (user.latest_cap_table ? user.latest_cap_table.substring(0, 20) + '.....' : "No File Chosen ...")) : "No File Chosen ..."
                                                                }
                                                            </div>

                                                            <input type="file" className="upload-fild" name="latest_cap_table" accept='.pdf, .docx, .ppt'
                                                                onChange={handleLatestCapTable} />
                                                        </div>
                                                    </div>
                                                </div> {latestCapTableError ? (
                                                    <p className='text-danger p-2'>{latestCapTableError}</p>
                                                ) : (
                                                    latestCapTableError && <p className='text-danger p-2'>{latestCapTableError}</p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-4">
                                                <p>Other Documents</p>
                                            </div>
                                            <div className="col-md-8">
                                                <div
                                                    id="divHabilitSelectors"
                                                    className="input-file-container ccsp_fund_file_upload"
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
                                                                {
                                                                    id !== null ? (otherDocumentsName ? otherDocumentsName : (user.other_documents ? user.other_documents.substring(0, 20) + '.....' : "No File Chosen ...")) : "No File Chosen ..."
                                                                }
                                                            </div>

                                                            <input type="file" className="upload-fild" name="other_documents"
                                                                accept='.pdf, .docx, .ppt'
                                                                onChange={handleOtherDocuments} />
                                                        </div>
                                                    </div>
                                                </div>{otherDocumentsError ? (
                                                    <p className='text-danger p-2'>{otherDocumentsError}</p>
                                                ) : (
                                                    otherDocumentsError && <p className='text-danger p-2'>{otherDocumentsError}</p>
                                                )}
                                            </div>
                                        </div>

                                    </ul>

                                </div>
                            </div>
                        </section>
                        <div className="text-center">
                            <button className="continue" onClick={submitIfinWorthDetails}>Update</button>&nbsp;
                        </div>

                    </div>

                </div>

                <ToastContainer autoClose={2000} />
            </section>
            <br /><br /><br />
        </>
    );

};
export default CCSPRequest;