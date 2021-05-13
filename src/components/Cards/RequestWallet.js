import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Logo from '../../assets/2local logo wht.svg'
import './Card.css'
import { useAlert } from '../../hook/Context/AlertContext'
import { useUser } from '../../hook/Context/UserContext'
// call api
import userAPI from '../../apis/user'

function RequestWallet() {
  const history = useHistory()
  const { alert, storeAlert } = useAlert()
  const { user, storeUser } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)
  const [authInfo, setAuthInfo] = useState({
    email: '',
    password: '',
  })

  const handleInputChange = (event) => {
    switch (event.target.id) {
      case 'email':
        setAuthInfo((authInfo) => ({ ...authInfo, email: event.target.value }))
        break
      case 'password':
        setAuthInfo((authInfo) => ({
          ...authInfo,
          password: event.target.value,
        }))
        break
    }
  }

  const validateEmail = (email) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (email.match(mailformat)) {
      return true
    }

    return false
  }

  const handleSendEmail = () => {
    if (!validateEmail(authInfo.email)) {
      storeAlert({
        ...alert,
        errorSnackbarOpen: true,
        errorSnackbarMessage:
          'Invalid email! Please, enter your correct email.',
      })

      return
    }

    if (!authInfo.password) {
      storeAlert({
        ...alert,
        errorSnackbarOpen: true,
        errorSnackbarMessage: 'Please, enter your password.',
      })

      return
    }

    userAPI.requestWalletID(authInfo).then(
      (response) => {
        if (response.status) {
          storeAlert({
            ...alert,
            successSnackbarOpen: true,
            successSnackbarMessage: response.message,
          })

          history.push('/login')
        } else {
          storeAlert({
            ...alert,
            errorSnackbarOpen: true,
            errorSnackbarMessage: response.message,
          })
        }
      },
      (error) => {
        console.log('error=', error)
        storeAlert({
          ...alert,
          errorSnackbarOpen: true,
          errorSnackbarMessage: error,
        })
        setIsLoading(false)
      }
    )
  }

  return (
    <>
      <div className="login-card-container">
        <img className="login-card-logo" src={Logo} alt="" />
        <h1 className="login-card-heading">Request Wallet ID</h1>
        <div className="line"></div>
        <br />
        <br />
        <label className="login-card-label" htmlFor="">
          Email Address
        </label>
        <input
          className="login-card-input"
          type="text"
          id="email"
          value={authInfo.email}
          onChange={handleInputChange}
          required
        />
        <div className="login-card-forgot-pass">Password</div>
        <input
          className="login-card-input"
          type="password"
          id="password"
          value={authInfo.password}
          onChange={handleInputChange}
          required
        />
        <button className="login-btn" onClick={handleSendEmail}>
          SEND EMAIL
        </button>
      </div>

      <div className="no-wallet">
        Already have a Wallet?{' '}
        <Link to="/login" className="sidebar-link">
          Log in
        </Link>{' '}
      </div>
    </>
  )
}

export default RequestWallet
