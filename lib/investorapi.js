import { getToken } from "./session";
import axios from "axios";

export const getAllBusiness = async(id) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-business-details', {
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
export const getSingleInvestor = async(id) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/single-investor/' + id, {
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


export const getAllInvestedFundDetails = async(data) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-invested-fund-details', {
          method: 'get',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + getToken()
          },
          params: {
                ...data
            },
      });
      req.then(res => resolve(res.data))
          .catch(err => reject(err));
  });
};

export const getSingleBusinessDetails = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-business-details/' + id, {
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


  export const getSingleClosedBusinessDetails = async (id) => {
    return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-closed-business-details/' + id, {
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

  export const InvestorBooking = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/booking', {
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


export const InvestorPersonalInfoUpdate = async (formData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/update-profile`, formData,
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

  // export const insertIfinWorthDetails = async (formData) => {
  //   try {      
  //     const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/ifinworth-details`, formData,
  //       {
  //         headers: {
  //           'Accept': 'application/json',
  //           'Authorization': 'Bearer ' + getToken(),
  //           'Content-Type': 'multipart/form-data'
  //         },
  //       }
  //     );
     
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

export const insertIfinWorthDetails = async (formData) => {
  return new Promise((resolve, reject) => {
      const req = axios.request({
          url: process.env.NEXT_PUBLIC_API_URL + '/ifinworth-details',
          method: 'post',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + getToken(),
              'Content-Type': 'multipart/form-data'
          },
          data: formData, 
      });

      req.then(res => resolve(res.data))
          .catch(err => reject(err));
  });
};

export const getStartupIfinworthDetail = async(id) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-ifinworth-details/' + id, {
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


  export const FundRaisedSendNotification = async(data) => {
    return new Promise((resolve, reject) => {
        const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/send-mail-notifications', {
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


export const savepayment = async(data) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/payment', {
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


export const getInvestorBookingDetails = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-booking-details/' + id, {
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

export const investorViewer = async (user_id,business_id) => {
  return new Promise((resolve, reject) => {
    const req = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/investor-viewer/${user_id}/${business_id}`,
      {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getInvestorMessageData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-investor-message-data', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const ContactUserByInvestor = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/contact-user-by-investor', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getClickInvestorUserChatData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-click-investor-user-chat-data', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const ContactUserByInvestorWithShareFile = async (data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_API_URL + '/contact-user-by-investor-with-share-file', data, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + getToken(),
        },
      })
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getAdminDataInvestor = async () => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-admin-data-investor', {
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

export const CreateGroupChatByInvestor = async (data) => {
  //let formdata = new FormData();
  //formdata.append('image', image);
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/create-group-by-investor', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        //'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
        'Authorization': 'Bearer ' + getToken()
      },
      params: {
        ...data
      },
    });
    req.then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getSingleGroupData = async (data) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-group-data', {
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

export const getAllCCSPfunddata = async(id) => {
  return new Promise((resolve, reject) => {
      const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-all-CCSP-fund-details', {
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

export const getSingleFundDetails = async (id) => {
  return new Promise((resolve, reject) => {
    const req = axios.request(process.env.NEXT_PUBLIC_API_URL + '/get-single-ccsp-fund-details/' + id, {
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