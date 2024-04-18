import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
export default function ForStartupsFrequentlyQuestions() {
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
            question: "How does RisingCapitalist help startups raise funding?",
            answer:
                "Our platform connects startups with a network of investors interested in early-stage investment opportunities. By showcasing your business and investment opportunity on our platform, you can attract potential investors and secure funding for your startup.",
        },
        {
            question: "What types of startups are eligible to raise funding on RisingCapitalist?",
            answer:
                "We welcome startups from a wide range of industries and sectors, including technology, healthcare, consumer products, and more. Whether you're a tech startup with an innovative product or a healthcare startup with a groundbreaking solution, our platform provides a platform for you to showcase your business to potential investors.",
        },
        {
            question: "What criteria do investors consider when evaluating startup opportunities?",
            answer:
                "Investors typically look for startups with strong growth potential, a scalable business model, a competitive advantage in the market, and a talented team with relevant experience. Highlighting these aspects of your business can increase your chances of attracting investor interest.",
        },
        {
            question: "How does the fundraising process work on RisingCapitalist?",
            answer:
                "Once you've created a profile for your startup on our platform, investors can review your business and investment opportunity. If interested, they can reach out to you directly to learn more and potentially make an investment. Our platform facilitates communication and collaboration between startups and investors throughout the fundraising process.",
        }
    ];
    return (
        <>
            <section className="faq-section ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            For Startups
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
