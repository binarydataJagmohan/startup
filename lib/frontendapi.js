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



export const businessInfoSave = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/business-information', {
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

// export const businessInfoSave = async (data, logo) => {
//     let formdata = new FormData();
//     formdata.append('logo', logo);
//     return new Promise((resolve, reject) => {
//       const req = axios.post(process.env.NEXT_PUBLIC_API_URL + '/business-information', formdata, {
//         method: 'post',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
//           'Authorization': 'Bearer ' + getToken()
//         },
//         params: {
//           ...data
//         }
//       });
//       req.then(res => resolve(res.data))
//         .catch(err => reject(err));
//     });
//   };

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
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/basic-information', {
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
                // 'Authorization': 'Bearer ' + getToken()
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
                // 'Authorization': 'Bearer ' + getToken()
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