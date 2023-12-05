import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { getCurrentUserData } from "../../lib/session";
import { getAngelInvestorTerms, angelInvestorTermsSave, sendNotification, getSingleUserData } from "../../lib/frontendapi";
import $ from "jquery";
import Link from 'next/link';

interface CurrentUserData {
  id?: string;
  name?: string;
}

export default function Customizereview(): any {
  const router = useRouter();
  const [current_user_id, setCurrentUserId] = useState("");
  const [terms, setTerms] = useState({
    user_id: current_user_id,
    category: "",
    principal_residence: "0",
    cofounder: "0",
    prev_investment_exp: "0",
    experience: "0",
    net_worth: "0",
    no_requirements: "0"
  });
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [users, setUsers] = useState<any>({});
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissingFields([]);
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox' && name === 'principal_residence') {
      // Set the value of principal_residence to '1' if the checkbox is checked, '0' otherwise
      const principal_residenceValue = checked ? '1' : '0';
      setTerms((prevState) => {
        return {
          ...prevState,
          principal_residence: principal_residenceValue,
          user_id: current_user_id,
        };
      });
    } else if (type === 'checkbox' && name === 'cofounder') {
      // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
      const cofounderValue = checked ? '1' : '0';
      setTerms((prevState) => {
        return {
          ...prevState,
          cofounder: cofounderValue,
          user_id: current_user_id,
        };
      });
    } else if (type === 'checkbox' && name === 'prev_investment_exp') {
      // Set the value of prev_investment_exp to '1' if the checkbox is checked, '0' otherwise
      const prev_investment_expValue = checked ? '1' : '0';
      setTerms((prevState) => {
        return {
          ...prevState,
          prev_investment_exp: prev_investment_expValue,
          user_id: current_user_id,
        };
      });
    } else if (type === 'checkbox' && name === 'experience') {
      // Set the value of experience to '1' if the checkbox is checked, '0' otherwise
      const experienceValue = checked ? '1' : '0';
      setTerms((prevState) => {
        return {
          ...prevState,
          experience: experienceValue,
          user_id: current_user_id,
        };
      });
    } else if (type === 'checkbox' && name === 'net_worth') {
      // Set the value of net_worth to '1' if the checkbox is checked, '0' otherwise
      const net_worthValue = checked ? '1' : '0';
      setTerms((prevState) => {
        return {
          ...prevState,
          net_worth: net_worthValue,
          user_id: current_user_id,
        };
      });
    } else if (type === 'checkbox' && name === 'no_requirements') {
      // Set the value of no_requirements to '1' if the checkbox is checked, '0' otherwise
      const no_requirementsValue = checked ? '1' : '0';
      setTerms((prevState) => {
        return {
          ...prevState,
          no_requirements: no_requirementsValue,
          user_id: current_user_id,
        };
      });
    }
    else {
      setTerms((prevState) => {
        return {
          ...prevState,
          [name]: value,
          user_id: current_user_id,
        };
      });
    }
  };

  useEffect(() => {
    $(document).ready(function () {
      $('#checkbox-group-1, #checkbox-group-2, #checkbox-group-3').hide();
      $('.options').on('change', function () {
        $('#checkbox-group-1, #checkbox-group-2, #checkbox-group-3').hide();
        var selectedOption = $(this).val();

        $('#checkbox-group-' + selectedOption).show();
      });
    });
    const current_user_data: CurrentUserData = getCurrentUserData();

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


    if (current_user_data.id) {
      setCurrentUserId(current_user_data.id.toString());
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

    } else {
      window.location.href = "/login";
    }
  }, []);


  const SubmitForm = async () => {

    const updatedTerms = {
      ...terms,
      principal_residence: terms.principal_residence === '1' ? '1' : '0',
      prev_investment_exp: terms.prev_investment_exp === '1' ? '1' : '0',
      cofounder: terms.cofounder === '1' ? '1' : '0',
      experience: terms.experience === '1' ? '1' : '0',
      net_worth: terms.net_worth === '1' ? '1' : '0',
      no_requirements: terms.no_requirements === '1' ? '1' : '0',
    };

    const category = updatedTerms.category;
    const selectCategoryFirst = category === '1';
    if (selectCategoryFirst && updatedTerms.principal_residence !== '1') {
      setMissingFields(prevFields => [...prevFields, "principal_residence"]);
      return;
    }

    const selectedOptionCount =
      (updatedTerms.prev_investment_exp === '1' ||
        updatedTerms.cofounder === '1' ||
        updatedTerms.experience === '1');
    if (selectCategoryFirst && !selectedOptionCount) {
      setMissingFields(prevFields => [...prevFields, "selectedOptionCount"]);
      return;
    }
    const selectedCategoryRequiresCheckbox =
      category === '2' || category === '3';

    if (
      selectedCategoryRequiresCheckbox &&
      !(
        updatedTerms.net_worth === '1' ||
        updatedTerms.no_requirements === '1'
      )
    ) {
      if (updatedTerms.net_worth !== '1') {
        setMissingFields(prevFields => [...prevFields, "net_worth"]);
      }

      if (updatedTerms.no_requirements !== '1') {
        setMissingFields(prevFields => [...prevFields, "no_requirements"]);
      }
      return;
    }



    try {
      const res = await angelInvestorTermsSave(terms);
      const data = {
        notify_from_user: current_user_id,
        notify_to_user: "1",
        notify_msg: `The user ${users.name} has successfully completed their profile. Please review the profile details and ensure it meets the required standards.`,
        notification_type: "Profile Completed",
        each_read: "unread",
        status: "active"
      };
      if (res.status == true) {
        // Send Notifications to admin When new user is register
        sendNotification(data)
          .then((notificationRes) => {
          })
          .catch((error) => {
          });


        toast.success(res.message, {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "success",
        });
        if (users.approval_status === 'pending') {
          setTimeout(() => {
            router.push("/investor/thank-you");
          }, 1000);
        }
        if (users.approval_status === 'approved') {
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
    } catch (err) {

    }
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
                    <h4 className="black_bk_col fontweight500 font_20 mb-4 text-center">
                      {" "}
                      Terms & Conditions{" "}
                      <i
                        style={{ cursor: "pointer" }}
                        className="fa fa-info-circle"
                        aria-hidden="true"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Please select Terms & Conditions.That would be helpful to verify your account."
                      ></i>
                    </h4>
                    <div className="container" id="option_select">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="custom-select-bar position-relative">
                            {/* <form  className="needs-validation mb-4"  onSubmit={SubmitForm} > */}
                            <select className="options" {...register("category", { validate: (value) => value != "", required: true, onChange: handleChange })}
                              name="category" value={terms ? terms.category : ""}>
                              <option value="">--SELECT CATEGORY--</option>
                              <option value="1">Individual</option>
                              <option value="2">Body Corporate/VC/PE/Family Office 1 /Corporate Institution</option>
                              <option value="3">Accelerators and Incubators</option>
                            </select>
                            <i className="fa-solid fa-chevron-down"></i>
                          </div>
                          <div id="checkbox-group-1" className="hidden">
                            <div className="same-card">
                              <div className="row">
                                <div className="col-auto">
                                  <input type="checkbox" id="checkbox1" value="1"
                                    {...register("principal_residence", { value: true, required: true })}
                                    name="principal_residence" onChange={handleChange} checked={terms.principal_residence === '1' ? true : false} />
                                </div>

                                <div className="col">
                                  <label htmlFor="checkbox1">
                                    Net tangible assets of at least INR 2 Crore excluding value of his principal residence
                                  </label>
                                  {missingFields.includes("principal_residence") && (
                                    <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                      * Principal residence option is required.
                                    </p>
                                  )}
                                </div>

                              </div>

                            </div>
                            <div className="same-card">
                              <div className="row">
                                <div className="col-auto">
                                  <input type="checkbox" id="checkbox2" value="1" {...register("prev_investment_exp", { value: true, required: true })}
                                    name="prev_investment_exp" onChange={handleChange} checked={terms.prev_investment_exp === '1' ? true : false} />
                                </div>
                                <div className="col">
                                  <label htmlFor="checkbox2">Has invested in startups before</label>
                                </div>
                              </div>
                            </div>
                            <div className="same-card">
                              <div className="row">
                                <div className="col-auto">
                                  <input type="checkbox" id="checkbox3" value="1" {...register("cofounder", { value: true, required: true })}
                                    name="cofounder" onChange={handleChange} checked={terms.cofounder === '1' ? true : false} />
                                </div>
                                <div className="col">
                                  <label htmlFor="checkbox3">come from an entrepreneurial family or have been a
                                    founder/co-founder of a business
                                    venture</label>
                                </div>
                              </div>
                            </div>
                            <div className="same-card">
                              <div className="row">
                                <div className="col-auto">
                                  <input type="checkbox" id="checkbox4" value="1" {...register("experience", { value: true, required: true })}
                                    name="experience" onChange={handleChange} checked={terms.experience === '1' ? true : false} />
                                </div>
                                <div className="col">
                                  <label htmlFor="checkbox4">Senior management professional with at least 10 years of
                                    experience
                                  </label>
                                  {missingFields.includes("selectedOptionCount") && (
                                    <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                      * One more option is required.
                                    </p>
                                  )}
                                </div>

                              </div>
                            </div>
                          </div>
                          <div id="checkbox-group-2" className="hidden">
                            <div className="same-card">
                              <div className="row">
                                <div className="col-auto">
                                  <input type="checkbox" id="checkbox5" value="1" {...register("net_worth", { value: true, required: true })}
                                    name="net_worth" onChange={handleChange}
                                    checked={terms.net_worth === '1' ? true : false} />
                                </div>
                                <div className="col">
                                  <label htmlFor="checkbox5">Net worth of at least INR 10 Crore</label>
                                  {missingFields.includes("net_worth") && (
                                    <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                      * Net worth option is required.
                                    </p>
                                  )}
                                </div>

                              </div>
                            </div>
                          </div>
                          <div id="checkbox-group-3" className="hidden">
                            <div className="same-card">
                              <div className="row">
                                <div className="col-auto">
                                  <input type="checkbox" id="checkbox6" value="1" {...register("no_requirements", { value: true, required: true })}
                                    name="no_requirements" onChange={handleChange} checked={terms.no_requirements === '1' ? true : false} />
                                </div>
                                <div className="col">
                                  <label htmlFor="checkbox6">No Requirement</label>
                                  {missingFields.includes("no_requirements") && (
                                    <p className="text-danger" style={{ textAlign: "left", fontSize: "12px" }}>
                                      * No Requirement option is required.
                                    </p>
                                  )}
                                </div>

                              </div>
                            </div>
                          </div>


                          <div className="row mt-3">
                            <div
                              className="col-md-6"
                              style={{ textAlign: "left" }}
                            >
                              <Link
                                href={`/investor-steps/investor-type`}
                                className="btnclasssmae"
                                id="back"
                              >
                                Go back
                              </Link>
                            </div>

                            <div
                              className="col-md-6"
                              style={{ textAlign: "right" }}
                            >
                              <button type="submit" className="btnclasssmae" onClick={SubmitForm}>
                                Submit
                              </button>
                            </div>
                          </div>
                          {/* </form> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer autoClose={2000} />
      </div>
    </>
  );
}
