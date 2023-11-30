import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import router from "next/router";
import { useForm } from "react-hook-form";
import {
  uploadDocuments,
  fetchSingleUserDocuments,
  getSingleUserData,
  SelectedOptionsuploadDocuments,
  getAngelInvestorTerms,
  getDocumentsUpload,
} from "../../lib/frontendapi";
import { getCurrentUserData } from "../../lib/session";
import { event } from "jquery";
import Image from "next/image";

interface UserData {
  id?: string;
}
export default function SelectedOptionsDocumentUpload(): any {
  const [proof_of_network, setProofOfNetWorth] = useState(null);
  const [proof_of_income, setProofOfIncome] = useState(null);
  const [certificate_of_incorporation, setCertificateOfIncorporation] =
    useState(null);
  const [ca_signed_net_angeable_2_crore, setCASignedNetAngeable2Crore] =
    useState(null);
  const [net_worth_atleast_10_crore, setNetWorthAtleast10Crore] =
    useState(null);
  const [bank_statement_3_years, setBankStatement3Years] = useState(null);
  const [incorporation_certificate, setIncorporationCertificate] =
    useState(null);
  const [documentUpload, setDocumentUpload] = useState([]);
  const [signup_success, setSignupSuccess] = useState(false);
  const [document_id, setDocumentId] = useState("");
  const [errors, setErrors] = useState({
    proof_of_network: "",
    proof_of_income: "",
    certificate_of_incorporation: "",
    ca_signed_net_angeable_2_crore: "",
    net_worth_atleast_10_crore: "",
    bank_statement_3_years: "",
    incorporation_certificate: "",
  });
  const [basicDetails, setBasicDetails] = useState({
    proof_of_network: "",
    proof_of_income: "",
    certificate_of_incorporation: "",
    ca_signed_net_angeable_2_crore: "",
    net_worth_atleast_10_crore: "",
    bank_statement_3_years: "",
    incorporation_certificate: "",
    documnet_id: "",
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
    no_requirements: "0",
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
      const data = {
        user_id: current_user_data.id,
      };
      getDocumentsUpload(data)
        .then((res) => {
          if (res.status === true) {
            setDocumentUpload(res.data);
          } else {
            setDocumentUpload([]);
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
    if (CASignedNetAngeable2CroreError !== '' || CASignedNetAngeable2CroreSizeError !== '' || proofOfNetWorthError !== '' || proofOfNetWorthSizeError !== '' || proofOfIncomeError !== '' || proofOfIncomeSizeError !== '' || certificateOfIncorporationError !== '' || certificateOfIncorporationSizeError !== '' || netWorthAtleast10CroreError !== '' || netWorthAtleast10CroreSizeError !== '' || bankStatement3YearsError !== '' || bankStatement3YearsSizeError !== '' || incorporationCertificateError !== '' || incorporationCertificateSizeError !== '') {
      return;
    } else {
      const errors: any = {};
      if (users.investorType === "Accredited Investors") {
        if (terms.category == "2" || terms.category == "3") {
        } else {
        }
      }
      if (users.investorType === "Angel Investor") {
        if (terms.category == "2") {
        }
        if (terms.category == "3") {
        }
        if (terms.category == "1") {
        }
      }
      setErrors(errors);
      if (Object.keys(errors).length === 0) {
        const currentUserData: any = getCurrentUserData();
        const data = {
          user_id: currentUserData.id,
        };
        SelectedOptionsuploadDocuments(
          data,
          proof_of_network,
          proof_of_income,
          certificate_of_incorporation,
          ca_signed_net_angeable_2_crore,
          net_worth_atleast_10_crore,
          bank_statement_3_years,
          incorporation_certificate
        )
          .then((res) => {
            if (res.status == true) {
              console.log(data);
              toast.success(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                toastId: "success",
              });
              if (users.investorType !== "Regular Investor") {
                if (users.approval_status === "pending") {
                  setTimeout(() => {
                    if (users.is_email_verification_complete == "1") {
                      router.push("/investor/thank-you");
                    } else {
                      router.push("/verify-email");
                    }
                  }, 1000);
                }
                if (users.approval_status === "approved") {
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
    }
  };

  const [proofOfNetWorthName, setProofOfNetWorthName] = useState('');
  const [proofOfNetWorthError, setProofOfNetWorthError] = useState('');
  const [proofOfNetWorthSizeError, setProofOfNetWorthSizeError] = useState('');

  const handleProofOfNetWorthChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setProofOfNetWorthName(file.name);
          setProofOfNetWorth(file);
          setProofOfNetWorthError('');
        } else {
          setProofOfNetWorthSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setProofOfNetWorthError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };

  const [proofOfIncomeName, setProofOfIncomeName] = useState('');
  const [proofOfIncomeError, setProofOfIncomeError] = useState('');
  const [proofOfIncomeSizeError, setProofOfIncomeSizeError] = useState('');

  const handleProofOfIncomeChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setProofOfIncomeName(file.name);
          setProofOfIncome(file);
          setProofOfIncomeError('');
        } else {
          setProofOfIncomeSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setProofOfIncomeError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };

  const [certificateOfIncorporationName, setCertificateOfIncorporationName] = useState('');
  const [certificateOfIncorporationError, setCertificateOfIncorporationError] = useState('');
  const [certificateOfIncorporationSizeError, setCertificateOfIncorporationSizeError] = useState('');

  const handleCertificateOfIncorporationChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setCertificateOfIncorporationName(file.name);
          setCertificateOfIncorporation(file);
          setCertificateOfIncorporationError('');
        } else {
          setCertificateOfIncorporationSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setCertificateOfIncorporationError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };
  const [CASignedNetAngeable2CroreName, setCASignedNetAngeable2CroreName] = useState('');
  const [CASignedNetAngeable2CroreError, setCASignedNetAngeable2CroreError] = useState('');
  const [CASignedNetAngeable2CroreSizeError, setCASignedNetAngeable2CroreSizeError] = useState('');

  const handleCASignedNetAngeable2CroreChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setCASignedNetAngeable2CroreName(file.name);
          setCASignedNetAngeable2Crore(file);
          setCASignedNetAngeable2CroreError('');
        } else {
          setCASignedNetAngeable2CroreSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setCASignedNetAngeable2CroreError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };

  const [netWorthAtleast10CroreName, setNetWorthAtleast10CroreName] = useState('');
  const [netWorthAtleast10CroreError, setNetWorthAtleast10CroreError] = useState('');
  const [netWorthAtleast10CroreSizeError, setNetWorthAtleast10CroreSizeError] = useState('');

  const handleNetWorthAtleast10CroreChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setNetWorthAtleast10CroreName(file.name);
          setNetWorthAtleast10Crore(file);
          setNetWorthAtleast10CroreError('');
        } else {
          setNetWorthAtleast10CroreSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setNetWorthAtleast10CroreError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };

  const [bankStatement3YearsName, setBankStatement3YearsName] = useState('');
  const [bankStatement3YearsError, setBankStatement3YearsError] = useState('');
  const [bankStatement3YearsSizeError, setBankStatement3YearsSizeError] = useState('');

  const handleBankStatement3YearsChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setBankStatement3YearsName(file.name);
          setBankStatement3Years(file);
          setBankStatement3YearsError('');
        } else {
          setBankStatement3YearsSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setBankStatement3YearsError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };

  const [incorporationCertificateName, setIncorporationCertificateName] = useState('');
  const [incorporationCertificateError, setIncorporationCertificateError] = useState('');
  const [incorporationCertificateSizeError, setIncorporationCertificateSizeError] = useState('');

  const handleIncorporationCertificateChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/pdf', 'image/png'];
      const maxSize = 10 * 1024 * 1024;

      if (allowedTypes.includes(file.type)) {
        if (file.size <= maxSize) {
          setIncorporationCertificateName(file.name);
          setIncorporationCertificate(file);
          setIncorporationCertificateError('');
        } else {
          setIncorporationCertificateSizeError('* Please upload a file that is no larger than 2MB.');
        }
      } else {
        setIncorporationCertificateError('* Please upload a PNG, PDF or JPG file');
        event.target.value = null;
      }
    }
  };

  const handleClickGoBackButton = () => {
    const status = "go_back_invisitor_type";
    localStorage.setItem(
      "go_back_selected_options_document_upload",
      "go_back_invisitor_type"
    );
    window.location.href = "/investor-steps/investor-type";
  };

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
                            {users.investorType === "Accredited Investors" ? (
                              terms.category == "2" || terms.category == "3" ? (
                                <>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Proof Of Net Worth{" "}                                      
                                    </label>
                                    <input
                                      type="file"
                                      name="proof_of_network"
                                      onChange={handleProofOfNetWorthChange}
                                      accept="image/jpeg, image/png , .pdf"
                                    />
                                    {proofOfNetWorthSizeError ? (
                                      <p className="text-danger">{proofOfNetWorthSizeError}</p>
                                    ) : (
                                      proofOfNetWorthError && <p className="text-danger">{proofOfNetWorthError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "proof_network" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Proof Of Income{" "}                                      
                                    </label>
                                    <input
                                      type="file"
                                      name="proof_of_income"
                                      onChange={handleProofOfIncomeChange}
                                      accept="image/jpeg, image/png, .pdf"
                                    ></input>
                                    {proofOfIncomeSizeError ? (
                                      <p className="text-danger">{proofOfIncomeSizeError}</p>
                                    ) : (
                                      proofOfIncomeError && <p className="text-danger">{proofOfIncomeError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.typetype ==
                                                "proof_income" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Certificate Of Incorporation{" "}                                      
                                    </label>
                                    <input
                                      type="file"
                                      name="certificate_of_incorporation"
                                      onChange={
                                        handleCertificateOfIncorporationChange
                                      }
                                      accept="image/jpeg, image/png, .pdf"
                                    ></input>
                                    {certificateOfIncorporationSizeError ? (
                                      <p className="text-danger">{certificateOfIncorporationSizeError}</p>
                                    ) : (
                                      certificateOfIncorporationError && <p className="text-danger">{certificateOfIncorporationError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "certificate_incorporation" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Proof Of Net Worth{" "}                                      
                                    </label>
                                    <input
                                      type="file"
                                      name="proof_of_network"
                                      onChange={handleProofOfNetWorthChange}
                                      accept="image/jpeg, image/png"
                                    />
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "proof_network" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Proof Of Income{" "}                                      
                                    </label>
                                    <input
                                      type="file"
                                      name="proof_of_income"
                                      onChange={handleProofOfIncomeChange}
                                      accept="image/jpeg, image/png"
                                    ></input>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "proof_income" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                </>
                              )
                            ) : (
                              ""
                            )}
                            {users.investorType === "Angel Investor" ? (
                              terms.category == "2" ? (
                                <>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Net Worth of at least INR 10 Crore{" "}
                                    </label>
                                    <input
                                      type="file"
                                      name="net_worth_atleast_10_crore"
                                      onChange={
                                        handleNetWorthAtleast10CroreChange
                                      }
                                      accept="image/jpeg, image/png, .pdf"
                                    ></input>
                                    {netWorthAtleast10CroreSizeError ? (
                                      <p className="text-danger">{netWorthAtleast10CroreSizeError}</p>
                                    ) : (
                                      netWorthAtleast10CroreError && <p className="text-danger">{netWorthAtleast10CroreError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "net_worth_10_crore" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      3 Years Bank Statement{" "}
                                    </label>
                                    <input
                                      type="file"
                                      name="3_years_bank_statement"
                                      onChange={handleBankStatement3YearsChange}
                                      accept="image/jpeg, image/png, .pdf"
                                    ></input>
                                    {bankStatement3YearsSizeError ? (
                                      <p className="text-danger">{bankStatement3YearsSizeError}</p>
                                    ) : (
                                      bankStatement3YearsError && <p className="text-danger">{bankStatement3YearsError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "bank_statement_3_years" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Incorporation Certificate{" "}
                                    </label>
                                    <input
                                      type="file"
                                      name="incorporation_certificate"
                                      onChange={
                                        handleIncorporationCertificateChange
                                      }
                                      accept="image/jpeg, image/png, .pdf"
                                    ></input>
                                    {incorporationCertificateSizeError ? (
                                      <p className="text-danger">{incorporationCertificateSizeError}</p>
                                    ) : (
                                      incorporationCertificateError && <p className="text-danger">{incorporationCertificateError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "incorporation_certificate" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                </>
                              ) : terms.category == "3" ? (
                                <>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      3 Years Bank Statement{" "}
                                    </label>
                                    <input
                                      type="file"
                                      name="3_years_bank_statement"
                                      onChange={handleBankStatement3YearsChange}
                                      accept="image/jpeg, image/png"
                                    ></input>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "bank_statement_3_years" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      Incorporation Certificate{" "}
                                    </label>
                                    <input
                                      type="file"
                                      name="incorporation_certificate"
                                      onChange={
                                        handleIncorporationCertificateChange
                                      }
                                      accept="image/jpeg, image/png"
                                    ></input>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "incorporation_certificate" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                </>
                              ) : terms.category == "1" ? (
                                <>
                                  <div className="col-md-6 mt-5">
                                    <label
                                      htmlFor="exampleFormControlInput1"
                                      className="form-label"
                                    >
                                      CA Signed of Net Tangible of 2 Crore{" "}                                      
                                    </label>
                                    <input
                                      type="file"
                                      name="ca_signed_net_angeable_2_crore"
                                      onChange={
                                        handleCASignedNetAngeable2CroreChange
                                      }
                                      accept="image/jpeg, image/png, .pdf"
                                    ></input>
                                    {CASignedNetAngeable2CroreSizeError ? (
                                      <p className="text-danger">{CASignedNetAngeable2CroreSizeError}</p>
                                    ) : (
                                      CASignedNetAngeable2CroreError && <p className="text-danger">{CASignedNetAngeable2CroreError}</p>
                                    )}
                                    <label
                                      htmlFor="fileupload"
                                      className="input-file-trigger mt-1"
                                      id="labelFU"
                                      style={{
                                        fontSize: "12px",
                                        marginLeft: "1px",
                                      }}
                                      tabIndex={0}
                                    >
                                      <p style={{ fontSize: "13px" }}>
                                        You can upload any image jpg
                                        ,png ,jpeg and pdf file only (max size 10 MB)                                        
                                      </p>
                                    </label>
                                    {documentUpload.length > 0
                                      ? documentUpload.map(
                                        (document: any, index: any) => {
                                          let extension =
                                            document.filename.substring(
                                              document.filename.lastIndexOf(
                                                "."
                                              ) + 1
                                            );
                                          return (
                                            <>
                                              {document.type ==
                                                "ca_signed_angeable_2_crore" ? (
                                                extension == "pdf" ||
                                                  extension == "docs" ||
                                                  extension == "xls" ? (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <i
                                                        className="fa-solid fa-file"
                                                        style={{
                                                          fontSize: "60px",
                                                        }}
                                                      ></i>
                                                    </a>
                                                  </div>
                                                ) : (
                                                  <div className="col-sm-12">
                                                    <a
                                                      href={
                                                        process.env
                                                          .NEXT_PUBLIC_IMAGE_URL +
                                                        "docs/" +
                                                        document.filename
                                                      }
                                                      target="_blank"
                                                    >
                                                      <Image
                                                        src={
                                                          process.env
                                                            .NEXT_PUBLIC_IMAGE_URL +
                                                          "docs/" +
                                                          document.filename
                                                        }
                                                        alt={
                                                          document.filename
                                                        }
                                                        width={100}
                                                        height={80}
                                                      />
                                                    </a>
                                                  </div>
                                                )
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        }
                                      )
                                      : ""}
                                  </div>
                                </>
                              ) : (
                                ""
                              )
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="row mt-3">
                            <div
                              className="col-md-6"
                              style={{ textAlign: "left", fontSize: "12px" }}
                            >
                              <a
                                href="#"
                                className="btnclasssmae"
                                id="back"
                                onClick={handleClickGoBackButton}
                              >
                                Go back
                              </a>
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
