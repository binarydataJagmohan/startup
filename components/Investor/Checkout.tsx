import { useEffect, useState } from 'react';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { getCurrentUserData } from "../../lib/session";
import { getInvestorBookingDetails, savepayment } from '../../lib/investorapi';
import { getBusinessInformationBusinessId } from '../../lib/frontendapi';
import { useRouter } from "next/router";
import Swal from 'sweetalert2';

interface UserData {
  id?: string;
}
const CheckoutForm = () => {
  const [bookingdata, setBookingData] = useState<any>({});
  const [businessdata, setBusinessData] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
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

  }, []);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements || isSubmitting) {
      return false;
    }
    setIsSubmitting(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)!,
    });

    if (error) {
      setIsSubmitting(false);
    } else {
      try {
        savepayment([paymentMethod, bookingdata, businessdata])
          .then((res) => {
            setIsSubmitting(false);
            if (res.status == true) {
              Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Your Payment Successfully Credited.',
                confirmButtonColor: '#64bb2b',
              }).then(() => {
                router.push('/investor/campaign');
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'Something went wrong.',
                confirmButtonColor: '#64bb2b',
              }).then(() => {
                router.push(`/`);
              });
            }
          })
      } catch (error) {
        console.error(error);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className='form-section  join-back py-5'>
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
              }}
              onChange={event => {
              }}
              onBlur={() => {
              }}
              onFocus={() => {
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
