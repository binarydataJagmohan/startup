import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { getSingleInvestor } from '../../lib/investorapi';
import { getCountries } from '../../lib/frontendapi';
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from 'next/router';
import "react-phone-input-2/lib/style.css";
import { sendNotification } from '../../lib/frontendapi';
import { getToken, getCurrentUserData } from "../../lib/session";
type Country = {
  name: string;
  country_code: string;
}
interface UserData {
  id?: string;
}
const EditInvestor = () => {
  const [investor, setInvestor] = useState({ email: '', linkedin_url: '', country: '', phone: '', city: '', gender: '' });

  const [countries, setcountries] = useState<Country[]>([]);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const router = useRouter();
  const { id } = router.query;


  const phonClick = (event: any) => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let { name, value } = event.target;
    var selectedCountry = countries.find(
      (country) => country.name === value
    );
    var countryCode = "";
    if (selectedCountry) {
      countryCode = selectedCountry.country_code;
    }

    setInvestor((prevState: any) => {
      return {
        ...prevState,
        [name]: value,
        id: id,
        country_code: countryCode ? `${countryCode}` : " ",
      };
    });
  }

  const updateInvestorInformation = async (e: any) => {
    e.preventDefault();
    setMissingFields([]);
    setInvalidFields([]);


    const current_user_data: UserData = getCurrentUserData();
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      const data = {
        notify_from_user:current_user_data.id ,
        notify_to_user:  id,
        notify_msg:`User has been Updated his profile Successfully by Admin.`,
        notification_type: "Upadte Notification",
        each_read: "unread",
        status: "active"
      };
      // Send Notifications to investor when admin update his profile is register
      sendNotification(data)
      .then((notificationRes) => {
        console.log('success')
      })

    if(!investor.email){
      setMissingFields(prevField =>[...prevField,"Email"])
    } else if (!/^[\w.%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(investor.email)) {
      setInvalidFields(prevFields => [...prevFields, "Email"]);
    }
    if (!investor.linkedin_url) {
      setMissingFields(prevFields => [...prevFields, "linkedin_url"]);
    } else if (!/^(https?:\/\/)?([a-z]{2,3}\.)?linkedin\.com\/(in|company)\/[\w-]+$/i.test(investor.linkedin_url)) {
      setInvalidFields(prevFields => [...prevFields, "linkedin_url"]);
    }
    if(!investor.city)  setMissingFields(prevField =>[...prevField,"City"]);
    if(!investor.country) setMissingFields(prevField=>[...prevField,"country"]);
    if(!investor.gender) setMissingFields(prevField=>[...prevField,"gender"]);
    if(!investor.phone) setMissingFields(prevField =>[...prevField,"Phone"]);

    try{
    const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/update-investor-personal-info/${id}`,
    {

      ['email']: investor.email,
      ['country']: investor.country,
      ['phone']: investor.phone,
      ['city']: investor.city,
      ['linkedin_url']: investor.linkedin_url,
      ['gender']: investor.gender

        }
      );
      

      toast.success('Information updated successfully');
      
      setTimeout(() => {
        router.push('/admin/all-investors'); 
      }, 2000);
    }
    catch (error) {

    }

  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');


    const fetchData = async () => {
      const data = await getCountries({});
      if (data) {
        setcountries(data.data);
      }
    };

    fetchData();

  }, []);
  const handleInvestorChange = (e: any) => {
    setMissingFields([]);
    setInvalidFields([]);
    setInvestor((prevInvestor) => ({
      ...prevInvestor,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    const fetchData = async (id: any) => {
      const data = await getSingleInvestor(id);
      if (data) {
        setInvestor(data.data);

      }

    };
    if (router.query.id) {
      fetchData(router.query.id);
    }


  }, [router.query.id]);

  return (
    <div className="form-faq pt-5 pb-5">
      <div className="container">
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse show"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                 Personal Information:
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <div className="form-part">
                  {/* <h3>Personal Information</h3> */}
                  <form onSubmit={updateInvestorInformation}>
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Email{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Email" name="email"
                            //  onChange={handleInvestorChange} 
                            value={investor.email} readOnly />
                          <div className="help-block with-errors" />
                          {/* {missingFields.includes("Email") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the Email field.
                            </p>
                          )}
                          {invalidFields.includes("Email") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please enter a valid email address.
                            </p>
                          )} */}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Linkedin Url{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input
                            type="text"
                            placeholder="www.linkedin.com" name="linkedin_url" onChange={handleInvestorChange} value={investor.linkedin_url} 

                          />
                          <div className="help-block with-errors" />
                          {missingFields.includes("linkedin_url") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the linkedin_url field.
                            </p>
                          )}
                          {invalidFields.includes("linkedin_url") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please enter a valid linkedin_url address.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Rest of the form code */}
                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Country{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="Country of Citizenship " onChange={handleInvestorChange} name="country" value={investor.country} />
                          <div className="help-block with-errors" />
                          {missingFields.includes("country") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the country field.
                            </p>
                          )}

                        </div>
                      </div>
                      <div className="col-sm-6">

                        <div className="form-part">
                          <label htmlFor="exampleFormControlInput1" className="form-label">Phone Number{" "}
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <PhoneInput
                            onClick={phonClick}
                            country={"us"}
                            value={investor.phone}
                            onChange={(value) => {
                              setMissingFields([]);
                              setInvestor((prevState) => ({ ...prevState, phone: value })); 
                            }} 
                          />
                          {missingFields.includes("Phone") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the Phone field.
                            </p>
                          )}


                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">City{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <input type="text" placeholder="City" name="city" onChange={handleInvestorChange} value={investor.city}  />
                          <div className="help-block with-errors" />
                          {missingFields.includes("City") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the city field.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Gender{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <div className="form-part">
                          <select name="gender" value={investor.gender ? investor.gender : ""} onChange={handleInvestorChange}>
                            <option value={investor.gender ? investor.gender : ""}>{investor.gender ? investor.gender.charAt(0).toUpperCase() + investor.gender.slice(1) : "--SELECT GENDER--"}</option>
                            {investor.gender !== 'male' && <option value="male">Male</option>}
                            {investor.gender !== 'female' && <option value="female">Female</option>}
                            {investor.gender !== 'other' && <option value="other">Other</option>}
                          </select>
                          <div className="help-block with-errors" />
                          {missingFields.includes("gender") && (
                            <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                              Please fill in the gender field.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="row mt-3">
                        <div className="col-md-12 text-center">
                          <button type="submit" className="btnclasssmae">
                            Update
                          </button>
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
      <ToastContainer autoClose={1000} />
    </div>
  );

}

export default EditInvestor