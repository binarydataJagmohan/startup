import React, { useState, useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { saveContact } from '../../lib/frontendapi';
import { useForm } from 'react-hook-form';


const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const SubmitForm = () => {

    //e.preventDefault();
    const logindata = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    }
    saveContact(logindata)
      .then(res => {
        if (res.status == true) {
          toast.success("Contact has been submitted succesfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 'success'
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);

        } else {
          toast.error("Contact has been not submitted succesfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: 'error'
          });
        }
      })
      .catch(err => {
        toast.error("Contact has been not submitted succesfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: 'error'
        });
      });
  }
  return (
    <div>
      <div>
        {/* Start Page Title Area */}
        <div className="page-title-area item-bg-5">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="page-title-content">
                  <h2>Contact</h2>
                  <ul>
                    <li>
                      <a href="/">Home</a>
                    </li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Page Title Area */}
        {/* Start Contact Box Area */}
        <section className="contact-box pt-100 pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-contact-box">
                  <i className="flaticon-pin" />
                  <div className="content-title">
                    <h3>Address</h3>
                    <p>32 st Kilda Road, Melbourne VIC, 3004 Australia</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-contact-box">
                  <i className="flaticon-envelope" />
                  <div className="content-title">
                    <h3>Email</h3>
                    <span><a href="mailto:example@gmail.com" style={{color:"black"}}><p>example@gmail.com</p></a></span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 offset-md-3 offset-lg-0">
                <div className="single-contact-box">
                  <i className="flaticon-phone-call" />
                  <div className="content-title">
                    <h3>Phone</h3>
                    <a href="tel:123456123" style={{color:"black"}}><p>+123(456)123</p></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Box Area */}
        {/* Start Contact Area */}
        <section className="contact-section pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="contact-text">
                  <h3>Have Any Questions About Us?</h3>
                  <p>
                    If you have any questions or concerns about our company or services, please don't hesitate to contact us. Our team is dedicated to providing the best support and assistance possible to ensure your satisfaction.
                  </p>
                </div>
                <div className="contact-form">
                  <form id="contactForm" onSubmit={handleSubmit(SubmitForm)}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        {...register('name', { onChange: (e) => setName(e.target.value), required: true })}
                      />
                      {errors.name && errors.name.type === 'required' && <p className="text-danger" style={{ "textAlign": "left" }}>please enter your name.</p>}
                    </div>
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Your Email"
                        {...register('email', { onChange: (e) => setEmail(e.target.value), required: true })}
                      />
                      {errors.email && errors.email.type === 'required' && <p className="text-danger" style={{ "textAlign": "left" }}>please enter your email.</p>}
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        placeholder="Your Subject"
                        {...register('subject', { onChange: (e) => setSubject(e.target.value), required: true })}
                      />
                      {errors.subject && errors.subject.type === 'required' && <p className="text-danger" style={{ "textAlign": "left" }}>please enter your subject.</p>}
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        cols={30}
                        rows={6}
                        placeholder="Your Message"
                        {...register('message', { onChange: (e) => setMessage(e.target.value), required: true })}
                      />
                      {errors.message && errors.message.type === 'required' && <p className="text-danger" style={{ "textAlign": "left" }}>please enter your message.</p>}
                    </div>
                    <div className="send-btn">
                      <button className="default-btn">
                        Send Message
                      </button>
                      <div id="msgSubmit" className="h3 text-center hidden" />
                      <div className="clearfix" />
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="contact-image">
                  <img src="assets/img/contact.png" alt="image" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Contact Area */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Contact;
