import React, { useEffect, useState } from 'react'
import { fetchTermsAndConditionsdata } from '@/lib/frontendapi';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
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


            // Set the fetched data as initial content in the editor

            setTermData(data);
        } catch (error) {
            // Handle error
        }
    };
    return (
        <>
            <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Terms &amp; Conditions</h2>
                                <ul>
                                    <li><a href="index.html">Home</a></li>
                                    <li>Terms &amp; Conditions</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="conditions-section ptb-100">
                <div className="container">
                    <div className="single-privacy" >
                        
                            <QuillNoSSRWrapper
                                value={termdata}
                                readOnly={true}
                                theme="snow"
                                modules={{ toolbar: false }}
                                
                            />
                    </div>
                </div>
                <div className="default-shape">
                    <div className="shape-1">
                        <img src="assets/img/shape/4.png" alt="image" />
                    </div>
                    <div className="shape-2 rotateme">
                        <img src="assets/img/shape/5.svg" alt="image" />
                    </div>
                    <div className="shape-3">
                        <img src="assets/img/shape/6.svg" alt="image" />
                    </div>
                    <div className="shape-4">
                        <img src="assets/img/shape/7.png" alt="image" />
                    </div>
                    <div className="shape-5">
                        <img src="assets/img/shape/8.png" alt="image" />
                    </div>
                </div>
            </section>
        </>
    )
}
