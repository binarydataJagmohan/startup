import React from 'react'

export default function Header()
{
  return(
    <>
       <div className="navbar-area">
        <div className="fria-responsive-nav">
          <div className="container">
            <div className="fria-responsive-menu">
              <div className="logo">
                <a href="/index">
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                    className="black-logo"
                    alt="image"
                  />
                  <img
                    src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo-2.png"}
                    className="white-logo"
                    alt="image"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="fria-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <a className="navbar-brand" href="index.html">
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo.png"}
                  className="black-logo"
                  alt="image"
                />
                <img
                  src={process.env.NEXT_PUBLIC_BASE_URL + "assets/img/logo-2.png"}
                  className="white-logo"
                  alt="image"
                />
              </a>
              <div
                className="collapse navbar-collapse mean-menu"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a href="/index" className="nav-link active">
                      Home
                    </a>
                    </li>
                    <li className="nav-item">
                      <a href="/about" className="nav-link">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Services 
                        <i className="bx bx-chevron-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="services-1.html" className="nav-link">
                            Services
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="services-2.html" className="nav-link">
                            Services Two
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="single-services.html" className="nav-link">
                            Services Details
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Projects 
                        <i className="bx bx-chevron-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="projects-1.html" className="nav-link">
                            Projects One
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="projects-2.html" className="nav-link">
                            Projects Two
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="single-projects.html" className="nav-link">
                            Projects details
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Pages 
                        <i className="bx bx-chevron-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="about.html" className="nav-link">
                            About
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="team.html" className="nav-link">
                            Team
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="pricing.html" className="nav-link">
                            Pricing
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="faq.html" className="nav-link">
                            FAQ
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="#" className="nav-link">
                            User 
                          </a>
                          <ul className="dropdown-menu">
                            <li className="nav-item">
                              <a href="log-in.html" className="nav-link">
                                Log In
                              </a>
                            </li>
                            <li className="nav-item">
                              <a href="sign-up.html" className="nav-link">
                                Sign Up
                              </a>
                            </li>
                          </ul>
                        </li>
                        <li className="nav-item">
                          <a href="terms-condition.html" className="nav-link">
                            Terms &amp; Conditions
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="privacy-policy.html" className="nav-link">
                            Privacy Policy
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="error-404.html" className="nav-link">
                            404 Error
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="coming-soon.html" className="nav-link">
                            Coming Soon
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="/contact" className="nav-link">
                            Contact
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        Blog 
                        <i className="bx bx-chevron-down" />
                      </a>
                      <ul className="dropdown-menu">
                        <li className="nav-item">
                          <a href="blog-1.html" className="nav-link">
                            Blog Grid
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="blog-2.html" className="nav-link">
                            Blog Right Sidebar
                          </a>
                        </li>
                        <li className="nav-item">
                          <a href="single-blog.html" className="nav-link">
                            Blog Details
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a href="/contact" className="nav-link">
                        Contact
                      </a>
                    </li>
                  </ul>
                  <div className="others-options">
                    <div className="option-item">
                      <i className="search-btn flaticon-search" />
                      <i className="close-btn flaticon-cancel" />
                      <div className="search-overlay search-popup">
                        <div className="search-box">
                          <form className="search-form">
                            <input className="search-input" name="search" placeholder="Search" type="text" />
                            <button className="search-button" type="submit">
                              <i className="flaticon-search" />
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="burger-menu">
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
       
       
         <div className="sidebar-modal">
          <div className="sidebar-modal-inner">
            <div className="sidebar-about-area">
              <div className="title">
                <h2>About Us</h2>
                <p>We believe brand interaction is key in communication. Real innovations and a positive customer experience are the heart of successful communication. No fake products and services. The customer is king, their lives and needs are the inspiration.</p>
              </div>
            </div>
            <div className="sidebar-contact-feed">
              <h2>Contact</h2>
              <div className="contact-form">
                <form id="contactForm">
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input type="text" name="name" id="name" className="form-control" required data-error="Please enter your name" placeholder="Your Name" />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input type="email" name="email" id="email" className="form-control" required data-error="Please enter your email" placeholder="Your Email" />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input type="text" name="phone_number" id="phone_number" required data-error="Please enter your number" className="form-control" placeholder="Your Phone" />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input type="text" name="msg_subject" id="msg_subject" className="form-control" required data-error="Please enter your subject" placeholder="Your Subject" />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <textarea name="message" className="form-control" id="message" cols={30} rows={6} required data-error="Write your message" placeholder="Your Message" defaultValue={""} />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="send-btn">
                        <button type="submit" className="send-btn-one">
                          Send Message
                        </button>
                        <div id="msgSubmit" className="h3 text-center hidden" />
                        <div className="clearfix" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="sidebar-contact-area">
              <div className="contact-info">
                <div className="contact-info-content">
                  <h2>
                    <a href="tel:+0881306298615">
                      +088 130 629 8615
                    </a>
                    <span>OR</span>
                    <a href="/cdn-cgi/l/email-protection#1f796d767e5f78727e7673317c7072">
                      <span className="__cf_email__" data-cfemail="5c3a2e353d1c3b313d3530723f3331">[email&nbsp;protected]</span>
                    </a>
                  </h2>
                  <ul className="social">
                    <li>
                      <a href="#" target="_blank">
                        <i className="flaticon-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="flaticon-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="flaticon-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#" target="_blank">
                        <i className="flaticon-pinterest" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <span className="close-btn sidebar-modal-close-btn">
              <i className="flaticon-cancel" />
            </span>
          </div>
        </div> 
    </>
  )
}