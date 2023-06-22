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
                    <div className="single-privacy">
                        
                            <QuillNoSSRWrapper
                                value={termdata}
                                readOnly={true}
                                theme="snow"
                                modules={{ toolbar: false }}
                                style={{border:'none'}}
                            />
                        
                        {/* <h3 className="mt-0">Introduction</h3>
                        <p>Welcome to Start Up. By accessing and using this website, you agree to be bound by the terms and conditions set forth below.</p>
                        <h3 className="mt-0">Acceptable Use</h3>
                        <p>You agree to use this website only for lawful purposes and in accordance with these terms and conditions. You must not use this website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.</p>
                        <h3 className="mt-0">Intellectual Property</h3>
                        <p>The content on this website, including but not limited to text, graphics, images, logos, and software, is the property of Start Up or its affiliates and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
                        <h3 className="mt-0">Disclaimer of Warranties</h3>
                        <p>This website and its content are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. Start Up does not warrant that the website will be uninterrupted or error-free, nor does it make any warranty as to the accuracy or reliability of the information contained on the website.</p>
                        <h3 className="mt-0">Limitation of Liability</h3>
                        <p>In no event shall Start Up or its affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with the use or inability to use this website.</p>
                        <h3 className="mt-0">Indemnification</h3>
                        <p>You agree to indemnify and hold Start Up and its affiliates harmless from any claims, damages, liabilities, and expenses arising out of your use of this website or your violation of these terms and conditions.</p>
                        <h3 className="mt-0">Governing Law and Jurisdiction</h3>
                        <p>These terms and conditions shall be governed by and construed in accordance with the laws of the United States and the State of [state name], without giving effect to any principles of conflicts of law. Any legal action or proceeding relating to these terms and conditions shall be brought exclusively in the state or federal courts located in [city, state].</p>
                        <h3 className="mt-0">Changes to Terms and Conditions</h3>
                        <p>Start Up reserves the right to modify these terms and conditions at any time and without prior notice. Your continued use of the website following any such modifications constitutes your acceptance of the new terms and conditions.</p>
                        <h3 className="mt-0">Termination</h3>
                        <p>Start Up may terminate your access to the website at any time, without notice, for any reason whatsoever.
                        </p>
                        <h3 className="mt-0">Contact Information</h3>
                        <p>If you have any questions or concerns regarding these terms and conditions, please contact us at [email address or phone number].</p> */}
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
