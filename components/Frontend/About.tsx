import React from "react";
import Link from "next/link";
import Image from "next/image";
const About = () => {
  return (
    <>
      <div>
        {/*========== About Section Start ==============*/}
        <section id="about" className="tj-about-section pt-100 mt-5 pb-100">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="about-group-image">
                  <Image
                    className="image shake-y"
                    src="assets/images/about/about-33.jpg"
                    alt="Image"
                    height={636}
                    width={622}
                  />
                  <Image
                    className="shape-one pulse"
                    src="assets/images/about/about-2.png"
                    alt="Image"
                    height={160}
                    width={160}
                  />
                  <Image
                    className="shape-two pulse"
                    src="assets/images/about/about-3.png"
                    alt="Image"
                    height={230}
                    width={140}
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
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*========== About Section End ==============*/}
        {/*========== Progress Section Start ==============*/}
        <section className="team-section pt-100 mt-5 pb-100">
          <div className="container">
            <div className="about-tab mx-0">
              <h2>Our Commitment:</h2>
              <div className="bar" />
            </div>
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
                    <a className="tj-primary-btn" href="/contact">Contact</a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-group-image">
                  <Image
                    className="image shake-y"
                    src="assets/images/about/about-44.jpg"
                    alt="Image"
                    height={636}
                    width={622}
                  />
                  <Image
                    className="shape-one pulse"
                    src="assets/images/about/about-2.png"
                    alt="Image"
                    height={160}
                    width={160}
                  />
                  <Image
                    className="shape-two pulse"
                    src="assets/images/about/about-3.png"
                    alt="Image"
                    height={230}
                    width={140}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*========== Progress Section End ==============*/}
      </div>
      <section className="pt-100 pb-100">
        <div className="container">
          <div className="section-title">
            <h2>
              Our <span> Expert </span> Team
            </h2>
            <div className="bar" />
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="team-item">
                <div className="image">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "assets/images/anjul-gupta.png?auto=format&fit=crop&w=500&q=60"
                    }
                    alt="image"
                    height={400}
                    width={636}
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
                    specializes in Business Valuation and an alumnus of Deloitte
                    and Duff & Phelps. Currently, he oversees the business’s
                    overall operations and strategy.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6">
              <div className="team-item">
                <div className="image">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "assets/images/megha-agarwal.png?auto=format&fit=crop&w=500&q=60"
                    }
                    alt="image"
                    width={636}
                    height={400}
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
                    CA Megha Agarwal is Fellow Member of Institute of Chartered
                    Accountants of India. She has 19 years of experience of CA
                    Practice in the area of Direct & Indirect Taxation and
                    Auditing. She oversees the finance & operations functions in
                    the Company.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="default-shape">
          <div className="shape-1">
            <Image
              src="assets/images/shape/4.png"
              alt="image"
              width={15}
              height={15}
            />
          </div>
          <div className="shape-2 rotateme">
            <Image
              src="assets/images/shape/5.svg"
              alt="image"
              width={22}
              height={22}
            />
          </div>
          <div className="shape-3">
            <Image
              src="assets/images/shape/6.svg"
              alt="image"
              width={21}
              height={20}
            />
          </div>
          <div className="shape-4">
            <Image
              src="assets/images/shape/7.png"
              alt="image"
              width={18}
              height={18}
            />
          </div>
          <div className="shape-5">
            <Image
              src="assets/images/shape/8.png"
              alt="image"
              width={12}
              height={12}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
