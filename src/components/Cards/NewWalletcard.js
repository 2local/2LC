import React from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "../../assets/2local logo wht.svg";
import "./Card.css";
import { useAlert } from '../../hook/Context/AlertContext'
import { useUser } from '../../hook/Context/UserContext'
// call api
import userAPI from "../../apis/user";

function NewWalletcard() {
	const history = useHistory();
	const { alert, storeAlert } = useAlert();
	const { user, storeUser } = useUser();

	const [walletInfo, setWalletInfo] = React.useState({
		email: "",
		password: "",
		confirm_password: ""
	})

	const handleInputChange = event => {
		switch (event.target.id) {
			case "email":
				setWalletInfo(walletInfo => ({ ...walletInfo, email: event.target.value }))
				break;
			case "password":
				setWalletInfo(walletInfo => ({ ...walletInfo, password: event.target.value }))
				break;
			case "confirm_password":
				setWalletInfo(walletInfo => ({ ...walletInfo, confirm_password: event.target.value }))
				break;
		}
	}

	const [isChecked, setChecked] = React.useState(false)
	const handleChecked = () => {
		setChecked(!isChecked)
	}

	const validate = () => {
		if (!walletInfo.email) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, enter your email."
			})

			return false;
		}

		if (!validateEmail(walletInfo.email)) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Invalid email! Please, enter your correct email."
			})

			return false;
		}

		if (!walletInfo.password) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, enter your password."
			})
			
			return false;
		}

		if (!walletInfo.confirm_password) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, repeat your password."
			})
			
			return false;
		}

		if (walletInfo.password != walletInfo.confirm_password) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, confirm your password."
			})
			
			return false;
		}

		if (!isChecked) {
			return false;
		}

		return true;
	}

	const validateEmail = email => {
		const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (email.match(mailformat)) {
		  return true
		}

		return false
	  }

	const handleCreateWallet = () => {
		if (validate()) {
			userAPI.isValidEmail(walletInfo.email)
				.then(
					response => {
						if (response.status) {
							storeUser({
								...user,
								email: walletInfo.email,
								user_secret: walletInfo.password
							})
				
							history.push("/create-user")
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
	}

	return (
		<>
			<div className="new-wallet-card-container">
				<img className="login-card-logo" src={Logo} alt="" />
				<h1 className="newwallet-card-heading">Create New Wallet</h1>
				<div className="line"></div>
				<label className="newwallet-card-label" htmlFor="">
					Your Email
				</label>
				<input className="login-card-input" type="text" id="email" value={walletInfo.email} onChange={handleInputChange} required />
				<label className="newwallet-card-label" htmlFor="">
					Password
				</label>
				<input className="login-card-input" type="password" id="password" value={walletInfo.password} onChange={handleInputChange} required />
				<label className="newwallet-card-label" htmlFor="">
					Repeat Password
				</label>
				<input className="login-card-input" type="password" id="confirm_password" value={walletInfo.confirm_password} onChange={handleInputChange} required />
				<div className="agree-to-terms">
					<input type="checkbox" className="checkbox" checked={isChecked} onChange={handleChecked} />I understand
					that 2local.io never stores passwords and therefore
					cannot recover or reset my password. If I lose access to my
					wallet, I must use my{" "}
					<span> Secret Private Key Recovery Phrase</span> to access
					my funds.
				</div>
				<div className="newwallet-forgot-pass">
					By creating an account, you agree to 2local’s{" "}
					<span>Terms of Service</span> & <span> Privacy Policy</span>
					.
				</div>
				<button className="login-btn" onClick={handleCreateWallet}>Create Wallet</button>
			</div>

			<div className="login-card-no-wallet">
				Already have a Wallet? <Link to="/login" className="sidebar-link">Log in</Link>{" "}
			</div>
		</>
	);
}

export default NewWalletcard;
