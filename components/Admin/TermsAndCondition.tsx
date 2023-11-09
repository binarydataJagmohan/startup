import React, { useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { fetchTermsAndConditionsdata } from '@/lib/frontendapi';
import "react-phone-input-2/lib/style.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { getToken } from '@/lib/session';
import Link from 'next/link';

type Country = {
    name: string;
    country_code: string;
}
interface UserData {
    id?: string;
}
const TextEditor = dynamic(() => import("./TextEditor"), {
    ssr: false,
  });


const TermsAndConditions = () => {
  const [editorContent, setEditorContent] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const handleEditorChange = (content:any) => {
    setEditorContent(content);
  };

  useEffect(() => {
    // Fetch existing data from the database
    fetchTermsAndConditions();
  }, []);

  const fetchTermsAndConditions = async () => {
    try {
      const response = await fetchTermsAndConditionsdata();
      const data = response.data;
  
     
      // Set the fetched data as initial content in the editor
      setEditorContent(data);
      setEditedContent(data);
    } catch (error) {
      // Handle error
    }
  };

const submitTermsAndCondtions = async(e:any)=>{
e.preventDefault();
try{
    const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/terms-and-conditions`,
        {
            ['terms_and_conditions']: editorContent,
          
        },{ headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken(), 
        }}
    );   
    toast.success(response.data.message);
 

}catch(error:any){
    if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
}

}
  const handleClear = () => {
    setEditorContent('');
    setEditedContent('');
  };

  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="page-title-box">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h6 className="page-title">Terms & Conditions</h6>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/terms-and-conditions"}>
                        Terms And Conditions
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Editor
                    </li>
                  </ol>
                </div>
              </div>
            </div>
            <div className="row">
            <form onSubmit={submitTermsAndCondtions} className="needs-validation mb-4">
              <div className="col-12">
             
              <TextEditor
                  value={editorContent}
                  height={300}
                  onChange={handleEditorChange}
                  theme="snow"
                />
                
              </div>
              <div className=""style={{ marginTop: '50px' }} >
                  <button className="btn btn-colors">
                    Save
                  </button>
                  <button type="button" className="btn btn-secondary mx-2" onClick={handleClear}>
                    Clear
                  </button>
                </div>
                </form>
                
            </div>
           
          </div>
        </div>
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default TermsAndConditions;