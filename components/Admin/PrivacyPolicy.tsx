import React, { useState, useEffect } from 'react'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { fetchPrivacyPoliciesdata } from '@/lib/frontendapi';
import "react-phone-input-2/lib/style.css";
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { getCurrentUserData, getToken } from '@/lib/session';
import Link from 'next/link';
import { useRouter } from 'next/router';
interface UserData {
  role?: any;
}
const TextEditor = dynamic(() => import("./TextEditor"), {
  ssr: false,
});

const PrivacyPolicy = () => {
  const [editorContent, setEditorContent] = useState('');
  const router = useRouter();

  const handleEditorChange = (content: any) => {
    setEditorContent(content);
  };

  useEffect(() => {
    const current_user_data: UserData = getCurrentUserData();
    if (current_user_data.role !== 'admin') {
      router.back();
    }
    // Fetch existing data from the database
    fetchPrivacyPolicies();
  }, []);

  const fetchPrivacyPolicies = async () => {
    try {
      const response = await fetchPrivacyPoliciesdata();
      const data = response.data;
      setEditorContent(data);
    } catch (error) {
      // Handle error
    }
  };

  const submitPrivacyPolicies = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/privacy-policies`,
        {
          ['privacy_policies']: editorContent,

        }, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
        }
      }
      );
      toast.success(response.data.message);


    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }

  }
  const handleClear = () => {
    setEditorContent('');
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
                  <h6 className="page-title"> Privacy Policy</h6>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/dashboard"}>
                        Dashboard
                      </Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href={process.env.NEXT_PUBLIC_BASE_URL + "admin/privacy-policy"}>
                        Privacy Policy
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
              <form onSubmit={submitPrivacyPolicies} className="needs-validation mb-4">
                <div className="col-12">

                  <TextEditor
                    value={editorContent}
                    onChange={handleEditorChange}
                    height={300}
                    theme="snow"
                  // style={{ height: '200px' }} 
                  />

                </div>
                <div className="" style={{ marginTop: '50px' }} >
                  <button className="btn btn-colors">
                    Save
                  </button>
                  <a type="button" className="btn btn-secondary mx-2" onClick={handleClear}>
                    Clear
                  </a>
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

export default PrivacyPolicy;