import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function ForInvestorsFrequentlyQuestions() {
    const [activeAccordion, setActiveAccordion] = useState(null);
    const toggleAccordion = (index: any) => {
        if (activeAccordion === index) {
            setActiveAccordion(null);
        } else {
            setActiveAccordion(index);
        }
    };
    const faqData = [
        {
            question: "What types of investment opportunities are available on RisingCapitalist?",
            answer:
                "Our platform offers a diverse range of investment opportunities, including early-stage startups, seed-stage companies, and growth-stage businesses. You can explore opportunities across various industries and sectors to diversify your investment portfolio.",
        },
        {
            question: "How can I evaluate the potential return on investment (ROI) of startup investments?",
            answer:
                "We provide detailed information on each startup's business model, market opportunity, financial projections, and team background to help you assess the potential ROI of your investment. Additionally, you can conduct your due diligence and engage directly with startup founders to ask questions and gather more information.",
        },
        {
            question: "What level of due diligence is conducted on startups listed on RisingCapitalist?",
            answer:
                "We conduct thorough due diligence on startups before listing them on our platform to ensure they meet our criteria for quality and credibility. This includes evaluating the team, market opportunity, product/service, and financials of the business. While we strive to provide accurate information, investors should conduct their due diligence before making investment decisions.",
        },
        {
            question: "How does the investment process work on RisingCapitalist?",
            answer:
                "Once you've identified a startup you're interested in, you can review their investment opportunity and conduct your due diligence. If you decide to invest, we provide resources to facilitate the investment process, including legal documentation, payment processing, and communication channels with startup founders.",
        },
        {
            question:
                "What will be the proof of investment that I will make?",
            answer:
                "If you are a direct investor, you’ll get a copy of your share certificate over your email as well as this will be uploaded to your profile in the Portfolio section. If you invest via AIF, you will receive capital account statements directly from the AIF.",
        }
    ];
    return (
        <>
            <section className="faq-section ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            For Investors
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
                        {/* <div className="col-lg-2"></div> */}
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
                        {/* <div className="col-lg-2 order-lg-0 order-first">
                            {/* <div className="faq-image transtion">
                                <Image
                                    src="assets/images/faq.png"
                                    alt="image"
                                    width={546}
                                    height={423}
                                />
                            </div> */}
                        {/* </div> */}
                    </div>
                </div>
            </section>
        </>
    );
}
