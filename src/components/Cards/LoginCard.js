import React from "react";
import { useHistory, Link } from "react-router-dom";
import Logo from "../../assets/2local logo wht.svg";
import "./Card.css";
import { useAlert } from '../../hook/Context/AlertContext'
import { useUser } from '../../hook/Context/UserContext'

// call api
import authAPI from "../../apis/auth";

function LoginCard() {
	const history = useHistory();
	const { alert, storeAlert } = useAlert();
	const { user, storeUser } = useUser();

	// variables
	const [isLoading, setIsLoading] = React.useState(false);
	const [authInfo, setAuthInfo] = React.useState({
		wallet: "",
		password: "",
		tokenKey: "",
		redirectURL: ""
	})

	const handleInputChange = event => {
		switch (event.target.id) {
			case "wallet":
				setAuthInfo(authInfo => ({ ...authInfo, wallet: event.target.value }))
				break;
			case "password":
				setAuthInfo(authInfo => ({ ...authInfo, password: event.target.value }))
				break;
		}
	}

	const validate = () => {
		if (!authInfo.wallet) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please enter your Wallet ID."
			})

			return false
		}

		if (!authInfo.password) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please enter your password."
			})

			return false
		}

		return true;
	}

	const handleLogin = () => {
		if (validate()) {
			authAPI.signin(authInfo)
				.then(
					response => {
						setIsLoading(false)

						if (response.code === 200) {
							storeUser({
								...user,
								userid: 	response.data.mst_userid,
							})

							localStorage.setItem("userid", response.data.mst_userid);

							storeAlert({
								...alert,
								successSnackbarOpen: true,
								successSnackbarMessage: response.message
							})

							history.push("/exchange");
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
						setIsLoading(false);
					}
				)
		}
	}

	return (
		<>
			<div className="login-card-container">
				<img className="login-card-logo" src={Logo} alt="" />
				<h1 className="login-card-heading">Welcome Back!</h1>
				<div className="line"></div>

				<label className="login-card-label" htmlFor="">
					Wallet ID
				</label>
				<input className="login-card-input" type="text" id="wallet" value={authInfo.wallet} onChange={handleInputChange} required />
				<div className="login-card-forgot-wallet">
					Forgot your Wallet ID? Request a reminder via email.{" "}
					<span><Link to="/request-wallet" className="sidebar-link">Request Wallet ID</Link></span>
				</div>
				<div className="login-card-forgot-pass">
					Password
					<span><Link to="/forgot-password" className="sidebar-link">Forgot password?</Link></span>
				</div>
				<input className="login-card-input" type="password" id="password" value={authInfo.password} onChange={handleInputChange} required />
				<button className="login-btn" onClick={handleLogin}>LOG IN</button>
				<div className="login-card-signup">
					<span>Login via Mobile</span>
					<span><Link to="/help" className="sidebar-link">Need some help?</Link></span>
				</div>
			</div>

			<div className="login-card-no-wallet">
				Don't have an wallet? <Link to="/wallet-exchange" className="sidebar-link">Sign up</Link>{" "}
			</div>
		</>
	);
}

export default LoginCard;
