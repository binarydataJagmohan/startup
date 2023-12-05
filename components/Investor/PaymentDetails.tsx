import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getSingleBusinessDetails, InvestorBooking } from "@/lib/investorapi";
import { getToken, getCurrentUserData } from "../../lib/session";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { sendNotification } from "../../lib/frontendapi";
interface UserData {
  id?: string;
  role?:string;
}
interface InputData {
  business_id?: string;
  minimum_subscription?: number;
  xirr?: number;
  tenure?: number;
  logo?: string;
  no_of_units?: string;
  total_units?: string;
  repay_date?: string;
  resource?: string;
  business_name?: string;
  desc?: string;
  agreement?: string;
  pdc?: string;
  invoice?: string;
  website_url?: string;
  terms?: string;
  amount?: string;
}

const Details = () => {
  const [currentUserData, setCurrentUserData] = useState<UserData>({});
  const [value, setValue] = useState(1);
  const [inputs, setInputs] = useState<InputData>({});
  const [subscriptionValue, setSubscriptionValue] = useState(0);
  const [repayValue, setRepayValue] = useState(0);
  const [subscription_value, setSubscription_value] = useState(0);
  const [repay_date, setRepay_date] = useState("");
  const [repayment_value, setRepayment_value] = useState(0);
  const [terms, setTerms] = useState(0);
  const [no_of_units, setNo_of_units] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const { id } = router.query;
  const [current_user_id, setCurrentUserId] = useState("");
  const [ButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();    
    if (current_user_data.role !== 'investor') {
        router.back();
    }   
    if (current_user_data?.id != null) {
      current_user_data.id
        ? setCurrentUserId(current_user_data.id)
        : setCurrentUserId("");
    } else {
      window.location.href = "/login";
    }

    const fetchData = async () => {
      const res = await getSingleBusinessDetails(id);
      setInputs(res.data);
      const userData: UserData = getCurrentUserData();
      setCurrentUserData(userData);
    };
    fetchData();
  }, [id]);

  const handleChangeTerms = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox" && name === "terms") {
      // Set the value of cofounder to '1' if the checkbox is checked, '0' otherwise
      const cofounderValue = checked ? "1" : "0";
      setTerms((prevState: any) => {
        return {
          ...prevState,
          cofounder: cofounderValue,
          user_id: current_user_id,
        };
      });
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const data = {
      user_id: currentUserData.id,
      business_id: inputs.business_id,
      subscription_value: subscriptionValue,
      repay_date: inputs.repay_date,
      repayment_value: repayValue,
      no_of_units: value,
    };

    const notification = {
      notify_from_user: currentUserData.id,
      notify_to_user: "1",
      notify_msg: "Payment Successfully Done.",
      notification_type: "Investment Notification",
      each_read: "unread",
      status: "active",
    };
    try {
      InvestorBooking(data).then((res) => {
        if (res.status == true) {
          setButtonDisabled(true);
          router.push(`/investor/checkout`);

          // send notification
          sendNotification(notification)
            .then((notificationRes) => {
            })
            .catch((error) => {
              console.error("error occured");
            });

          // toast.success(res.message, {
          //   position: toast.POSITION.TOP_RIGHT,
          //   toastId: "success",
          // });
        } else {
          toast.error(res.message, {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "error",
          });
        }
      });
    } catch (error) {
      console.error(error);
      // handle the error, such as showing an error message
    }
  };
  const toggleAccordion = (index: any) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handlePlusClick = () => {
    setValue(value + 1);
    const newSubscriptionValue =
      (value + 1) * (inputs.minimum_subscription || 0);
    setSubscriptionValue(newSubscriptionValue);
    const data1 =
      inputs && inputs.xirr ? (newSubscriptionValue * inputs.xirr) / 100 : 0;
    const data3 = data1 / 366;
    const data4 = inputs.tenure ? data3 * inputs.tenure : 0;
    const newRepayValue = newSubscriptionValue + data4;
    const roundedNumber = Math.floor(newRepayValue);
    setRepayValue(roundedNumber);
  };

  const handleMinusClick = () => {
    if (value > 1) {
      setValue(value - 1);
      const newSubscriptionValue =
        (value - 1) * (inputs.minimum_subscription || 0);
      setSubscriptionValue(newSubscriptionValue);
      const data1 =
        inputs && inputs.xirr ? (newSubscriptionValue * inputs.xirr) / 100 : 0;
      const data3 = data1 / 366;
      const data4 = inputs && inputs.tenure ? data3 * inputs.tenure : 0;
      const newRepayValue = newSubscriptionValue + data4;
      const roundedNumber = Math.floor(newRepayValue);
      setRepayValue(roundedNumber);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 1) {
      setValue(newValue);
      const newSubscriptionValue =
        newValue * (inputs.minimum_subscription || 0);
      setSubscriptionValue(newSubscriptionValue);
      const data1 =
        inputs && inputs.xirr ? newSubscriptionValue * inputs.xirr : 0;
      const data2 = data1 / 100;
      const data3 = data2 / 366;
      const data4 = inputs && inputs.tenure ? data3 * inputs.tenure : 0;
      const newRepayValue = newSubscriptionValue + data4;
      setRepayValue(newRepayValue);
    }
  };

  return (
    <>
      <section className="invertor-campaign_detail">
        <div className="container py-5">
          <div className="detail_text">
            <div className="row mb-3 pdcover align-items-center g-3">
              <div className="col-md-6">
                <div className="row g-3">
                  <div className="col-md-7 text-center">
                    <div className="css-1d6tso">
                      <div className="logo-company">
                        <div className="img">
                          {inputs.logo && (
                            <Image
                              src={inputs.logo}
                              alt=""
                              width={60}
                              height={60}
                            />
                          )}
                        </div>
                      </div>

                      <h5>
                        <a
                          href={inputs.website_url}
                          target="_blank"
                          style={{ color: "black" }}
                        >
                          {inputs.business_name}
                        </a>
                      </h5>
                      <p>STARTUP</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="d-flex justify-content-between">
                  <div>
                    <span>Total Amount</span>
                    <h3 className="progressbar-title">₹{inputs.amount}</h3>
                  </div>
                  <div>
                    {" "}
                    <span>Units Left</span>
                    <br />
                    <span className="progressbar-value">
                      <span className="color-rumaric">
                        {inputs.no_of_units}
                      </span>
                      <strong>/{inputs.total_units}</strong>
                    </span>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-success"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={
                      inputs.total_units !== undefined
                        ? parseInt(inputs.total_units)
                        : undefined
                    }
                    style={{ width: `${inputs.no_of_units}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 pl-0">
                <div className="main-fixed p-0">
                  <div className="countersection pt-4">
                    <h4 className="">About</h4>
                    <div className="d-flex justify-content-between all-btn py-3">
                      <div className="">
                        <div className="text-center button-pdf">
                          <a
                            href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.agreement}`}
                            download
                            target="_blank"
                          >
                            <span>
                              Agreement <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <a
                            href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.pdc}`}
                            download
                            target="_blank"
                          >
                            <span>
                              PDC <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                      <div className="">
                        <div className="text-center button-pdf">
                          <a
                            href={`${process.env.NEXT_PUBLIC_PDF_URL}${inputs.invoice}`}
                            download
                            target="_blank"
                          >
                            <span>
                              Invoice <i className="fa-solid fa-download" />
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="oppotsummery pt-4">
                      <h4>Opportunity Summary</h4>
                      <div className="seller">
                        <h6>About the Startup</h6>
                        <p>{inputs.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Details;
