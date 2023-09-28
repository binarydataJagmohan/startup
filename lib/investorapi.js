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