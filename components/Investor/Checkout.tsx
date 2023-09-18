import { useEffect, useRef,useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { getCurrentUserData } from "../../lib/session";
import { getInvestorBookingDetails,savepayment } from '../../lib/investorapi';
import { getBusinessInformationBusinessId } from '../../lib/frontendapi';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

interface UserData {
    id?: string;
  }
  const CheckoutForm = () => {
    const [current_user_id, setCurrentUserId] = useState("");
    // const { register, handleSubmit, formState: { errors }, } = useForm();
    const [bookingdata, setBookingData] = useState<any>({});
    const [businessdata, setBusinessData] = useState<any>({});
    const [showModal, setShowModal] = useState(false);
    const [paymentdata, setPaymentData] = useState<any>({
        user_id:current_user_id,
        repayment:bookingdata.repayment_value,
        card_number:"",
        expiry_date:"",
        cvc:"",
        zip_code:""
    });
    const router = useRouter();

    useEffect(() => {
        const current_user_data: UserData = getCurrentUserData();
        if (current_user_data?.id != null) {
            current_user_data.id
                ? setCurrentUserId(current_user_data.id)
                : setCurrentUserId("");
    
        } else {
            window.location.href = "/login";
        }
        getInvestorBookingDetails(current_user_data.id)
            .then((res) => {
                if (res.status == true) {
                    setBookingData(res.data);
                    getBusinessInformationBusinessId(res.data.business_id)
                        .then((res) => {
                            if (res.status === true) {
                                setBusinessData(res.data);
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
    
    },[]);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return false;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      try {
        savepayment([paymentMethod,bookingdata,businessdata])
          .then((res) => {
            if (res.status == true) {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Your Payment Successfully Credited.',
                  confirmButtonColor: '#64bb2b',
                }).then(() => {
                  router.push('/investor/campaign');
                });
              // toast.success(res.message, {
              //   position: toast.POSITION.TOP_RIGHT,
              //   toastId: "success",
              // });
  
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong.',
                confirmButtonColor: '#64bb2b',
              }).then(() => {
                router.push(`/`);
              });
                
              //  toast.error(res.message, {
              //   position: toast.POSITION.TOP_RIGHT,
              //   toastId: "error",
              // });
            }
          })
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className='form-section  join-back'>
    <div className="container">
        <div id="Checkout" className="inline">
            <h1>Pay Invoice</h1>
            <div className="card-row">
                <span className="visa" />
                <span className="mastercard" />
                <span className="amex" />
                <span className="discover" />
            </div>
            <form onSubmit={handleSubmit}>
     <CardElement
          onReady={() => {
            console.log("CardElement [ready]");
          }}
          onChange={event => {
            console.log("CardElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardElement [blur]");
          }}
          onFocus={() => {
            console.log("CardElement [focus]");
          }}
        />
         <button id="PayButton" className="btn btn-block btn-success submit-button mt-3" type="submit" disabled={!stripe}>
                    <span className="submit-button-lock" />
                    <span className="align-middle">Pay ${bookingdata.repayment_value}</span>
                </button>
      {/* <button >
        Pay
      </button> */}
    </form>
        </div>
    </div>
</section>
   
  );
};

const WrappedCheckoutForm = () => {
  const stripePromise = loadStripe('pk_test_FQu4ActGupRmMrkmBpwU26js');

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
    
  );
};


export default WrappedCheckoutForm;
