import React,{useState,useEffect} from 'react'
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
            <div className="page-title-area item-bg-1">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="page-title-content">
                                <h2>Privacy Policy</h2>
                                <ul>
                                    <li><Link href="index.html">Home</Link></li>
                                    <li>Privacy Policy</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="conditions-section ptb-100">
                <div className="container">
                    <div className="single-privacy">
                      <p>
                      <QuillNoSSRWrapper
                                value={privacydata}
                                readOnly={true}
                                theme="snow"
                                style={{ border: 'none', boxShadow: 'none' }}
                                modules={{ toolbar: false }}
                            />
                      </p>
                           
                      
                    </div>
                </div>
                <div className="default-shape">
                    <div className="shape-1">                        
                        <Image src="assets/img/shape/4.png" alt="image" width={15} height={15}/>
                    </div>
                    <div className="shape-2 rotateme">                        
                        <Image src="assets/img/shape/5.svg" alt="image" width={22} height={22}/>
                    </div>
                    <div className="shape-3">                        
                        <Image src="assets/img/shape/6.svg" alt="image" width={21} height={20}/>
                    </div>
                    <div className="shape-4">                        
                        <Image src="assets/img/shape/7.png" alt="image" width={18} height={18}/>
                    </div>
                    <div className="shape-5">                        
                        <Image src="assets/img/shape/8.png" alt="image" width={12} height={12}/>
                    </div>
                </div>
            </section>
        </>
    )
}