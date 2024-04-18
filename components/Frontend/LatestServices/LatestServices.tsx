import React from 'react';
import ServicesFrequentlyQuestions from './ServicesFrequentlyQuestions';
import ForStartupsFrequentlyQuestions from './ForStartupsFrequentlyQuestions';
import ForInvestorsFrequentlyQuestions from './ForInvestorsFrequentlyQuestions';
import Image from 'next/image';
export default function LatestServices() {
    return (
        <>
            <section className="faq-section ptb-100">
                <div className="container">
                    <div className="section-title pb-5">
                        <h2>Fundraise</h2>
                        <p>At RisingCapitalist, startups can raise funds via both equity and debt. Our team will work with you to develop a customized funding plan that meets your specific needs.</p>
                        <div className="bar" />
                    </div>
                    <div className='row pt-5 pb-5 latest_services'>
                        <div className='col-lg-6 pt-3'>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/services-details/services/equity-financing.png`} alt="image" height={100} width={100} className='w-100' />
                        </div>
                        <div className='col-lg-6'>
                            <h4>Equity Financing</h4>
                            <div className="bar"></div>
                            <p>It is a type of funding in which investors exchange money for ownership in a company. This type of funding can be a good option for startups that are looking for long-term capital to support their growth. This can also be in the form of compulsorily convertible preferred shares (CCPS), where preferred shares can be converted into common shares at a later date. This is currently a popular investment choice for both startups and investors.</p>
                            <div className="row">
                                <div className="col-lg-12">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Benefits</th>
                                                <th scope="col">Risks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Provides long-term capital Gives investors a stake in the company’s success Helps to increase the company’s valuation</td>
                                                <td>Dilutes the founder’s ownership stake Give investors control over the company’s decision-making Time taking process (typically 6 – 8 months)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='col-lg-4'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row pt-5 pb-5 latest_services'>
                        <div className='col-lg-6'>
                            <h4>Debt Financing</h4>
                            <div className="bar"></div>
                            <p>It is a type of funding in which an investor or a lender provides funding at a certain rate of interest for a certain amount of time. At RisingCapitalist, startups can raise funds in the form of compulsorily convertible debentures (CCD), which are convertible into equity shares within 10 years from the date of their issuance.</p>
                            <p>While issuing CCDs to the investors, startups can either choose to issue them at a nominal price per unit based on the agreed valuation cap and discount rate applicable at the time of conversion or, decide the conversion price of the equity shares upfront based on the valuation report of the registered valuer.</p>
                        </div>
                        <div className='col-lg-6'>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/services-details/services/debt-financing.png`} alt="image" height={100} width={100} className='w-100' />
                        </div>
                    </div>
                    <div className='row pt-5 pb-5 latest_services'>
                        <div className='col-lg-6'>
                            <Image src={`${process.env.NEXT_PUBLIC_BASE_URL}/assets/images/services-details/services/regulatory-services.jpg`} alt="image" height={100} width={100} className='w-100' />
                        </div>
                        <div className='col-lg-6'>
                            <h4>Other Regulatory Services</h4>
                            <div className="bar"></div>
                            <p>We understand that there are several compliances and regulatory requirements that a startup has to go through pre and post-raising funds. Our team of experienced lawyers and financial experts can provide the essential services required during and after your fundraising efforts.</p>
                            <div className='row pt-3'>
                                <div className='col-lg-12'>
                                    <div className='row'>
                                        <div className='col-lg-6 p-0'>
                                            <p style={{ paddingLeft: '10px' }}>Shareholder Agreement Drafting</p>
                                            <p style={{ background: '#ccc', paddingLeft: '10px' }}>Issuance of Share Certificates</p>
                                            <p style={{ paddingLeft: '5px' }}>Valuation by Registered Valuer</p>
                                        </div>
                                        <div className='col-lg-6 p-0'>
                                            <p style={{ paddingLeft: '10px' }}>Legal Services</p>
                                            <p style={{ background: '#ccc', paddingLeft: '10px' }}>Term Sheet Review</p>
                                            <p style={{ paddingLeft: '10px' }}>Valuation by Merchant Banker</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4'></div>
                            </div>
                        </div>
                    </div>
                    <div className='row align-items-center'>
                        <div className='col-lg-12 col-md-12'>
                            <ForStartupsFrequentlyQuestions />
                        </div>
                        <div className='col-lg-12 col-md-12'>
                            <ForInvestorsFrequentlyQuestions />
                        </div>
                    </div>
                </div>
                <div className="virtual_cfo pb-5 pt-5">
                    <div className="container">
                        <h2>Virtual CFO</h2>
                        <p>At RisingCapitalist, we endeavor to help startups manage their Chief Financial Officer (CFO) functions efficiently and provide the management of startups with all the inputs for their decision-making. Our services can vary widely depending on the specific needs of the company, but they typically encompass a range of financial and strategic responsibilities.</p>
                        <p>A virtual CFO is like having a financial expert on your team, but without needing them to be physically present in your office. Instead, we work remotely, often on a part-time basis, using technology to communicate and collaborate with you. Think of them as your financial advisor who helps you make smart decisions about money matters for your business. We can handle tasks like budgeting, financial planning, analyzing your company's financial health, and providing strategic advice to help your business grow.</p>
                        <p>Whether you're a small startup or a growing company, having a virtual CFO can give you access to high-level financial expertise without the cost of hiring a full-time CFO.</p>
                        <p>Key services that are often covered by us include the following:</p>
                        <div className='row pb-3'>
                            <div className='col-lg-6'>
                                <ul>
                                    <li>Financial planning and analysis (FP&A)</li>
                                    <li>Preparation of financial statements (income statement, balance sheet, cash flow statement)</li>
                                    <li>Identifying and managing financial risks</li>
                                    <li>Providing financial insights to support strategic decision-making</li>
                                    <li>Developing tax-efficient strategies</li>
                                    <li>Managing cash and liquidity</li>
                                </ul>
                            </div>
                            <div className='col-lg-6'>
                                <ul>
                                    <li>Ensuring compliance with all applicable financial regulations and reporting requirements</li>
                                    <li>Implementing and maintaining financial systems and software</li>
                                    <li>Establishing key performance indicators to measure financial and operational performance</li>
                                    <li>Identifying cost-saving opportunities</li>
                                    <li>Managing relationships with investors and analysts</li>
                                </ul>
                            </div>
                        </div>
                        <h2>Need for Hiring a Virtual CFO</h2>
                        <p>Outsourcing CFO services to us will offer several advantages to your businesses, especially for startups looking for someone to manage their finance department so that you can focus on your business.</p>
                        <p>Here are some of the key advantages of outsourcing CFO services to us:</p>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <ul>
                                    <li>Cost-effective</li>
                                    <li>Experienced financial and accounting professionals</li>
                                    <li>Scalable based on your business needs</li>
                                    <li>Reduced financial and legal risk</li>
                                    <li>objective perspective of your company's financial health and strategy</li>
                                </ul>
                            </div>
                            <div className='col-lg-6'>
                                <ul>
                                    <li>Access to advanced technology</li>
                                    <li>Strategic guidance</li>
                                    <li>Temporary or project-based support</li>
                                    <li>Confidentiality (bound by confidentiality agreements)</li>
                                    <li>Access to networks including potential investors, lenders, and industry experts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="hiring_virtual_cfo mt-5 pt-5 pb-5">
                    <div className="container">
                        <h2>Need for Hiring a Virtual CFO</h2>
                        <p>Outsourcing CFO services to us will offer several advantages to your businesses, especially for startups looking for someone to manage their finance department so that you can focus on your business.</p>
                        <p>Here are some of the key advantages of outsourcing CFO services to us:</p>
                        <div className='row'>
                            <div className='col-lg-12'>
                                <ul>
                                    <li>Cost-effective</li>
                                    <li>Experienced financial and accounting professionals</li>
                                    <li>Scalable based on your business needs</li>
                                    <li>Reduced financial and legal risk</li>
                                    <li>objective perspective of your company's financial health and strategy</li>
                                    <li>Access to advanced technology</li>
                                    <li>Strategic guidance</li>
                                    <li>Temporary or project-based support</li>
                                    <li>Confidentiality (bound by confidentiality agreements)</li>
                                    <li>Access to networks including potential investors, lenders, and industry experts</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div> */}
                <div className='container'>
                    <ServicesFrequentlyQuestions />
                </div>
            </section>
        </>
    )
}