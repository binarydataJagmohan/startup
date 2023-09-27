import React, { useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
export default function FrequentlyQuestions() {
    const [activeAccordion, setActiveAccordion] = useState(null);

    const toggleAccordion = (index:any) => {
        if (activeAccordion === index) {
            // If the clicked FAQ item is already active, close it
            setActiveAccordion(null);
        } else {
            // Otherwise, open the clicked FAQ item
            setActiveAccordion(index);
        }
    };
    const faqData = [
        {
            question: "What is your startup and investment website all about?",
            answer:
                "Our platform is designed to provide individuals with the knowledge and tools they need to make informed investment decisions. We offer a user-friendly platform, extensive research and data, and a community of investors who are willing to share their knowledge and expertise.",
        },
        {
            question: "Is it safe to invest through your platform?",
            answer:
                "Absolutely. We take the security of our users' information and investments very seriously. Our platform is built with state-of-the-art security features, and we follow strict regulatory guidelines to ensure that your investments are safe and secure.",
        },
        {
            question: "How much does it cost to use your platform?",
            answer:
                "We offer a range of pricing plans to suit the needs of our users. Our basic plan is free, and we also offer paid plans that provide additional features and benefits.",
        },
        {
            question: "What types of investments can I make through your platform?",
            answer:
                "We offer a wide range of investment options, including stocks, bonds, mutual funds, ETFs, and more. Our platform is designed to give you access to a diverse range of investment opportunities, so you can build a portfolio that suits your goals and preferences.",
        },
        {
          question: "Can I get help or support if I have questions about my investments?",
          answer:
              "Absolutely. Our team of experts is always available to answer your questions and provide you with personalized support. You can contact us via email, phone, or chat, and we'll be happy to help you with anything you need.",
      },{
        question: "Can I try your platform before committing to a paid plan?",
        answer:
            " Yes, we offer a free trial of our platform so you can try it out and see if it's right for you. Simply sign up for our free plan to get started.",
    },
    ];
    return (
        <>
            <section className="faq-section ptb-100">
                <div className="container">
                    <div className="section-title">
                        <h2>
                            Frequently <span>Asked</span> Questions
                        </h2>
                        <p>
                            Our platform is designed to provide individuals with the knowledge
                            and tools they need to make informed investment decisions. We
                            offer a user-friendly platform, extensive research and data, and a
                            community of investors who are willing to share their knowledge
                            and expertise.
                        </p>
                        <div className="bar" />
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 order-lg-0 order-last">
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
                        <div className="col-lg-6 order-lg-0 order-first">
                            <div className="faq-image transtion">
                                <img src="assets/img/faq.png" alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
