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



type Country = {
    name: string;
    country_code: string;
}
interface UserData {
    id?: string;
}
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
     ['link', 'image', 'video'],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
   
    ['clean'],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'align',
  'color',
  'background',
];


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
          
        }
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
                  <h6 className="page-title">Startup</h6>
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard"}>
                        Dashboard
                      </a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href={process.env.NEXT_PUBLIC_BASE_URL + "admin/terms-and-conditions"}>
                        Terms And Conditions
                      </a>
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
             
                <QuillNoSSRWrapper
                  value={editorContent}
                
                  onChange={handleEditorChange}
                  modules={modules}
                  formats={formats}
                  theme="snow"
                  style={{ height: '200px' }} 
                />
                
              </div>
              <div className=""style={{ marginTop: '50px' }} >
                  <button className="btn btn-primary">
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