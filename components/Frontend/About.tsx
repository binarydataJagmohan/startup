import React from "react";
import FrequentlyQuestions from "./FrequentlyQuestions";
import Link from 'next/link';
import Image from 'next/image';
const About = () => {
  return (
    <div>
      <div>
        {/* Start Page Title Area */}
        <div className="page-title-area item-bg-1">
          <div className="d-table">
            <div className="d-table-cell">
              <div className="container">
                <div className="page-title-content">
                  <h2>About</h2>
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li>About</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Page Title Area */}
        {/* Start About Area */}
        <section className="about-section ptb-100">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 p-0">
                <div className="about-image">
                  <Image src="assets/img/about/aboust-2.jpg" alt="image" width={1000} height={1000} layout="responsive"/>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-tab">
                  <h2>About Our Agency</h2>
                  <div className="bar" />
                  <p>
                    <b>Welcome to our startup and investment website!</b> We are a team of passionate professionals dedicated to helping people make informed decisions about their investments. Our platform provides you with the tools and resources you need to take control of your financial future.
                  </p>
                  <div className="tab about-list-tab">
                    <ul className="tabs">
                      <li>
                        <Link href="#">Our History</Link>
                      </li>
                      <li>
                        <Link href="#">Our Mission</Link>
                      </li>
                      <li>
                        <Link href="#">Friendly Support</Link>
                      </li>
                    </ul>
                    <div className="tab_content">
                      <div className="tabs_item">
                        <p>
                          <b>Our startup and investment</b> website was founded in [year] with a mission to revolutionize the way people invest their money. Our team of financial experts and technology enthusiasts recognized the need for a platform that provides everyone with the ability to make informed investment decisions, regardless of their financial knowledge or experience.

                          Over the years, we have grown into a trusted resource for investors around the world. With our commitment to transparency, security, and user-friendliness, we have earned a reputation as one of the most reliable investment platforms on the market.
                        </p>
                        <Link className="default-btn" href="#">
                          Discover More
                        </Link>
                      </div>
                      <div className="tabs_item">
                        <p>
                          <b>Our mission</b> is to empower individuals to take control of their financial future by providing them with the knowledge, tools, and resources they need to make informed investment decisions. We believe that everyone should have access to the same opportunities and information, regardless of their financial status, and we are committed to creating a platform that levels the playing field.

                          Our team of experienced professionals is dedicated to helping our users achieve their financial goals. We are constantly innovating and improving our platform to ensure that it remains the best resource for anyone who wants to invest wisely and confidently.
                        </p>
                        <Link className="default-btn" href="#">
                          Discover More
                        </Link>
                      </div>
                      <div className="tabs_item">
                        <p>
                          <b>At our startup and investment</b> website, we pride ourselves on providing friendly and helpful support to our users. Whether you have a question about your account, need help navigating the platform, or want to learn more about investing, our team is here to assist you.

                          We understand that investing can be intimidating, which is why we take a personalized approach to support. Our team of experts is always available to answer your questions, provide guidance, and help you make the most of our platform. Whether you are a beginner or a seasoned investor, you can count on us to provide the support you need to succeed.
                        </p>
                        <Link className="default-btn" href="#">
                          Discover More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End About Area */}
        {/* Start Team Area */}
        <section className="team-section pb-70">
          <div className="container">
            <div className="section-title">
              <h2>Our <span> Expert </span> Team</h2>
              <p>
                <b>At our startup and investment website</b> , we are proud to have assembled a team of experts with decades of combined experience in the financial industry. Our team includes professionals from a range of backgrounds, including finance, economics, technology, and more.
              </p>
              <div className="bar" />
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="team-item">
                  <div className="image">                    
                    <Image  src="assets/img/team/1.jpg" alt="image"  width={356} height={478} />
                    <ul className="social">
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-linkedin" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="content">
                    <h3>Alex Maxwel</h3>
                    <span>Founder</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6">
                <div className="team-item">
                  <div className="image">                  
                    <Image src="assets/img/team/2.jpg" alt="image" width={356} height={478} />
                    <ul className="social">
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-linkedin" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="content">
                    <h3>Williams Halimton</h3>
                    <span>Manager</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-0 offset-md-3">
                <div className="team-item">
                  <div className="image">                    
                    <Image src="assets/img/team/3.jpg" alt="image" width={356} height={478} />
                    <ul className="social">
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-facebook" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-twitter" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-linkedin" />
                        </Link>
                      </li>
                      <li>
                        <Link href="#" target="_blank">
                          <i className="bx bxl-instagram" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="content">
                    <h3>Juhon Dew</h3>
                    <span>CEO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="default-shape">
            <div className="shape-1">
            <Image src="assets/img/shape/4.png" alt="image" width={15} height={15}/>
            </div>
            <div className="shape-2 rotateme">
            <Image src="assets/img/shape/5.svg" alt="image" width={22} height={22}/>
            </div>
            <div className="shape-3">
            <Image src="assets/img/shape/6.svg" alt="image" width={21} height={20}/>
            </div>
            <div className="shape-4">
            <Image src="assets/img/shape/7.png" alt="image" width={18} height={18}/>
            </div>
            <div className="shape-5">
            <Image src="assets/img/shape/8.png" alt="image" width={12} height={12}/>
            </div>
          </div>
        </section>
        {/* End Team Area */}
        {/* Start Faq Area */}
        <FrequentlyQuestions />
        {/* End Faq Area */}
        {/* Start Clients Area */}
        <section className="clients-section pb-100">
          <div className="container">
            <div className="section-title">
              <h2>What Clients Say About Us</h2>
              <p>
                We are grateful for the feedback we receive from our clients and are committed to continuing to provide the highest level of service and support. If you are looking for a reliable and trustworthy platform to help you achieve your financial goals, we invite you to join our community of satisfied clients today.
              </p>
              <div className="bar" />
            </div>
            <div className="clients-slider owl-carousel owl-theme">
              <div className="clients-item">
                <div className="icon">
                  <i className="flaticon-left-quotes-sign" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s, when an unknown printer took a galley
                </p>
                <div className="clients-content">
                  <h3>Moris Jacker</h3>
                  <span>Web Developer</span>
                </div>
              </div>
              <div className="clients-item">
                <div className="icon">
                  <i className="flaticon-left-quotes-sign" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s, when an unknown printer took a galley
                </p>
                <div className="clients-content">
                  <h3>Alex Maxwel</h3>
                  <span>Agent Management</span>
                </div>
              </div>
              <div className="clients-item">
                <div className="icon">
                  <i className="flaticon-left-quotes-sign" />
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Quis ipsum suspendisse ultrices gravida. Risus commodo viverra
                  maecenas accumsan lacus vel facilisis. Lorem Ipsum is simply
                  dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since
                  the 1500s, when an unknown printer took a galley
                </p>
                <div className="clients-content">
                  <h3>Edmond Halley</h3>
                  <span>Web Designer</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End Clients Area */}
      </div>
    </div>
  );
};

export default About;