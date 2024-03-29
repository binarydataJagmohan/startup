import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUserData } from "@/lib/session";
import { AdminAddCampaignDetail, getCCSPCampaignForStartup, getAllCCSPCampaign, getAllCampaignDetaildata, AdminAddFundNameAndImage } from "@/lib/adminapi";
import { getToken } from "@/lib/session";
import Link from "next/link";
import axios from "axios";
import swal from "sweetalert";
import PopupModal from "../../components/commoncomponents/PopupModal";
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from "next/router";

interface UserData {
  id?: any;
  role?: any;
}
const TextEditor = dynamic(() => import("../Admin/TextEditor"), {
  ssr: false,
});

interface Fund {
  id: number;
  fund_id: number;
  tenure: string;
  minimum_subscription: string;
  amount: number;
  status: string;
  avg_amt_per_person: string;
  repay_date: string;
  closed_in: string;
  type: string;
  company_overview: string;
  fund_banner_image: string;
}
const Campagin = () => {
  const tableRef = useRef(null);
  const [funds, setFundsData]: any = useState<Fund[]>([]);
  const [companyOverview, setCompanyOverview] = useState("");
  const [productDescription, setProductDesc] = useState("");
  const [dilutionpercentage, setDilutionPercentage] = useState("");
  const [minCommitment, setMinCommitment] = useState("");
  const [maxCommitment, setMaxCommitment] = useState("");
  const [valuationCap, setValuationCap] = useState("");
  const [amountRaised, setAmountRaised] = useState("");
  const [roundName, setRoundName] = useState("");
  const [historicalFinancials_desc, setHistoricalFinancial] = useState("");
  const [pastfinancingDesc, setPastFinancing] = useState("");
  const [fundname, setFundName] = useState("");
  const [funddesc, setFundDesc] = useState("");
  const [fundimage, setFundImage]: any = useState("");
  const [selectedFundId, setSelectedFundId]: any = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    null
  );

  const dropdownRef = useRef<HTMLDivElement>(null);



  const handleDropdownToggle = async (index: any, fundId: number, e: any) => {
    e.preventDefault()
    const dropdownMenu = document.getElementById(`dropdownMenu-${index}`);
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
    setSelectedFundId(fundId);
    try {
      const response = await getAllCampaignDetaildata(fundId);

      if (response && response.status && response.data && response.data.length > 0) {
        const selectedCampaign = response.data.find((fund: any) => fund.ccsp_fund_id === fundId);
        if (selectedCampaign) {
          setRoundName(selectedCampaign.round_name);
          setDilutionPercentage(selectedCampaign.dilution_percentage);
          setMinCommitment(selectedCampaign.min_commitment);
          setMaxCommitment(selectedCampaign.max_commitment);
          setValuationCap(selectedCampaign.valuation_cap);
          setAmountRaised(selectedCampaign.amount_raised);
          setCompanyOverview(selectedCampaign.company_overview);
          setProductDesc(selectedCampaign.product_description);
          setHistoricalFinancial(selectedCampaign.historical_financials_desc);
          setPastFinancing(selectedCampaign.past_financing_desc);
          setFundName(selectedCampaign.fund_name);
          setFundImage(selectedCampaign.fund_banner_image);
          setFundDesc(selectedCampaign.fund_desc);
        } else {
          setRoundName('');
          setDilutionPercentage('');
          setMinCommitment('');
          setMaxCommitment('');
          setValuationCap('');
          setAmountRaised('');
          setCompanyOverview('');
          setProductDesc('');
          setHistoricalFinancial('');
          setPastFinancing('');
          setFundName('');
          setFundImage('');
          setFundDesc('');
        }
      } else {
        console.error("No data or invalid response received from the API");
      }
    } catch (error) {
      console.error("Error fetching campaign details:", error);
    }
  };
  const router = useRouter();

  useEffect(() => {
    const closeDropdown = (event: MouseEvent) => {
      const dropdownMenus = document.querySelectorAll(".dropdown-content") as NodeListOf<HTMLUListElement>;
      let clickedInsideDropdown = false;

      dropdownMenus.forEach((menu) => {
        if (menu.contains(event.target as Node)) {
          clickedInsideDropdown = true;
        } else {
          menu.classList.remove("show");
        }
      });

      // If clicked outside the dropdown, close all dropdowns
      if (!clickedInsideDropdown) {
        dropdownMenus.forEach((menu) => {
          menu.classList.remove("show");
        });
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);



  const [fundImageName, setFundImageName] = useState('');
  const [fundImageNameError, setFundImageNameError] = useState('');
  const [dataTableInitialized, setDataTableInitialized] = useState(false);
  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data.role !== 'startup') {
      router.back();
    }
    if (current_user_data.id != null) {
      getCCSPCampaignForStartup(current_user_data.id)
        .then((res) => {
          if (res.status == true) {
            setFundsData(res.data);
          } else {
            toast.error(res.message, {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        })
        .catch((err) => {

        });
    }
  }, []);

  useEffect(() => {
    // Initialize the datatable for users
    if (funds.length > 0 && !dataTableInitialized) {
      $(document).ready(() => {
        $("#datatable2").DataTable({
          lengthMenu: [20, 50, 100, 150],
          retrieve: true,
          paging: false,
          columnDefs: [
            //  columns  sortable
            { targets: [0, 1, 2], orderable: true },
            // Disable sorting
            { targets: "_all", orderable: false },
          ],
        });
        setDataTableInitialized(true);
      });
    }
  }, [funds, dataTableInitialized]);



  // Update status of a campaign in the DB
  function deleteFund(id: number) {
    swal({
      title: "Are you sure?",
      text: `Are you sure want to delete this campaign ?`,
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Yes, I am sure!"],
    }).then((willUpdate) => {
      if (willUpdate) {
        axios
          .post(
            `${process.env.NEXT_PUBLIC_API_URL}/delete-campaign/${id}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: "Bearer " + getToken(),
              },
              data: id,
            }
          )
          .then((response) => {
            toast.success(response.data.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "success",
            });
            setTimeout(() => {
              router.push("/company/ccsp-campaign");
            }, 1500);
          })
          .catch((error) => {
            // Handle error response
            toast.error(error.message, {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "error",
            });
          });
      }
    });
  }

  const [startUpLogoError, setStartupLogoError] = useState('');


  const [modalConfirm, setModalConfirm] = useState(false);
  const [modalConfirm1, setModalConfirm1] = useState(false);
  const [modalConfirm2, setModalConfirm2] = useState(false);
  const [modalConfirm3, setModalConfirm3] = useState(false);
  const [modalConfirm4, setModalConfirm4] = useState(false);
  const [modalConfirm5, setModalConfirm5] = useState(false);


  const modalConfirmClose = () => {
    setModalConfirm(false);
  };
  const modalConfirmClose1 = () => {
    setModalConfirm1(false);
  };
  const modalConfirmClose2 = () => {
    setModalConfirm2(false);
  };
  const modalConfirmClose3 = () => {
    setModalConfirm3(false);
  };
  const modalConfirmClose4 = () => {
    setModalConfirm4(false);
  };
  const modalConfirmClose5 = () => {
    setModalConfirm5(false);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      ccsp_fund_id: selectedFundId || "",
      company_overview: companyOverview || "",
      product_description: productDescription || "",
      historical_financials_desc: historicalFinancials_desc || "",
      past_financing_desc: pastfinancingDesc || "",
      dilution_percentage: dilutionpercentage || "",
      min_commitment: minCommitment || "",
      max_commitment: maxCommitment || "",
      valuation_cap: valuationCap || "",
      amount_raised: amountRaised || "",
      round_name: roundName || "",
    };
    try {
      const response = await AdminAddCampaignDetail(data);
      setModalConfirm(false);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error occurred", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  };



  const handleCompanyOverviewChange = (updatedOverview: string) => {
    setCompanyOverview(updatedOverview);
  };
  const handleProductDescChange = (productDesc: string) => {
    setProductDesc(productDesc);
  };
  const handlehistoricalfFinancialChange = (financialDesc: string) => {
    setHistoricalFinancial(financialDesc);
  };
  const handlePastFinanceChange = (pastfinancialDesc: string) => {
    setPastFinancing(pastfinancialDesc);
  };

  useEffect(() => {
    const fetchDataForSelectedFund = async () => {
      try {
        const response = await getAllCCSPCampaign(selectedFundId);

        // Check if response status is true and data exists
        if (response && response.status && response.data && response.data.length > 0) {
          const selectedFund = response.data.find((fund: { id: number | null; }) => fund.id === selectedFundId);

          if (selectedFund) {
            setRoundName(selectedFund.round_name);
            setDilutionPercentage(selectedFund.dilution_percentage);
            setMinCommitment(selectedFund.min_commitment);
            setMaxCommitment(selectedFund.max_commitment);
            setValuationCap(selectedFund.valuation_cap);
            setAmountRaised(selectedFund.amount_raised);
            setCompanyOverview(selectedFund.company_overview);
            setProductDesc(selectedFund.product_description);
            setHistoricalFinancial(selectedFund.historical_financials_desc);
            setPastFinancing(selectedFund.past_financing_desc);
            setFundName(selectedFund.fund_name)
            setFundImage(selectedFund.fund_banner_image)
            setFundDesc(selectedFund.fund_desc)

          } else {
            console.error("Selected fund not found in the response data");
          }
        } else {
          console.error("No data or invalid response received from the API");
        }
      } catch (error) {
        console.error("Error fetching data for selectedFundId:", error);
      }
    };
    ;
    fetchDataForSelectedFund();
  }, [modalConfirm4, selectedFundId]);


  const handleAddFundNameImage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", selectedFundId);
    formData.append("fund_name", fundname);
    formData.append("fund_desc", funddesc);
    formData.append("fund_banner_image", fundimage);

    try {
      const response = await AdminAddFundNameAndImage(formData);
      setModalConfirm5(false);
      toast.success(response.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      toast.error("Error occurred", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
    }
  }

  const handleUpdateLogoChange = (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png'];
      const maxSize = 2 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreviewImage(reader.result);
          };
          reader.readAsDataURL(file);
          setFundImage(file);
          setFundImageName(file.name);
          setFundImageNameError('');
          setStartupLogoError('');
        } else {
          setFundImageNameError('* Image size should be less than 2MB.');
          setFundImage(null);
          setPreviewImage(null);
        }
      } else {
        setStartupLogoError('* Please upload a JPG or PNG file');
        setFundImage(null);
        setPreviewImage(null);
      }
    } else {
      setFundImage(null);
      setPreviewImage(null);
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
                  <h6 className="page-title">All Campaign</h6>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link
                        href={
                          process.env.NEXT_PUBLIC_BASE_URL + "company/dashboard"
                        }
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      All Active Campaign
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
                    <h3 className="card-title">ALL Campaign</h3>
                  </div>
                  <div className="card-body mt-3 set-pading">
                    <div className="">
                      <div className="box-card recent-reviews mb-4">
                        {funds.length > 0 ? (
                          <table
                            className="table-dash"
                            id="datatable2"
                            ref={tableRef}
                          >
                            <thead>
                              <tr>
                                <th>Serial no.</th>
                                <th>CCSP Id</th>
                                <th>Round Name</th>
                                <th>Amount</th>
                                <th>Pre Commited Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {funds && funds.length > 0 ? (
                                funds.map((fund: any, index: any) => (
                                  <tr key={index}>
                                    <td data-label="Serial no.">{index + 1}</td>

                                    <td data-label="CCSP Id">{fund.ccsp_fund_id}</td>

                                    <td data-label="Round Name">
                                      {fund.round_of_ifinworth}
                                    </td>

                                    <td data-label="Amount">
                                      {fund.ifinworth_amount}
                                    </td>

                                    <td data-label="Pre Commited Amount">
                                      {fund.pre_committed_ifinworth_amount}
                                    </td>

                                    <td data-label="Status">
                                      <span style={{ cursor: "default" }} className={fund.approval_status === 'approved' ? 'badge bg-success' : 'badge bg-danger'} > {typeof fund.approval_status === 'string' ? fund.approval_status.toUpperCase() : fund.approval_status}</span>
                                    </td>
                                    <td data-label="Action">
                                      {fund.approval_status === 'pending'
                                        ?
                                        <>
                                          <div className="dropdown set-drop m-1" ref={dropdownRef}>
                                            <span
                                              onClick={(e) =>
                                                handleDropdownToggle(
                                                  index,
                                                  fund.ccsp_fund_id, e
                                                )
                                              }
                                              className="fa-solid fa-ellipsis"
                                              style={{ cursor: 'pointer' }}
                                            ></span>
                                            <ul
                                              id={`dropdownMenu-${index}`}
                                              className="dropdown-content add-class-drop set-height"
                                            >
                                              <li>
                                                <a
                                                  href="#"
                                                  onClick={(e) => {
                                                    setModalConfirm5(true);
                                                  }}
                                                >
                                                  Fund Name
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  href="#"
                                                  onClick={(e) => {
                                                    setModalConfirm(true);
                                                  }}
                                                >
                                                  Company Overview
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  href="#"
                                                  onClick={(e) => {
                                                    setModalConfirm1(true);
                                                  }}
                                                >
                                                  Product Description
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  href="#"
                                                  onClick={(e) => {
                                                    setModalConfirm2(true);
                                                  }}
                                                >
                                                  Historical Financial
                                                </a>
                                              </li>
                                              <li>
                                                <a
                                                  href="#"
                                                  onClick={(e) => {
                                                    setModalConfirm3(true);
                                                  }}
                                                >
                                                  Past Financing Desc
                                                </a>
                                              </li>

                                              <li>
                                                <a
                                                  href="#"
                                                  onClick={(e) => {
                                                    setModalConfirm4(true);
                                                  }}
                                                >
                                                  Add Round Details
                                                </a>
                                              </li>

                                              <li>
                                                <a
                                                  href={
                                                    process.env.NEXT_PUBLIC_BASE_URL +
                                                    `company/add-company/?id=${fund.ccsp_fund_id}`
                                                  }
                                                >
                                                  Add Competitor
                                                </a>
                                              </li>

                                              <li>
                                                <a
                                                  href={
                                                    process.env.NEXT_PUBLIC_BASE_URL +
                                                    `company/add-team/?id=${fund.ccsp_fund_id}`
                                                  }
                                                >
                                                  Add team
                                                </a>
                                              </li>

                                              <li>
                                                <a
                                                  href={
                                                    process.env.NEXT_PUBLIC_BASE_URL +
                                                    `company/add-products/?id=${fund.ccsp_fund_id}`
                                                  }
                                                >
                                                  Add Products
                                                </a>
                                              </li>
                                            </ul>
                                          </div>
                                        </>
                                        :
                                        ''
                                      }
                                      <Link
                                        href={
                                          process.env.NEXT_PUBLIC_BASE_URL +
                                          `company/ccsp-request/?id=${fund.ccsp_fund_id}`
                                        }
                                        className="m-1"
                                      >
                                        <span className="fa fa-eye"></span>
                                      </Link>

                                      <Link
                                        href="javascript:void(0);"
                                        onClick={() => {
                                          deleteFund(fund.ccsp_fund_id); // Assuming 'deactive' is the new status
                                        }}
                                        className="m-1"
                                      >
                                        <span className="fa fa-trash text-danger"></span>
                                      </Link>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td className="text-center" colSpan={8}>
                                    No funds found.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        ) : (
                          <p>No data available in table</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end col */}
            </div>{" "}
            {/* end row */}
          </div>{" "}
          {/* container-fluid */}
        </div>
        <ToastContainer autoClose={1000} />
      </div>

      <PopupModal
        show={modalConfirm5}
        handleClose={modalConfirmClose5}
        staticClass="var-login"
      >
        <div className="pop-b-round text-center">
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="button"
                className="btn-close m-min-top set-close"
                onClick={() => {
                  setModalConfirm5(false);
                }}
              ></button>
            </div>
          </div>
        </div>
        <form onSubmit={handleAddFundNameImage}>
          <div className="form-contact-set">

            <label className="form-label">
              <h4>Add Fund Name And Banner Image</h4>
            </label>
            <div>

              <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                <span>Fund Name</span>
              </label>
              <input
                type="text"
                placeholder="Fund Name"
                className="form-control"
                name="fund_name"
                value={fundname}
                onChange={(e) => setFundName(e.target.value)}
              />

              <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                <span>Fund Description</span>
              </label>
              <textarea
                rows={4}
                placeholder="Enter details here"
                className="form-control"
                name="fund_desc"
                value={funddesc}
                onChange={(e) =>
                  setFundDesc(e.target.value)
                } />

              <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                <span>Banner Image</span>
              </label>
              <div className="file-upload">
                <div className="file-select">
                  <div
                    className="file-select-button"
                    id="fileName"
                  >
                    Chose file
                  </div>
                  <div className="file-select-name" id="noFile">
                    {fundImageName ? fundImageName : (fundimage ? fundimage : "No File Chosen ...")}
                  </div>
                  <input
                    className="input-file"
                    id="logo"
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    name="fund_banner_image"
                    onChange={(e) => handleUpdateLogoChange(e)}
                  />
                </div>
              </div>
              {fundImageNameError ? (
                <p className="text-danger">{fundImageNameError}</p>
              ) : (
                startUpLogoError && <p className="text-danger">{startUpLogoError}</p>
              )}

              {/* <div className="profile-pic"> */}
              {previewImage ? (
                <Image
                  src={typeof previewImage === "string" ? previewImage : ""}
                  width={300}
                  height={200}
                  alt=""
                  className="profile-pic"
                  style={{ margin: "5% 0%", objectFit: "cover" }}
                />
              ) : (
                fundimage ? (
                  <Image
                    src={
                      fundimage && typeof fundimage !== "string" && fundimage.fund_banner_image
                        ? URL.createObjectURL(fundimage.fund_banner_image)
                        : process.env.NEXT_PUBLIC_IMAGE_URL + "images/fundbannerimage/" + fundimage
                    }
                    alt="Banner Image"
                    className="profile-pic"
                    style={{
                      margin: "5% 0%",
                      objectFit: "cover",
                    }}
                    width={300}
                    height={200}
                  />
                ) : (
                  <></>
                )
              )}
              {/* </div> */}
              <br />
              <button type="submit" className="btnclasssmae set-but-company mt-3">
                Submit
              </button>


            </div>
          </div>
        </form>
      </PopupModal>

      <PopupModal
        show={modalConfirm}
        handleClose={modalConfirmClose}
        staticClass="var-login"
      >
        <div className="pop-b-round text-center">
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="button"
                className="btn-close m-min-top set-close"
                onClick={() => {
                  setModalConfirm(false);
                }}
              ></button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-contact-set">
            <label className="form-label">
              <span>Company Overview</span>
            </label>
            <TextEditor
              height={100}
              value={companyOverview ? companyOverview : ''}
              onChange={handleCompanyOverviewChange}
              theme="snow"
            />
            <button type="submit" className="btnclasssmae set-but-company">
              Submit
            </button>
          </div>
        </form>
      </PopupModal>

      <PopupModal
        show={modalConfirm1}
        handleClose={modalConfirmClose1}
        staticClass="var-login"
      >
        <div className="pop-b-round text-center">
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="button"
                className="btn-close m-min-top set-close"
                onClick={() => {
                  setModalConfirm1(false);
                }}
              ></button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-contact-set">
            <label className="form-label">
              <span>Product Description</span>
            </label>
            <TextEditor
              height={100}
              value={productDescription}
              onChange={handleProductDescChange}
              theme="snow"
            />
            <button type="submit" className="btnclasssmae set-but-company">
              Submit
            </button>
          </div>
        </form>
      </PopupModal>

      <PopupModal
        show={modalConfirm2}
        handleClose={modalConfirmClose2}
        staticClass="var-login"
      >
        <div className="pop-b-round text-center">
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="button"
                className="btn-close m-min-top set-close"
                onClick={() => {
                  setModalConfirm2(false);
                }}
              ></button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-contact-set">
            <label className="form-label">
              <span>Historical Financial</span>
            </label>
            <TextEditor
              height={100}
              value={historicalFinancials_desc}
              onChange={handlehistoricalfFinancialChange}
              theme="snow"
            />
            <button type="submit" className="btnclasssmae set-but-company">
              Submit
            </button>
          </div>
        </form>
      </PopupModal>

      <PopupModal
        show={modalConfirm3}
        handleClose={modalConfirmClose3}
        staticClass="var-login"
      >
        <div className="pop-b-round text-center">
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="button"
                className="btn-close m-min-top set-close"
                onClick={() => {
                  setModalConfirm3(false);
                }}
              ></button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-contact-set">
            <label className="form-label">
              <span>Past Finance</span>
            </label>
            <TextEditor
              height={100}
              value={pastfinancingDesc}
              onChange={handlePastFinanceChange}
              theme="snow"
            />
            <button type="submit" className="btnclasssmae set-but-company">
              Submit
            </button>
          </div>
        </form>
      </PopupModal>

      <PopupModal
        show={modalConfirm4}
        handleClose={modalConfirmClose4}
        staticClass="var-login"
      >
        <div className="pop-b-round text-center">
          <div className="row">
            <div className="col-12 text-right">
              <button
                type="button"
                className="btn-close m-min-top set-close"
                onClick={() => {
                  setModalConfirm4(false);
                }}
              ></button>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-contact-set">

            <label className="form-label">
              <span>Add Round Details</span>
            </label>
            <div>

              <label htmlFor="exampleFormControlInput1" className="form-label">
                <span>Round Name</span>
              </label>
              <input
                type="text"
                placeholder="Round Name"
                className="form-control"
                name="round_name"
                value={roundName}
                onChange={(e) => setRoundName(e.target.value)}
              />

              <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                <span>Dilutaion Percentage</span>
              </label>
              <input
                type="number"
                placeholder="Dilutaion Percentage"
                className="form-control"
                name="dilution_percentage"
                value={dilutionpercentage}
                onChange={(e) => setDilutionPercentage(e.target.value)}

              />

              <div className="row">
                <div className="col-md-6">
                  <label htmlFor="minCommitment" className="form-label mt-3">
                    <span>Min Commitment</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Min Commitment"
                    className="form-control"
                    name="min_commitment"
                    value={minCommitment}
                    onChange={(e) => setMinCommitment(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="maxCommitment" className="form-label mt-3">
                    <span>Max Commitment</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Max Commitment"
                    className="form-control"
                    name="max_commitment"
                    value={maxCommitment}
                    onChange={(e) => setMaxCommitment(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                <span>Valuation Cap</span>
              </label>
              <input
                type="number"
                placeholder="Valuation Cap"
                className="form-control"
                name="valuation_cap"
                value={valuationCap}
                onChange={(e) => setValuationCap(e.target.value)}

              />

              <label htmlFor="exampleFormControlInput1" className="form-label mt-3">
                <span>Amount Raised</span>
              </label>
              <input
                type="number"
                placeholder="Amount Raised"
                className="form-control"
                name="amount_raised"
                value={amountRaised}
                onChange={(e) => setAmountRaised(e.target.value)}

              />

              <br />

              <button type="submit" className="btnclasssmae set-but-company mt-3">
                Submit
              </button>


            </div>
          </div>
        </form>
      </PopupModal>

    </>
  );
};

export default Campagin;


