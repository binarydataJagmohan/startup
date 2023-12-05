import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { getCurrentUserData } from "../../lib/session";
import { loadStripe } from '@stripe/stripe-js';
import { getInvestorBookingDetails, savepayment } from '../../lib/investorapi';
import { getBusinessInformationBusinessId } from '../../lib/frontendapi';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useElements } from '@stripe/react-stripe-js';


interface UserData {
    id?: string;
}
const Payment = () => {
    const [current_user_id, setCurrentUserId] = useState("");
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const [bookingdata, setBookingData] = useState<any>({});
    const [businessdata, setBusinessData] = useState<any>({});
    const [paymentdata, setPaymentData] = useState<any>({
        user_id: current_user_id,
        repayment: bookingdata.repayment_value,
        card_number: "",
        expiry_date: "",
        cvc: "",
        zip_code: ""
    });

    const handleChange = (event: any) => {
        let { name, value } = event.target;

        setPaymentData((prevState: any) => {
            return {
                ...prevState,
                [name]: value,
                id: current_user_id,
                repayment: bookingdata.repayment_value,
            };
        });

    };

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

    }, []);


    const stripePromise = loadStripe('pk_test_FQu4ActGupRmMrkmBpwU26js');

    // Handle form submission
    const SubmitForm = async (event: any) => {
        // Prevent the form from submitting (if applicable)
        event.preventDefault();

        const stripe = await stripePromise;
        const elements = useElements();

        if (stripe === null || stripe === undefined) {
            // Handle the case where stripe is null or undefined
            console.error('Stripe is null or undefined.');
            return;
        }

        // Use optional chaining (?.) to safely access cardElement
        const cardElement = elements?.getElement('card');

        if (cardElement) {
            // Create a payment method
            const paymentMethod: any = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            // Send the payment method to your Laravel API endpoint
            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paymentMethod: paymentMethod.id }),
            });

            // Handle the response from the API
            const { clientSecret } = await response.json();

            // Confirm the payment intent
            const { error } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (error) {
                // Handle payment error
            } else {
                // Payment successful
            }
        } else {
            // Handle the case where cardElement is not found
            console.error('Card element not found.');
        }
    };

    return (
        <>
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
                        <form onClick={handleSubmit(SubmitForm)}>
                            <div className="text-center mb-3">
                                <div className="css-1d6tso">
                                    <div className="logo-company">
                                        <div className="img">
                                            <img src={businessdata.logo} alt="" />
                                        </div>
                                    </div>

                                    <h5><a href={businessdata.website_url} target='_blank' style={{ color: "black" }}>{businessdata.business_name}</a></h5>
                                    <p>STARTUP</p>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="PaymentAmount">Payment amount</label>
                                    <div className="amount-placeholder">
                                        <span>$</span>
                                        <span onChange={handleChange}>{bookingdata.repayment_value}</span>
                                    </div>
                                </div>
                                <div className="col-md-6 form-group mb-3">
                                    <label htmlFor="PaymentAmount">Total Units</label>
                                    <div className="amount-placeholder">
                                        <input type="text" className="form-control" onChange={handleChange} value={bookingdata.no_of_units} disabled />
                                    </div>
                                </div>

                            </div>



                            <div className="form-group mb-3">
                                <label>Card Holder</label>
                                <input id="NameOnCard" className="form-control" onChange={handleChange} type="text" maxLength={255} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="CreditCardNumber">Card number</label>
                                <input id="CreditCardNumber" className="null card-image form-control"  {...register("card_number", {
                                    required: true
                                })} onChange={handleChange} type="text" maxLength={16} />
                            </div>
                            <div className="expiry-date-group form-group mb-3">
                                <label htmlFor="ExpiryDate">Expiry date</label>
                                <input id="ExpiryDate" className="form-control" type="text" placeholder="MM / YY" {...register("expiry_date", {
                                    required: true
                                })} onChange={handleChange} maxLength={5} />
                            </div>
                            <div className="security-code-group form-group mb-3">
                                <label htmlFor="SecurityCode">CVC</label>
                                <div className="input-container">
                                    <input id="SecurityCode" className="form-control" type="text" {...register("cvc", {
                                        required: true
                                    })} onChange={handleChange} />
                                    <i id="cvc" className="fa fa-question-circle" />
                                </div>
                                <div className="cvc-preview-container two-card hide">
                                    <div className="amex-cvc-preview" />
                                    <div className="visa-mc-dis-cvc-preview" />
                                </div>
                            </div>
                            <div className="zip-code-group form-group mb-3">
                                <label htmlFor="ZIPCode">ZIP/Postal code</label>
                                <div className="input-container">
                                    <input id="ZIPCode" className="form-control" type="text" {...register("zip_code", {
                                        required: true
                                    })} onChange={handleChange} maxLength={10} />
                                    <i className="fa fa-question-circle" />
                                </div>
                            </div>
                            <button id="PayButton" className="btn btn-block btn-success submit-button" type="submit">
                                <span className="submit-button-lock" />
                                <span className="align-middle">Pay ${bookingdata.repayment_value}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Payment
