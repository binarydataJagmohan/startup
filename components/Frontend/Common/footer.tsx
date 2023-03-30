import React from 'react'

const footer = () => {
  return (
    <div>
      <section className="footer-section pt-100 pb-70" id="footer-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <div className="footer-heading">
                                <h3>About Us</h3>
                            </div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
                            <ul className="footer-social">
                                <li>
                                    <a href="#">
                                        <i className="flaticon-facebook"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="flaticon-twitter"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="flaticon-pinterest"></i>
                                    </a>
                                </li>

                                <li>
                                    <a href="#">
                                        <i className="flaticon-instagram"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <div className="footer-heading">
                                <h3>Important Links</h3>
                            </div>

                            <ul className="footer-quick-links">
                                <li>
                                    <a href="about.html">About Us</a>
                                </li>
                                <li>
                                    <a href="projects-1.html">Project</a>
                                </li>
                                <li>
                                    <a href="services-1.html">Services</a>
                                </li>
                                <li>
                                    <a href="blog-1.html">Blog</a>
                                </li>
                                <li>
                                    <a href="contact.html">Contact</a>
                                </li>
                            </ul>
                        </div>    
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <div className="footer-heading">
                                <h3>Featured Service</h3>
                            </div>
                            <ul className="footer-quick-links">
                                <li>
                                    <a href="#">IT Management</a>
                                </li>
                                <li>
                                    <a href="#">Development</a>
                                </li>
                                <li>
                                    <a href="services-1.html">Services</a>
                                </li>
                                <li>
                                    <a href="#">UI/UX Design</a>
                                </li>
                                <li>
                                    <a href="#">Support Engineer</a>
                                </li>
                            </ul>
                        </div>    
                    </div>

                    <div className="col-lg-3 col-md-6 col-sm-6">
                        <div className="single-footer-widget">
                            <div className="footer-heading">
                                <h3>Contact</h3>
                            </div>

                            <div className="footer-info-contact">
                                <i className="flaticon-phone-call"></i>
                                <h3>Phone</h3>
                                <span><a href="tel:+882-569-756">+123(456)123</a></span>
                            </div>

                            <div className="footer-info-contact">
                                <i className="flaticon-envelope"></i>
                                <h3>Email</h3>
                                <span><a href="/cdn-cgi/l/email-protection#86eee3eaeae9c6e0f4efe7a8e5e9eb"><span className="__cf_email__" data-cfemail="432b262f2f2c0325312a226d202c2e">[email&#160;protected]</span></a></span>
                            </div>

                            <div className="footer-info-contact">
                                <i className="flaticon-pin"></i>
                                <h3>Address</h3>
                                <span>32 st Kilda Road, Melbourne VIC, 3004 Australia</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default footer
