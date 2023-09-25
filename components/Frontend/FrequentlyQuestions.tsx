import React from 'react'
import Link from 'next/link';
export default function FrequentlyQuestions() {
    return (
        <>
            <section className="faq-section ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            Frequently <span>Asked</span> Questions
                        </h2>
                        <p>
                            Our platform is designed to provide individuals with the knowledge and tools they need to make informed investment decisions. We offer a user-friendly platform, extensive research and data, and a community of investors who are willing to share their knowledge and expertise.
                        </p>
                        <div className="bar" />
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <div className="faq-accordion">
                                <ul className="accordion">
                                    <li className="accordion-item">
                                        <Link
                                            className="accordion-title active"
                                            href="#"
                                        >
                                            <i className="bx bx-chevron-down" />
                                            What is your startup and investment website all about?
                                        </Link>
                                        <div className="accordion-content show">
                                            <p>
                                                Our platform is designed to provide individuals with the knowledge and tools they need to make informed investment decisions. We offer a user-friendly platform, extensive research and data, and a community of investors who are willing to share their knowledge and expertise.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <Link className="accordion-title" href="#">
                                            <i className="bx bx-chevron-down" />
                                            Is it safe to invest through your platform?
                                        </Link>
                                        <div className="accordion-content">
                                            <p>
                                                Absolutely. We take the security of our users' information and investments very seriously. Our platform is built with state-of-the-art security features, and we follow strict regulatory guidelines to ensure that your investments are safe and secure.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <Link className="accordion-title" href="#">
                                            <i className="bx bx-chevron-down" />
                                            How much does it cost to use your platform?
                                        </Link>
                                        <div className="accordion-content">
                                            <p>
                                                We offer a range of pricing plans to suit the needs of our users. Our basic plan is free, and we also offer paid plans that provide additional features and benefits.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <Link className="accordion-title" href="#">
                                            <i className="bx bx-chevron-down" />
                                            What types of investments can I make through your platform?
                                        </Link>
                                        <div className="accordion-content">
                                            <p>
                                                We offer a wide range of investment options, including stocks, bonds, mutual funds, ETFs, and more. Our platform is designed to give you access to a diverse range of investment opportunities, so you can build a portfolio that suits your goals and preferences.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <Link className="accordion-title" href="#">
                                            <i className="bx bx-chevron-down" />
                                            Do you offer any educational resources for investors?
                                        </Link>
                                        <div className="accordion-content">
                                            <p>
                                                Yes, we offer a variety of educational resources to help our users learn more about investing. These resources include articles, videos, webinars, and more, all designed to help you become a more informed and confident investor.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <Link className="accordion-title" href="#">
                                            <i className="bx bx-chevron-down" />
                                            Can I get help or support if I have questions about my investments?
                                        </Link>
                                        <div className="accordion-content">
                                            <p>
                                                Absolutely. Our team of experts is always available to answer your questions and provide you with personalized support. You can contact us via email, phone, or chat, and we'll be happy to help you with anything you need.
                                            </p>
                                        </div>
                                    </li>
                                    <li className="accordion-item">
                                        <Link className="accordion-title" href="#">
                                            <i className="bx bx-chevron-down" />
                                            Can I try your platform before committing to a paid plan?
                                        </Link>
                                        <div className="accordion-content">
                                            <p>
                                                Yes, we offer a free trial of our platform so you can try it out and see if it's right for you. Simply sign up for our free plan to get started.

                                                If you have any other questions or concerns, please don't hesitate to reach out to our support team. We are always here to help you make the most of our platform and achieve your financial goals.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="faq-image">
                                <img src="assets/img/faq.png" alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
