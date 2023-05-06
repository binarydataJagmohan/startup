import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {removeToken,removeStorageData,getCurrentUserData,} from "../../lib/session";
import {fundInformationSave,getSingleBusinessInformation} from '../../lib/companyapi';


const FundRaiseForm = () => {
  const router = useRouter();
  const {register,handleSubmit,formState: { errors },} = useForm();
  const [current_user_id, setCurrentUserId] = useState(false);
  const [businessInfo,setBusinessInfo]=useState('');
  const [fundRaiseData, setFundRaiseData] = useState({
    user_id: current_user_id,
    business_id:businessInfo,
    total_units: "",
    minimum_subscription: "",
    avg_amt_per_person: "",
    tenure: "",
    repay_date: "",
    closed_in: "",
    resource: "",
    status: "",
    xirr: ""
  });

  useEffect(() => {
    const current_user_data = getCurrentUserData();
    if (current_user_data.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");

        getSingleBusinessInformation(current_user_data.id)
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

  }, []);
  

  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name === 'total_units') {
      value = value.replace(/\D/g, '');
      value = value.substring(0, 12);
    }
    if (name === 'avg_amt_per_person') {
      value = value.replace(/\D/g, '');
      value = value.substring(0, 12);
    }
    if (name === 'minimum_subscription') {
      value = value.replace(/\D/g, '');
      value = value.substring(0, 12);
    }
    if (name === 'xirr') {
      value = value.replace(/\D/g, '');
      value = value.substring(0, 12);
    }
    setFundRaiseData((prevState) => {
      return {
        ...prevState,
        [name]: value,
        user_id: current_user_id,
        business_id :businessInfo
      };
    });
  };
 
  const SubmitForm = async () => {
    try {
      // console.log(fundRaiseData);
      const res = await fundInformationSave(fundRaiseData);
  
      if (res.status === true) {
        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
        // setTimeout(() => {
        //   router.push("/company/dashboard");
        // }, 1000);
      
      } else {
        toast.error(res.msg, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "error",
        });
      }
    } catch (err) {
      toast.error("Business Details have not been saved successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "error",
      });
    }
  };
  return (
    <>
      <div className='main-content'>
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h6 className="page-title">Startup</h6>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "/company/dashboard"}>Dashboard</a>
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
                <div className='card'>
                  <div className="card-header text-white" id="title">
                    <h3 className="card-title" >Add New Fund Raise</h3>
                  </div>
                  <div className='card-body'>
                    <form className="needs-validation mb-4" onSubmit={handleSubmit(SubmitForm)}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Total Units{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="number" className="form-control" id="total_units" name="total_units" placeholder="Total Units"
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="exampleFormControlInput1" className="form-label" >Minimum Subscription{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="text" className="form-control" id="minimum_subscription" name="minimum_subscription" placeholder="Total Subscription"
                            onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row g-3 mt-1">
                        <div className="col-md-6">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Average Amount(Per Unit){" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="text" className="form-control" id="avg_amt_per_person" name="avg_amt_per_person" placeholder="Average Amount(Per Unit)"
                            onChange={handleChange} />
                        </div>
                        <div className="col-sm-6 mt-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label mb-4">
                            Tenure <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select form-select-lg mb-3 css-1492t68"
                            name="tenure" onChange={handleChange}
                            aria-label="Default select example"
                          >
                            <option value="">--SELECT TENURE--</option>
                            <option value="60">60 Days</option>
                            <option value="90">90 Days(60Days+30Days)</option>
                            <option value="120">120 Days(90Days+30Days)</option>
                          </select>
                        </div>
                      </div>

                      <div className="row g-3 ">
                        <div className="col-md-6">
                          <label htmlFor="exampleFormControlInput1" className="form-label"> Repay On Date{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="date" className="form-control" id="repay_date" name="repay_date"
                            onChange={handleChange} />
                        </div>
                        <div className="col-md-6">
                          <label htmlFor="exampleFormControlInput1" className="form-label"> Closing Date{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="date" className="form-control" id="closed_in" name="closed_in"
                            onChange={handleChange} />
                        </div>
                      </div>

                      <div className="row g-3 mt-1">
                        <div className="col-sm-6 mt-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label mb-4">
                            Resouce<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select form-select-lg mb-3 css-1492t68"
                            name="resource" onChange={handleChange}
                            aria-label="Default select example"
                          >
                            <option value="">--SELECT RESOURCE--</option>
                            <option value="Buyer">Buyer</option>
                            <option value="Seller">Seller</option>
                          </select>
                        </div>
                        <div className="col-sm-6 mt-3">
                          <label htmlFor="exampleFormControlInput1" className="form-label mb-4">
                            Status<span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-select form-select-lg mb-3 css-1492t68"
                            name="status" onChange={handleChange}
                            aria-label="Default select example"
                          >
                            <option value="">--SELECT STATUS--</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </div>
                      </div>

                      <div className="row g-3">
                        <div className="col-sm-12">
                          <label htmlFor="exampleFormControlInput1" className="form-label">
                            XIRR(in %)<span style={{ color: "red" }}>*</span>
                          </label>
                          <input type="number" className="form-control" id="xirr" name="xirr" placeholder='Xirr( calculate in%)'
                            onChange={handleChange} />
                        </div>
                        {/* <div className="col-sm-6 mt-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label mb-4">
                        Status<span style={{ color: "red" }}>*</span>
                      </label>
                      <select
                        className="form-select form-select-lg mb-3 css-1492t68"
                        name="resource"
                        aria-label="Default select example"
                      >
                        <option value="">--SELECT STATUS--</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div> */}
                      </div>

                      <div className="row mt-3">
                        <div className="col-md-6" style={{ textAlign: "right" }}>
                          <button type="submit" className="btn btn-primary">
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>{" "}
          </div>{" "}{/* container-fluid */}
        </div>
        <ToastContainer autoClose={5000} />
      </div>
    </>
  )
}

export default FundRaiseForm