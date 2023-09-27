import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
export default function serviceOne() {
    return (
        <>
            {/* <div className="page-title-area item-bg-4">
                <div className="d-table">
                    <div className="d-table-cell service-title">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Company Incorporation</h2>
                                <ul>
                                    <li><a href="/">Home</a></li>
                                    <li>Company Incorporation</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

        <section className='Services-box ser-banner-4'>
            <div className='bg-overlay'>
                <div className="container">
                <h3>Our Company Incorporation Services</h3>
                <p>When starting a new investment project, it's crucial to establish a legal entity to protect your personal assets and limit your liabilities. That's where Company Incorporation services come in. These services provide assistance with registering and setting up a new legal entity, including selecting the appropriate business structure, registering with the relevant authorities, and drafting the necessary legal documents.</p>
                </div>
             </div>
            </section>

            <section className="services-details-area ptb-50">
                <div className="container">
                    {/* <div className="services-details-video">
                        <div className="details-image">
                            <img src="assets/img/services-details/Company-Incorporation.jpg" alt="image" />
                        </div>
                        {  <div className="details-video">
                            <a href="https://www.youtube.com/watch?v=gFQNPmLKj1k" className="video-btn popup-youtube">
                                <i className="bx bx-play" />
                            </a>
                        </div>  }
                        <div className="text">
                            <h3>Our Company Incorporation Services</h3>
                            <p>When starting a new investment project, it's crucial to establish a legal entity to protect your personal assets and limit your liabilities. That's where Company Incorporation services come in. These services provide assistance with registering and setting up a new legal entity, including selecting the appropriate business structure, registering with the relevant authorities, and drafting the necessary legal documents.</p>
                        </div>
                    </div> */}
                    <div className="services-details-overview">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-desc">
                                    <h3>Why Incorporate?</h3>
                                    <p>Incorporating a company offers several benefits to investment projects, including:</p>
                                    <ul>
                                        <li><p>Limited liability protection for shareholders</p></li>
                                        <li><p>Ability to raise capital through issuing shares</p></li>
                                        <li><p>Perpetual existence, separate from the individuals involved</p></li>
                                        <li><p>Professional image, which can attract investors and clients</p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12">
                                <div className="services-details-image">                                    
                                    <Image 
                                    src="assets/img/services-details/company-single.jpg" alt="image"
                                    width={440}
                                    height={370}
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
                                    src="assets/img/services-details/2.jpg" alt="image"
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