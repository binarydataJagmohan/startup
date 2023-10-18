import { getToken } from "./session";
import axios from "axios";

export const login = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/user-login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                //'Authorization': 'Bearer '+getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getFundRaiseCount= async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/fund-raise-count/', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const userUpdate = async (data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/update-user/'+ id, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
export const getSingleUserData = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-user/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getSingleFrontEndData = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-front-data/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
export const getBusinessInformation = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-business-information/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getBusinessInformationBusinessId = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-business-information-bid/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getBasicInformation = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-basic-information/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getBankInformation = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-bank-information/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
export const getProofInformation = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-basic-information/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getInvestorType = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-investor-type-information/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getAngelInvestorTerms = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-angel-investor-terms/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const   getAccreditedInvestorTerms = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-accredited-investor-terms/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};


export const getCountries = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/countries', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getAllInvestors = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-investors', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const getAllStartupBusiness = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-startup', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const joinToInvestAPI = async(email) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/join_to_invest', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                email: email
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const userRegister = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const confirmOtp = async(otp, userId) => {
    return new Promise((resolve, reject) => {
        const req = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/confirm-otp`, { otp, userId }, {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((res) => resolve(res.data))
            .catch((err) => reject(err));
    });
};


export const sendOtp = async() => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/send-otp', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const saveContact = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/save-contact', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const personalInformationSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/personal-information', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                // 'Access-Control-Allow-Origin':'true'
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};



// export const businessInfoSave = async(data) => {
//     return new Promise((resolve, reject) => {
//         const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/business-information', data,{
//             method: 'post',
//             headers: {
//                 'Accept': 'application/json',
//                 'Authorization': 'Bearer ' + getToken(),
//                 "Content-Type": "multipart/form-data"
//             },
//             data: {
//                 ...data
//             },
//         });
//         req.then(res => resolve(res.data))
//             .catch(err => reject(err));
//     });
// };

export const businessInfoSave = async (formData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/business-information`, formData,
        {
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
            'Content-Type': 'multipart/form-data'
          },
        }
      );
     
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  

export const bankInformationSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/bank-details', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const basicInformationSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/basic-information', data, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
                'Content-Type': 'multipart/form-data'
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const investorTypeInfoSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/investor-type-information', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const angelInvestorTermsSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/angel-investor-terms', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const angelAccreditedTermsSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/accredited-investor-terms', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const saveInvestorProfile = async(id, data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/investor-profile/' + id, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const resetPassword = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/reset-password', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                // 'Authorization': 'Bearer ' + getToken(),
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const forgetPassword = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/forget-password', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const CheckUserResetPasswordVerification = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/check-user-reset-password-verfication`, {
        data:data,
        method: 'post',
        headers: {
            'Accept': 'application/json',
        },
        data: {
          ...data
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const CheckUserEmailVerification = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/check-user-reset-email-verfication`, {
        data:data,
        method: 'post',
        headers: {
            'Accept': 'application/json',
        },
        data: {
          ...data
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const UpdateResetPassword = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/updated-reset-password`, {
        data:data,
        method: 'post',
        headers: {
            'Accept': 'application/json',
        },
        data: {
          ...data
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };


  export const CheckUserApprovalStatus = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-user/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const sendNotification = async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(`${process.env.NEXT_PUBLIC_API_URL}/send-notifications`, {
        data:data,
        method: 'post',
        headers: {
            'Accept': 'application/json',
        },
        data: {
          ...data
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const fetchPrivacyPoliciesdata = async(data)=>{
    return new Promise ((resolve,reject)=>{
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-privacy-policies',{
            method:'get',
            headers:{
                'Accept':'application/json',
                'Authorization':'Bearer' +getToken()
            },
            data:{
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
}
export const fetchTermsAndConditionsdata = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-terms-and-conditions', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            data: {
                ...data
            },
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};

export const uploadDocuments = async (data, pan_card_front,pan_card_back,adhar_card_front,adhar_card_back) => {
    let formdata = new FormData();
    formdata.append('pan_card_front', pan_card_front);
    formdata.append('pan_card_back', pan_card_back);
    formdata.append('adhar_card_front', adhar_card_front);
    formdata.append('adhar_card_back', adhar_card_back);
    return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/upload-documents',formdata, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
            'Authorization': 'Bearer ' + getToken()
          },
          params: {
            ...data
          }
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

export const SelectedOptionsuploadDocuments = async (data, proof_of_network, proof_of_income, certificate_of_incorporation, ca_signed_net_angeable_2_crore, net_worth_atleast_10_crore, bank_statement_3_years, incorporation_certificate) => {
    let formdata = new FormData();
    formdata.append('proof_of_network', proof_of_network);
    formdata.append('proof_of_income', proof_of_income);
    formdata.append('certificate_of_incorporation', certificate_of_incorporation);
    formdata.append('ca_signed_net_angeable_2_crore', ca_signed_net_angeable_2_crore);
    formdata.append('net_worth_atleast_10_crore', net_worth_atleast_10_crore);
    formdata.append('bank_statement_3_years', bank_statement_3_years);
    formdata.append('incorporation_certificate', incorporation_certificate);
    return new Promise((resolve, reject) => {
      const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/selected-options-document-upload',formdata, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
            'Authorization': 'Bearer ' + getToken()
          },
          params: {
            ...data
          }
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };

  export const fetchSingleUserDocuments = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-documents/' + id ,{
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            }
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
export const getDocumentsUpload = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-upload-documents-by-documenttype', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getToken()
            },
            params: {
                ...data
            }
        });
        req.then(res => resolve(res.data))
            .catch(err => reject(err));
    });
};
export const getFailerErrorLog = async data => {
    return new Promise((resolve, reject) => {
      const req = axios.request(
        process.env.NEXT_PUBLIC_API_URL + '/get-all-errorlog',
        {
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Authorization': 'Bearer '+getToken()
          },
          params: {
            ...data,
          },
        },
      );
      req.then(res => resolve(res.data)).catch(err => reject(err));
    });
  };

  export const handledeleteAllData= async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL+'/delete-all-error-log', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+getToken()
        },
        params: {
          ...data
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
  export const deleteerrorlog= async (data) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL+'/delete-error-log', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+getToken()
            
        },
        params: {
          ...data
        },
      });
      req.then(res => resolve(res.data))
        .catch(err => reject(err));
    });
  };
