import Link from "next/link";
import React, { useEffect, useState } from "react";
export default function dummy() {
  const [activeLink, setActiveLink] = useState("active");

  const handleClick = (link: any) => {
    setActiveLink(link);
  };
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Adjust the scroll threshold as needed
      const threshold = 1000;

      setIsSticky(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <section className="mainPageSection">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="ContentSection">
                <h1>
                  Invest in Startups &amp; <br />
                  Grow Your Wealth
                </h1>
                <p>
                  A leading online platform that connects investors and founders
                  to help startups raise funds.
                </p>
                <div className="ContentSection d-lg-flex align-items-lg-center">
                  <Link
                    //   href={process.env.NEXT_PUBLIC_BASE_URL + "company/thank-you"}
                    href="#"
                    className="default-btn"
                  >
                    Invest
                  </Link>
                  <p className="mx-lg-2 m-0">
                    Minimum Investment:
                    <strong>$250</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="acceptingInvestments single-footer-widget m-0">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="investmentss">
                <span>Security Offered</span>
                <h2>Convertible Note</h2>
                <ul className="footer-social">
                  <li>
                    <Link href="https://www.facebook.com/">
                      <i className="flaticon-facebook"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://twitter.com/">
                      <i className="flaticon-twitter"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://in.pinterest.com/">
                      <i className="flaticon-pinterest"></i>
                    </Link>
                  </li>

                  <li>
                    <Link href="https://www.instagram.com/">
                      <i className="flaticon-instagram"></i>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="investments text-center">
                <h2>Accepting Investments</h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="investmentss text-center">
                <h2>$137,487</h2>
                <span>Raised from 180 investors</span>
              </div>
            </div>
          </div>
          <div className="py-5 developmentInvest">
            <div className="development-content">
              <div className="icon mb-3">
                <i
                  className="flaticon-tick"
                  style={{
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#088395",
                  }}
                />
              </div>
              <p>
                Raise funds from investors in the form of preferred shares or
                debentures
              </p>
            </div>
            <div className="development-content">
              <div className="icon bg-05dbcf">
                <i
                  className="flaticon-tick"
                  style={{
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#088395",
                  }}
                />
              </div>
              <p>Working capital funding through invoice discounting</p>
            </div>
            <div className="development-content">
              <div className="icon bg-fec66f">
                <i
                  className="flaticon-tick"
                  style={{
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#088395",
                  }}
                />
              </div>
              <p>
                CFO services including financial planning and analysis,
                financials, and tax compliance
              </p>
            </div>
            <div className="development-content">
              <div className="icon bg-fec66f">
                <i
                  className="flaticon-tick"
                  style={{
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#088395",
                  }}
                />
              </div>
              <p>
                Legal assistance with a variety of matters, such as drafting and
                negotiating contracts, shareholder agreement, reviewing term
                sheets, and complying with regulatory requirements
              </p>
            </div>
            <div className="development-content">
              <div className="icon bg-fec66f">
                <i
                  className="flaticon-tick"
                  style={{
                    width: "30px",
                    height: "30px",
                    lineHeight: "30px",
                    fontSize: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#088395",
                  }}
                />
              </div>
              <p>Registered valuer and merchant banker valuation reports</p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`investMentAll p-3 ${isSticky ? "sticky" : ""}`}
        style={{ zIndex: 100 }}
      >
        <div className="container">
          <div className="menuItems">
            <ul className="menuUrl">
              <li
                className={`items ${
                  activeLink === "documents" ? "active" : ""
                }`}
              >
                <a
                  href="#documents"
                  className="link"
                  onClick={() => handleClick("documents")}
                >
                  Documents
                </a>
              </li>
              <li className={`items ${activeLink === "terms" ? "active" : ""}`}>
                <a
                  href="#terms"
                  className="link"
                  onClick={() => handleClick("terms")}
                >
                  Terms
                </a>
              </li>
              <li
                className={`items ${activeLink === "overview" ? "active" : ""}`}
              >
                <a
                  href="#overview"
                  className="link"
                  onClick={() => handleClick("overview")}
                >
                  Overview
                </a>
              </li>
              <li
                className={`items ${activeLink === "industry" ? "active" : ""}`}
              >
                <a
                  href="#industry"
                  className="link"
                  onClick={() => handleClick("industry")}
                >
                  Industry
                </a>
              </li>
              <li className={`items ${activeLink === "team" ? "active" : ""}`}>
                <a
                  href="#team"
                  className="link"
                  onClick={() => handleClick("team")}
                >
                  Team
                </a>
              </li>
              <li
                className={`items ${
                  activeLink === "competitors" ? "active" : ""
                }`}
              >
                <a
                  href="#competitors"
                  className="link"
                  onClick={() => handleClick("competitors")}
                >
                  Competitors
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="tabsSection">
        <div className="container">
          <h2 className="text-black">Why It's Interesting</h2>
          <p>
            Facilitating Connections: We are committed to creating a vibrant
            digital ecosystem where startups can meet investors, where ideas can
            find support, and where dreams can become reality. We strive to
            bridge the gap between brilliant concepts and the resources required
            to bring them to life.
          </p>
          <p>
            {" "}
            Empowering Entrepreneurs: We believe in the potential of startups to
            drive change. Our CFO services empower startups with financial
            expertise, while our legal services secure their fundraising
            endeavours. The addition of "Invoice Discounting" further
            strengthens our financial support by offering cash flow solutions
            that help startups maintain stability.
          </p>
        </div>
      </section>

      <section id="documents" className="py-lg-5">
        <div className="container">
          <h1 className="text-center pb-4 bold">Documents</h1>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="row py-3 g-3">
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Company Summary</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Crowd Note</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Offering Statement</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="documentsTitle">
                    <div className="circleSvg">
                      <img src="/assets/img/Vector.svg" alt="" />
                    </div>
                    <p>Solubag Form C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="terms">
        <div className="container">
          <h1 className="text-center pb-4 text-white bold">Terms</h1>
          <div className="termsContent">
            <div className="row">
              <h1> Investment Terms</h1>
              <p>
                <strong>Security Type:</strong> Crowd Notes
              </p>

              <p>
                <strong>Round Size:</strong>Min: $25,000 Max: $1,235,000
              </p>

              <p>
                <strong>Valuation Cap:</strong> $50 million
              </p>

              <p>
                <strong>Conversion Provisions:</strong> In connection with
                equity financing of at least $1 million, the Company has the
                option to convert the Crowd Note into non-voting preferred stock
                (Conversion Shares) at a price based on the lower of (A) the
                price per share for Preferred Stock by investors in the
                Qualified Equity Financing or (B) the price per share paid on a
                $50 million valuation cap. Please refer to the Crowd Note for a
                complete description of the terms of the Crowd Note, including
                the conversion provisions.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section id="overview" className="tabsSection">
        <div className="container">
          <h1 className="text-center bold">Overview</h1>
          <div className="overviewContent">
            <div className="row">
              <h2 className="text-black">Opportunity</h2>
              <p>
                Simplifying Fundraising: We aim to simplify the fundraising
                process, making it more accessible and less intimidating. Our
                platform provides a user-friendly experience that allows
                startups to focus on their innovation, and investors to discover
                promising opportunities effortlessly.s
              </p>

              <p>
                Fostering Innovation: Our passion lies in nurturing innovation.
                We are driven to foster a community of innovators, thinkers, and
                doers who are shaping the future. We take pride in being an
                essential part of their journey.
              </p>

              <p>
                Empowering Entrepreneurs: We believe in the potential of
                startups to drive change. Our CFO services empower startups with
                financial expertise, while our legal services secure their
                fundraising endeavours. The addition of "Invoice Discounting"
                further strengthens our financial support by offering cash flow
                solutions that help startups maintain stability.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="industry" className="tabsSection">
        <div className="container">
          <h1 className="text-left py-3 bold">Industry</h1>
          <div className="row">
            <div className="col-lg-6">
              <div className="industryContent">
                <div className="row">
                  <h3 className="text-white">Facilitating Connections</h3>
                  <p className="text-white">
                    We are committed to creating a vibrant digital ecosystem
                    where startups can meet investors, where ideas can find
                    support, and where dreams can become reality. We strive to
                    bridge the gap between brilliant concepts and the resources
                    required to bring them to life.
                  </p>

                  <p className="text-white">
                    Fostering Innovation: Our passion lies in nurturing
                    innovation. We are driven to foster a community of
                    innovators, thinkers, and doers who are shaping the future.
                    We take pride in being an essential part of their journey.
                  </p>

                  <p className="text-white">
                    Empowering Entrepreneurs: We believe in the potential of
                    startups to drive change. Our CFO services empower startups
                    with financial expertise, while our legal services secure
                    their fundraising endeavours. The addition of "Invoice
                    Discounting" further strengthens our financial support by
                    offering cash flow solutions that help startups maintain
                    stability.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 order-lg-0 order-first">
              <img
                src="assets/img/removetext.png"
                alt=""
                className="hover-img"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="competitors" className="tabsSection">
        <div className="container">
          <h1 className="text-center mb-5 bold">Competitors</h1>
          <div className="competitorsContent">
            <div className="row align-items-center g-3">
              <div className="col-lg-6">
                <div className="competitorsContentTitle">
                    <h4><strong>Invisible Company</strong></h4>
                  <p>
                    Simplifying Fundraising: We aim to simplify the fundraising
                    process, making it more accessible and less intimidating.
                    Our platform provides a user-friendly experience that allows
                    startups to focus on their innovation, and investors to
                    discover promising opportunities effortlessly.s
                  </p>
                  <p>
                    Empowering Entrepreneurs: We believe in the potential of
                    startups to drive change. Our CFO services empower startups
                    with financial expertise, while our legal services secure
                    their fundraising endeavours. The addition of "Invoice
                    Discounting" further strengthens our financial support by
                    offering cash flow solutions that help startups maintain
                    stability.
                  </p>
                </div>
              </div>
              <div className="col-lg-6 order-lg-0 order-first">
                <div className="competitorsContentTitle">
                  <img
                    src="https://static.microventures.com/img/offerings/2cccf7cbe2a4ccfb477d5e853d2ab1c4.webp"
                    alt=""
                    className="hover-img"
                  />
                </div>
              </div>
            </div>
            <div className="row align-items-center g-3 py-lg-5 pt-5">
              <div className="col-lg-6">
                <div className="competitorsContent">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPp0nZM4ajF83I68Udw5IdeUAA4kxjogHXpqzZGkmCusMmrRQC3L-syvRK2Wes7mW3r2A&usqp=CAU"
                    alt=""
                    className="hover-img"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="competitorsContentTitle">
                <h4><strong>MonoSol</strong></h4>
                  <p>
                    Simplifying Fundraising: We aim to simplify the fundraising
                    process, making it more accessible and less intimidating.
                    Our platform provides a user-friendly experience that allows
                    startups to focus on their innovation, and investors to
                    discover promising opportunities effortlessly.s
                  </p>
                  <p>
                    Empowering Entrepreneurs: We believe in the potential of
                    startups to drive change. Our CFO services empower startups
                    with financial expertise, while our legal services secure
                    their fundraising endeavours. The addition of "Invoice
                    Discounting" further strengthens our financial support by
                    offering cash flow solutions that help startups maintain
                    stability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="pt-100 pb-100">
        <div className="container">
          <div className="section-title">
            <h2>Team</h2>
            <div className="bar" />
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="team-item">
                    <div className="image">
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
                    <div className="content pt-0" style={{ textAlign: "left" }}>
                      <p>
                        Anjul is a CFA charterholder and an MBA in Finance. He
                        specializes in Business Valuation and an alumnus of
                        Deloitte and Duff & Phelps. Currently, he oversees the
                        finance & operations functions in the Company.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="team-item">
                    <div className="image">
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
                    <div className="content pt-0" style={{ textAlign: "left" }}>
                      <p>
                        CA Megha Agarwal is Fellow Member of Institute of
                        Chartered Accountants of India. She has 19 years of
                        experience of CA Practice in the area of Direct &
                        Indirect Taxation and Auditing. She oversees the finance
                        & operations functions in the Company.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
