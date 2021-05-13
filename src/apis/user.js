import axios from "axios"
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_ENDPOINT;

class User {
  createUser(userInfo) {
    return axios
      .post(API_URL + "duser/addUser", userInfo)
      .then(async response => {
        if (response.data.code === 200) {
          if (response.data.data.token !== null) {
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
          }
        }
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  getProfile(userid) {
    return axios
      .get(API_URL + "duser/getProfile/" + userid)
      .then(async response => {
        if (response.data.code === 200) {
          if (response.data.data.token !== null) {
            localStorage.setItem("token", JSON.stringify(response.data.data.token));
          }
        }
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateProfile(userid, profile) {
    return axios
      .post(API_URL + "duser/updateProfile/" + userid, profile)
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateLanguage(userid, language) {
    return axios
      .post(API_URL + "duser/updateLanguage/" + userid, {
        wallet_language: language
      })
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateCurrency(userid, currency) {
    return axios
      .post(API_URL + "duser/updateCurrency/" + userid, {
        wallet_currency: currency
      })
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateEmail(userid, value) {
    return axios
      .post(API_URL + "duser/updateEmail/" + userid, {
        email_noti: value
      })
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  updateSMS(userid, value) {
    return axios
      .post(API_URL + "duser/updateSMS/" + userid, {
        sms_noti: value
      })
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  uploadMedia = (id, data, idtype, mediaFor) => {
    const formData = new FormData();
    formData.append('avatar', data);
    formData.append("idproof", idtype);
    formData.append("uid", id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        let pCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    };
    return axios.post(API_URL + "duser/uploadfile/" + mediaFor, formData, config)
      .then(res => {
        if (res && res.data) {
          return res.data
        }
      },
        error => {
          return error;
        }
      );
  }

  profilefile = (id, data) => {
    const formData = new FormData();
    formData.append('avatar', data);
    formData.append("uid", id);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      },
      onUploadProgress: progressEvent => {
        let pCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      }
    };
    return axios.post(API_URL + "duser/profilefile/", formData, config)
      .then(res => {
        if (res && res.data) {
          return res.data
        }
      },
        error => {
          return error;
        }
      );
  }

  requestWalletID = (authInfo) => {
    return axios
      .post(API_URL + "duser/requestWalletID", authInfo)
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  isValidEmail(email) {
    return axios
      .post(API_URL + "duser/isValidEmail", {
        email: email
      })
      .then(async response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }
}

export default new User();
