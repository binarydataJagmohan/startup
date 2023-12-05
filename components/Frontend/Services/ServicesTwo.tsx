import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
export default function serviceTwo() {
    return (
        <>

            <section className='Services-box ser-banner-5'>
                <div className='bg-overlay'>
                    <div className="container">
                        <h3>Business Planning Services for Investment Projects</h3>
                        <p>We offer comprehensive business planning services that are tailored to meet the unique needs of each of our clients. Our team of experienced professionals will work with you to create a detailed business plan that outlines your goals, strategies, and financial projections. Whether you're starting a new business or looking to expand an existing one, we can help you achieve your goals.</p>
                    </div>
                </div>
            </section>
            <section className="services-details-area ptb-100">
                <div className="container">
                    <div className="services-details-overview">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-desc">
                                    <h3>Our business planning services include:</h3>
                                    <p>Incorporating a company offers several benefits to investment projects, including:</p>
                                    <ul>
                                        <li><p>Market research and analysis</p></li>
                                        <li><p>Competitive analysis</p></li>
                                        <li><p>Financial analysis and projections</p></li>
                                        <li><p>Marketing and sales strategies</p></li>
                                        <li><p>Operational planning</p></li>
                                        <li><p>Risk management and mitigation strategies</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-image">
                                    <Image
                                        src="assets/images/services-details/Business-Planning.jpg" alt="image"
                                        width={546}
                                        height={284}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="services-details-overview">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-image">
                                    <Image
                                        src="assets/images/services-details/2.jpg" alt="image"
                                        width={546}
                                        height={546}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-desc">
                                    <h3>FAQ's</h3>
                                    <p>Have questions about Company Incorporation services in investment projects? We've got you covered. Check out our frequently asked questions below for answers to some of the most common questions we receive. </p>
                                    <div className="services-details-accordion">
                                        <ul className="accordion">
                                            <li className="accordion-item">
                                                <a className="accordion-title active" href="#">
                                                    <i className="bx bx-plus" />
                                                    What is Company Incorporation?
                                                </a>
                                                <p className="accordion-content show">Company incorporation is the process of legally establishing a new business entity by registering it with the government.</p>
                                            </li>
                                            <li className="accordion-item">
                                                <a className="accordion-title" href="#">
                                                    <i className="bx bx-plus" />
                                                    Why is it important to incorporate a company?
                                                </a>
                                                <p className="accordion-content">Incorporating a company gives it a separate legal existence from its owners and limits their personal liability for business debts and obligations. It also enhances the credibility of the business and makes it easier to raise funds from investors.</p>
                                            </li>
                                            <li className="accordion-item">
                                                <a className="accordion-title" href="#">
                                                    <i className="bx bx-plus" />
                                                    What are the benefits of incorporating a company for an investment project?
                                                </a>
                                                <p className="accordion-content">Incorporating a company for an investment project provides various benefits such as limited liability protection, ease of raising capital, enhanced credibility, tax benefits, and perpetual existence.</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                                <div className="send-btn text-center mt-5">
                                    <Link href="/contact"><button className="default-btn">Contact-us</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
