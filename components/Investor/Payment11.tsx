import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { getCurrentUserData } from "../../lib/session";
import { savepayment } from '../../lib/investorapi';
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
// import PaymentPopupModal from '../../commoncomponents/PaymentPopupModal';

export default function Payment() {

  const [user_id, setUserId] = useState("");
  const [current_user_id, setCurrentUserId] = useState("");
  const router = useRouter();
  const [company_id, setCompanyId] = useState("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');  
  const [cvc, setCvc] = useState('');
  const [cardError, setCardError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [cvcError, setCvcError] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');       
  const [expiry, setExpiry] = useState('');
  const [expiryDateError, setExpiryDateError] = useState('');
  const [expiryMonthError, setExpiryMonthError] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const [plan_name, setPlanName] = useState('');
  // const [plan_amount, setPlanAmount] = useState('');
  // const [plan_id, setPlanId] = useState('');
  // const [modalConfirm, setModalConfirm] = useState(false);

  // const modalConfirmClose = () => {
  //   setModalConfirm(false);
  // };
  
  useEffect(() => {
    // checkuserstatus();
  }, [router]);

  
//   const checkuserstatus = async () => {
//     const id = window.localStorage.getItem('id');
//     const email = window.localStorage.getItem('email');
//     const name = window.localStorage.getItem('name');
   
//     if(id){
      
//     setUserId(id);
//     setEmail(email || '');
//     setName(name || '');
//       const check_company_id = window.localStorage.getItem('company_id');
     
//       if(check_company_id){
//         setCompanyId(check_company_id);
//         const plan = window.localStorage.getItem('plan_id'); 
        
//         if(plan){
//             getPlanPrice(plan)
//             .then(res => {
//               if(res.status==true){
//                 setPlanName(res.data.name);
//                 setPlanAmount(res.data.monthly_amount);
//                 setPlanId(res.data.id);
               
//               } 
//             })
//             .catch(err => {
//               toast.error(err, {
//                     position: toast.POSITION.TOP_RIGHT
//               });
//             });
//           }else {
//             window.location.href = '/';   
//           }


//       }else {

//         window.location.href = '/';
       
//       }

//     }else {
//         window.location.href = '/';
//     }

//   }

  const handleNameChange = (event:any) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event:any) => {
    setEmail(event.target.value);
  };

  const handleCardNumberChange = (event:any) => {
    setCardNumber(event.target.value);
  };

  const handleExpiryMonthChange = (event:any) => {
    const value = event.target.value;
    setExpiryMonth(value);
  
    if (/^((0[1-9])|(1[0-2]))$/.test(value)) {
      setExpiryMonthError('');
     
    } else {
      setExpiryMonthError('Invalid expiry month');
     
    }
  };
  
  const handleExpiryYearChange = (event:any) => {
    const value = event.target.value;
 
    setExpiryYear(value);
  
    if (/^\d{4}$/.test(value)) {
      setExpiryDateError('');
    } else {
      setExpiryDateError('Invalid expiry date');
    }
  };

  const handleCvcChange = (event:any) => {
    const value = event.target.value;
    setCvc(value);
  
    if (/^\d{3}$/.test(value)) {
      setCvcError('');
    } else {
      setCvcError('Invalid CVC');
    }
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!name) {
      setNameError('Please enter your name');
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Please enter your email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }

    if (!cardNumber) {
      setCardError('Please enter your card number');
    } 
    else if (!/^\d{16}$/.test(cardNumber)) {
      setCardError('Invalid card number');
    } else {
      setCardError('');
    }

    if (!expiryMonth || !expiryYear) {
        setExpiryDateError('Please enter your card expiry date');
        setExpiryMonthError('Please enter your card expiry month');
      } else if (!/^((0[1-9])|(1[0-2]))$/.test(expiryMonth)) {
        setExpiryMonthError('Invalid expiry month');
        setExpiryDateError('');
      } else if (!/^\d{4}$/.test(expiryYear)) {
        setExpiryMonthError('');
        setExpiryDateError('Invalid expiry year');
      } else {
        setExpiryMonthError('');
        setExpiryDateError('');
      }

    if (!cvc) {
        setCvcError('Please enter your card security code (CVC)');
    } else if (!/^\d{3}$/.test(cvc)) {
        setCvcError('Invalid CVC');
    } else {
        setCvcError('');
    }

   

    if (name && email && cardNumber && cvc && expiryMonth && expiryYear && !nameError && !emailError && !cardError && !cvcError && !expiryDateError && !expiryMonthError) {

        setIsProcessing(true);

          const data = {
            name:name,
            email:email,
            card_number:cardNumber,
            exp_month : expiryMonth,
            exp_year : expiryYear,
            cvc:cvc,
            amount : plan_amount,
            user_id: user_id,
            plan:plan_id,
            company_id :company_id
            
        }
        
        savepayment(data)
        .then(res => {  
        
          setModalConfirm(true);
          setIsProcessing(false);
          window.localStorage.removeItem('company_id');
          window.localStorage.removeItem('plan_id');
         
          setTimeout(function() {
            window.location.href = '/company/dashboard';
          }, 2500);
        
          
        }) .catch(err => {
           
            const errorMessage = err.response.data.message;
            toast.error(errorMessage, {
              position: toast.POSITION.BOTTOM_RIGHT
            });
            setIsProcessing(false);
         
        });   
       
    }
   
  };

 

  return (
    <div>
      <section className='form-section  join-back'>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-5'>
              <div className='form-part'>
                <h2 className='f-32 w-700 c-27476E'>You are subscribing to our</h2>
                <h2 className='f-48 w-700 c-2E9DFF'>Prime Plan</h2>
                  
                 <div className='card-box  mt-5'>
                  <p className='f-18 c-333333 w-600 mb-1'>Payment Due</p>
                  <p className='f-16 c-666666 w-400'>Your payment method will be charged by the due date.</p>
                   <div className='row mt-4'>
                    <div className='col-sm-8'>
                      <p className='c-2E9DFF f-24 w-700 mb-1'>Find Your Visa: {plan_name} Plan </p>
                      <p className='f-16 c-666666 w-400'>charged yearly</p>
                    </div>
                    <div className='col-sm-4 text-right'>
                      <p className='c-27476E f-40 w-500'>$ {plan_amount}</p>
                    </div>
                   </div>
                 </div>

                 <div className='mt-4'>
                  <p className='f-14 c-0C1622 w-500'>We accept: &nbsp; &nbsp; <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/viza.png"} alt="viza"  /></p>
                 </div>
                 <form onSubmit={handleSubmit} className="pb-5 stripe_form">

                    <div className='form-fild mt-2'>
                      <label className='f-14 w-700 c-0C1622 w-100 mb-2'>Name</label> 
                      <input type="text" className="form-control payment_class" value={name} onChange={handleNameChange}  placeholder='Enter Name'/>
                      {nameError && <span className="error text text-danger">{nameError}</span>}
                    </div>


                    <div className='form-fild mt-2'>
                          <label className='f-14 w-700 c-0C1622 w-100 mb-2'>Email</label> 
                          <input type="email" className="form-control payment_class"  value={email} onChange={handleEmailChange} placeholder='Enter Email'/>
                          {emailError && <span className="error text-danger">{emailError}</span>}
                    </div>

                    <div className='form-fild mt-4'>
                      <label className='f-14 w-700 c-0C1622 w-100 mb-2'>Card Number</label> 
                      <input type='text' placeholder='Enter Card Number ' className='pl-img' value={cardNumber}  onChange={handleCardNumberChange}  maxLength={16}/>
                      <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/viza2.png"} alt="viza2" className='img-icon'  /> 
                      {cardError && <span className="error text-danger">{cardError}</span>}
                    </div> 

                    <div className='row'>
                      <div className='col-sm-4'> 
                          <label className='f-14 w-700 c-0C1622 w-100 mb-2 mt-3'>Expiry Month</label> 
                          <input type='text' placeholder='MM'  className='fild-form '  value={expiryMonth} onChange={handleExpiryMonthChange}  maxLength={2}/>   
                          
                          {expiryMonthError && <span className="error" style={{color:'#dc3545'}}>{expiryMonthError}</span>}
                      </div>
                      <div className='col-sm-4'> 
                          <label className='f-14 w-700 c-0C1622 w-100 mb-2 mt-3'>Expiry Year</label> 
                          <input type='text' placeholder='YYYY'  value={expiryYear} onChange={handleExpiryYearChange}   className='fild-form ' maxLength={4}/>   
                          {expiryDateError && <span className="error" style={{color:'#dc3545'}}>{expiryDateError}</span>}
                      </div>
                      <div className='col-sm-4'> 
                          <label className='f-14 w-700 c-0C1622 w-100 mb-2 mt-3' >CVV</label> 
                          <input type='text' placeholder='123' className='fild-form ' value={cvc} onChange={handleCvcChange}  maxLength={3}/>  
                          {cvcError && <span className="error " style={{color:'#dc3545'}}>{cvcError}</span>}
                      </div>
                    </div>
                  
                 <button className='btn-form-in mt-3 bg-04B477' disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Pay'}</button>

                </form>
 
              </div>
            </div>
            <div className='col-sm-7 mt-5'> 
            <img src={process.env.NEXT_PUBLIC_BASE_URL + "images/join-back.png"} alt="join-back" className='mt-5 right-img-m' />

            </div>
          </div>
        </div>
      </section> 
     
      {/* <PaymentPopupModal show={modalConfirm} handleClose={modalConfirmClose} staticClass="var-login">
           <div className='text-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="text-success" width="75" height="75"
                              fill="currentColor" viewBox="0 0 16 16">
                    <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
              </svg>
              <h3 className='mt-1 '>Thank You !</h3>
              <p className='mt-4 font-bold'>Your payment ${plan_amount} has been succesfully done</p>
            </div>
           
      </PaymentPopupModal> */}

      <ToastContainer/>
    </div>

    
    
 
  )
}