import axios from "axios"
import authHeader from './auth-header';

const API_URL = process.env.REACT_APP_ENDPOINT;

class Auth {
  signin(authInfo) {
    return axios
      .post(API_URL + "duser/userLogin", authInfo)
      .then(async response => {
        if (response.data.code === 200) {
          if (response.data.data) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
          }
        }
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  async signout() {
    localStorage.clear();
    return true;
  }

  signup(authInfo) {
    return axios
      .post(API_URL + "auth/register", authInfo)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  forgotPassword(email) {
    return axios
      .post(API_URL + "duser/forgotpassword", {'email': email})
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  fotgotLinkVerify(act_code) {
    return axios
      .get(API_URL + "duser/fotgotLinkVerify/" + act_code)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  changePassword(userid, passwords) {
    return axios
      .post(API_URL + "duser/changePassword/" + userid, passwords)
      .then(response => {
        console.log(response, "=====")
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  resetPassword(passwords) {
    return axios
      .post(API_URL + "duser/resetPassword", passwords)
      .then(response => {
        console.log(response, "=====")
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

  verifyEmail(code) {
    return axios
      .post(API_URL + "duser/verifyEmail/" + code)
      .then(response => {
        console.log(response, "=====")
        return response.data;
      })
      .catch(error => {
        console.log('error=', error)
        return error
      })
  }

}

export default new Auth();