import React, { useEffect, useState } from 'react'
import { fetchTermsAndConditionsdata } from '@/lib/frontendapi';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});
export default function TermCondition() {
    const [termdata, setTermData] = useState('');
    useEffect(() => {
        // Fetch existing data from the database
        fetchTermsAndConditions();
    }, []);
    const fetchTermsAndConditions = async () => {
        try {
            const response = await fetchTermsAndConditionsdata();
            const data = response.data;
          console.log(data)
            setTermData(data);
        } catch (error) {
            // Handle error
        }
    };
    return (
        <>

            <section className="term-conditions py-5">
                <div className="container">
                <div dangerouslySetInnerHTML={{ __html: termdata }}></div>
                </div>
            </section>
        </>
    )
}