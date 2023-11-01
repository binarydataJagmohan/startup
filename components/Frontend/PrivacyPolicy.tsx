import React, { useState, useEffect } from 'react'
import { fetchPrivacyPoliciesdata } from '@/lib/frontendapi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

export default function PrivacyPolicy() {
    const [privacydata, setPrivacyData] = useState('');
    useEffect(() => {
        // Fetch existing data from the database
        fetchPrivacyPolicies();
    }, []);
    const fetchPrivacyPolicies = async () => {
        try {
            const response = await fetchPrivacyPoliciesdata();
            const data = response.data;


            // Set the fetched data as initial content in the editor

            setPrivacyData(data);
        } catch (error) {
            // Handle error
        }
    };
    return (
        <>
            <section className="term-conditions py-5">
                <div className="container">
                <section className="term-conditions py-5">
                <div className="container">
                <div dangerouslySetInnerHTML={{ __html: privacydata }}></div>
                </div>
            </section>
                </div>
            </section>
        </>
    )
}