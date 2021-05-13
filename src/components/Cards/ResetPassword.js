import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Logo from '../../assets/2local logo wht.svg'
import './Card.css'
import { useAlert } from '../../hook/Context/AlertContext'
import { useUser } from '../../hook/Context/UserContext'
import authAPI from '../../apis/auth'

function ResetPassword() {
  const history = useHistory()
  const { alert, storeAlert } = useAlert()
  const { user, storeUser } = useUser()
  const [isLoading, setIsLoading] = React.useState(false)
  const [passwords, setWalletInfo] = useState({
    act_code: user.act_code,
    password: '',
    confirm_password: '',
  })

  const handleInputChange = (event) => {
    switch (event.target.id) {
      case 'password':
        setWalletInfo((passwords) => ({
          ...passwords,
          password: event.target.value,
        }))
        break
      case 'confirm_password':
        setWalletInfo((passwords) => ({
          ...passwords,
          confirm_password: event.target.value,
        }))
        break
    }
  }

  const validate = () => {
    if (!passwords.password) {
      storeAlert({
        ...alert,
        errorSnackbarOpen: true,
        errorSnackbarMessage: 'Please, enter your password.',
      })

      return false
    }

    if (passwords.password != passwords.confirm_password) {
      storeAlert({
        ...alert,
        errorSnackbarOpen: true,
        errorSnackbarMessage: 'Please, repeat your password.',
      })

      return false
    }

    if (!passwords.act_code) {
      storeAlert({
        ...alert,
        errorSnackbarOpen: true,
        errorSnackbarMessage:
          'Please, check a reset password link in your email.',
      })

      return false
    }

    return true
  }

  const handleResetPassword = () => {
    if (validate()) {
      authAPI.resetPassword(passwords).then(
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
  }

  return (
    <>
      <div className="login-card-container">
        <img className="login-card-logo" src={Logo} alt="" />
        <h1 className="login-card-heading">Reset Password</h1>
        <div className="line"></div>
        <br />
        <div className="login-card-forgot-pass">Password</div>
        <input
          className="login-card-input"
          type="password"
          id="password"
          value={passwords.password}
          onChange={handleInputChange}
          required
        />
        <div className="login-card-forgot-pass">Repeat Password</div>
        <input
          className="login-card-input"
          type="password"
          id="confirm_password"
          value={passwords.confirm_password}
          onChange={handleInputChange}
          required
        />
        <br />
        <button className="login-btn" onClick={handleResetPassword}>
          RESET PASSWORD
        </button>
      </div>
    </>
  )
}

export default ResetPassword
