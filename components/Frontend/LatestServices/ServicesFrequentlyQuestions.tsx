import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function ServicesFrequentlyQuestions() {
    const [activeAccordion, setActiveAccordion] = useState(0);
    const toggleAccordion = (index: any) => {
        if (activeAccordion === index) {
            setActiveAccordion(0);
        } else {
            setActiveAccordion(index);
        }
    };
    const faqData = [
        {
            question: "What are outsourced CFO services?",
            answer:
                "An outsourced Virtual CFO is a financial expert or a financial advisor on your team who can handle tasks like budgeting, financial planning, analyzing your company's financial health, and providing strategic advice to help your business grow.",
        },
        {
            question: "Whether Virtual CFO services are available remotely or onsite?",
            answer:
                "Virtual CFO services are available remotely, meaning the CFO works from their own location and communicates with clients through online platforms and tools. They do not need to be physically present onsite at the client's office.",
        },
        {
            question: "Do Virtual CFOs assist start-ups in fundraising?",
            answer:
                "Yes, Virtual CFOs often assist startups in fundraising by providing financial planning, preparation of financial reports, and connecting them with potential investors or funding sources.",
        },
        {
            question: "What does a Virtual CFO do in a small business?",
            answer:
                "In a small business, a Virtual CFO typically handles financial planning, budgeting, cash flow management, financial reporting, analysis of financial performance, strategic financial advice, and assisting with decision-making to help the business achieve its financial goals.",
        },
        {
            question:
                "Are Virtual CFO services expensive?",
            answer:
                "Virtual CFO services are generally the most cost-effective services. Pricing depends on factors like service scope and expertise level. Flexible pricing models make them accessible to businesses of different sizes.",
        }
    ];
    return (
        <>
            <section className="faq-section ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            Frequently <span>Asked</span> Questions
                        </h2>
                        {/* <p>
                            Our platform is designed to provide individuals with the knowledge
                            and tools they need to make informed investment decisions. We
                            offer a user-friendly platform, extensive research and data, and a
                            community of investors who are willing to share their knowledge
                            and expertise.
                        </p> */}
                        <div className="bar" />
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-12 order-lg-0 order-last">
                            <div className="faq-accordion">
                                <ul className="accordion">
                                    {faqData.map((faq, index) => (
                                        <li className="accordion-item" key={index}>
                                            <Link
                                                className={`accordion-title ${activeAccordion === index ? "active" : ""
                                                    }`}
                                                href="javascript:void(0)"
                                                onClick={() => toggleAccordion(index)}
                                            >
                                                <i className="bx bx-chevron-down" />
                                                {faq.question}
                                            </Link>
                                            <div
                                                className={`accordion-content ${activeAccordion === index ? "show" : ""
                                                    }`}
                                            >
                                                <p>{faq.answer}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
