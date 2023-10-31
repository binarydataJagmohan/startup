import React from "react";
import FrequentlyQuestions from "./FrequentlyQuestions";
import Link from "next/link";
import Image from "next/image";
const About = () => {
  return (
    <div>
      <div>
        {/* Start Page Title Area */}
        {/* <div className="page-title-area item-bg-1">
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
        </div> */}
        {/* End Page Title Area */}
        {/* Start About Area */}
        <section className="about-section ptb-100 pb-0">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 p-0">
                <div className="about-image">
                  <Image
                    src="https://img.freepik.com/free-photo/creative-designers-team-working-project-discussing-details_114579-2816.jpg?w=1380&t=st=1698054740~exp=1698055340~hmac=466d1b4da92b55444119b1f9a607282bb0640700a62e4369b36a9ed00846d569"
                    alt="image"
                    width={1000}
                    height={1000}
                    // layout="responsive"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-tab" style={{ paddingTop: "0px" }}>
                  <h2>About Our Company</h2>
                  <div className="bar" />
                  <p>
                    At RisingCapitalist, we believe that everyone should have
                    the opportunity to invest in startups. That's why we've
                    created an online platform that makes it easy for investors
                    to find and invest in startups with high growth potential.
                  </p>
                  <p>
                    We also believe that startups are the key to economic growth
                    and innovation. That's why we're committed to helping
                    startups raise the funds they need to succeed.
                  </p>
                  <p>
                    Our mission is to empower startups and investors by
                    providing a dynamic online platform that not only connects
                    visionaries with capital but also equips entrepreneurs with
                    the essential financial and legal services they need to
                    thrive. We are dedicated to fuelling innovation, fostering
                    growth, and making the journey of fundraising more
                    accessible and successful for startups.
                  </p>
                  <div className="tab about-list-tab">
                    <ul className="tabs">
                      <li>
                        <Link href="#">Our Commitment:</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section startup */}
        <section className="pb-70 pt-70 facilitating-startup">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="tab_content">
                  <div className="tabs_item">
                    <p>
                      <b>1. Facilitating Connections: </b> We are committed to
                      creating a vibrant digital ecosystem where startups can
                      meet investors, where ideas can find support, and where
                      dreams can become reality. We strive to bridge the gap
                      between brilliant concepts and the resources required to
                      bring them to life.
                    </p>
                    <p>
                      <b>2. Empowering Entrepreneurs: </b> We believe in the
                      potential of startups to drive change. Our CFO services
                      empower startups with financial expertise, while our legal
                      services secure their fundraising endeavours. The addition
                      of "Invoice Discounting" further strengthens our financial
                      support by offering cash flow solutions that help startups
                      maintain stability.
                    </p>
                    <p>
                      <b>3. Simplifying Fundraising: </b> We aim to simplify the
                      fundraising process, making it more accessible and less
                      intimidating. Our platform provides a user-friendly
                      experience that allows startups to focus on their
                      innovation, and investors to discover promising
                      opportunities effortlessly.
                    </p>
                    <p>
                      <b>4. Fostering Innovation: </b> Our passion lies in
                      nurturing innovation. We are driven to foster a community
                      of innovators, thinkers, and doers who are shaping the
                      future. We take pride in being an essential part of their
                      journey.
                    </p>
                    <Link className="default-btn" href="#">
                      Discover More
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 textlg-end tab_content">
                <img src="assets/images/app.png" alt="" />
              </div>
            </div>
          </div>
        </section>

        {/* end this */}
        {/* End About Area */}
        {/* Start Team Area */}
        <section className="team-section pb-70">
          <div className="container">
            <div className="section-title">
              <h2>
                Our <span> Expert </span> Team
              </h2>
              {/* <p>
                <b>At our startup and investment website</b> , we are proud to
                have assembled a team of experts with decades of combined
                experience in the financial industry. Our team includes
                professionals from a range of backgrounds, including finance,
                economics, technology, and more.
              </p> */}
              <div className="bar" />
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="team-item">
                  <div className="image">
                    {/* <img
                      src="https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGhhcHB5JTIwY2xpZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    /> */}
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "assets/images/anjul-gupta.png?auto=format&fit=crop&w=500&q=60"
                      }
                      alt="image"
                    />
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
                  <div className="content d-flex justify-content-between">
                    <h3>Anjul Gupta</h3>
                    <span>CFA (Co-Founder and CEO)</span>
                  </div>
                  <div className="content" style={{ textAlign: "left" }}>
                    <p>
                      Anjul is a CFA charterholder and an MBA in Finance. He
                      specializes in Business Valuation and an alumnus of
                      Deloitte and Duff & Phelps. Currently, he oversees the
                      business’s overall operations and strategy.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className="team-item">
                  <div className="image">
                    {/* <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGhhcHB5JTIwY2xpZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    /> */}
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BASE_URL +
                        "assets/images/megha-agarwal.png?auto=format&fit=crop&w=500&q=60"
                      }
                      alt="image"
                    />
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
                  <div className="content d-flex justify-content-between">
                    <h3>CA Megha Agarwal</h3>
                    <span>(Co-Founder and CFO)</span>
                  </div>
                  <div className="content" style={{ textAlign: "left" }}>
                    <p>
                      CA Megha Agarwal is Fellow Member of Institute of
                      Chartered Accountants of India. She has 19 years of
                      experience of CA Practice in the area of Direct & Indirect
                      Taxation and Auditing. She oversees the finance &
                      operations functions in the Company.
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-4 col-md-6 col-sm-6 offset-lg-0 offset-md-3">
                <div className="team-item">
                  <div className="image">
                    <img
                      src="https://images.unsplash.com/photo-1550682290-d071c75759f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhhcHB5JTIwY2xpZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
                      alt="image"
                    />
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
                  <div className="content d-flex justify-content-between">
                    <h3>Juhon Dew</h3>
                    <span>CEO</span>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="default-shape">
            <div className="shape-1">
              <Image
                src="assets/img/shape/4.png"
                alt="image"
                width={15}
                height={15}
              />
            </div>
            <div className="shape-2 rotateme">
              <Image
                src="assets/img/shape/5.svg"
                alt="image"
                width={22}
                height={22}
              />
            </div>
            <div className="shape-3">
              <Image
                src="assets/img/shape/6.svg"
                alt="image"
                width={21}
                height={20}
              />
            </div>
            <div className="shape-4">
              <Image
                src="assets/img/shape/7.png"
                alt="image"
                width={18}
                height={18}
              />
            </div>
            <div className="shape-5">
              <Image
                src="assets/img/shape/8.png"
                alt="image"
                width={12}
                height={12}
              />
            </div>
          </div>
        </section>
        {/* End Team Area */}
        {/* Start Faq Area */}
        {/* <FrequentlyQuestions /> */}
        {/* End Faq Area */}
        {/* Start Clients Area */}
        {/* <section className="clients-section pb-100">
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
        </section> */}
        {/* End Clients Area */}
      </div>
    </div>
  );
};

export default About;
