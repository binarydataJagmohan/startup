import React from 'react'
import FrequentlyQuestions from './FrequentlyQuestions'
import Link from 'next/link';

export default function FAQ() {
    return (
        <>
            <div className="page-title-area item-bg-4">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Faq</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Faq</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FrequentlyQuestions/>
        </>
    )
}
