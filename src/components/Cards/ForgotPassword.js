import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "../../assets/2local logo wht.svg";
import "./Card.css";
import { useAlert } from '../../hook/Context/AlertContext'
import { useUser } from '../../hook/Context/UserContext'
import authAPI from "../../apis/auth";

function ForgotPassword() {
    const history = useHistory();
    const { alert, storeAlert } = useAlert();
    const [email, setEmail] = useState("");

    const handleInputChange = (event) => {
        setEmail(event.target.value);
    }

    const validateEmail = email => {
        const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (email.match(mailformat)) {
            return true
        }

        return false
    }

    const handleSendEmail = () => {
        if (!validateEmail(email)) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Invalid email! Please, enter your correct email."
			})

			return;
		}

        authAPI.forgotPassword(email)
        .then(
            response => {
                console.log(response);
                if (response.status === true) {
                    storeAlert({
                        ...alert,
                        successSnackbarOpen: true,
                        successSnackbarMessage: response.message
                    })

                    history.push("/reset-password");
                } else {
                    storeAlert({
                        ...alert,
                        errorSnackbarOpen: true,
                        errorSnackbarMessage: response.message
                    })
                }
            },
            error => {
                console.log('error=', error)
                storeAlert({
                    ...alert,
                    errorSnackbarOpen: true,
                    errorSnackbarMessage: error
                })
            }
        )
    }

    return (
        <>
   			<div className="login-card-container">
				<img className="login-card-logo" src={Logo} alt="" />
				<h1 className="login-card-heading">Forgot Password</h1>
				<div className="line"></div>
                <br /><br />
				<label className="login-card-label" htmlFor="">
					Email Address
				</label>
				<input className="login-card-input" type="text" id="email" value={email} onChange={handleInputChange} required />
				<button className="login-btn" onClick={handleSendEmail}>SEND EMAIL</button>
			</div>
            <div className="no-wallet">
                Already have a Wallet? <Link to="/login" className="sidebar-link">Log in</Link>{" "}
            </div>
        </>
    )
}

export default ForgotPassword;
