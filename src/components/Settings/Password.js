import React from "react";
import "./styles.css";
import authAPI from "../../apis/auth";
import userAPI from "../../apis/auth";
import { useUser } from '../../hook/Context/UserContext'
import { useAlert } from '../../hook/Context/AlertContext'

function PasswordRow(props) {
	const { label, id, value, changeInput } = props

	const handleChange = event => {
		changeInput(event.target.id, event.target.value)
	}

	return (
		<div className=" password-row-wrapper">
			<label className="password-row-label col-sm-3" htmlFor="">
				{label}
			</label>{" "}
			<input className="password-row-input col-lg-9" type="password" id={id} value={value} onChange={handleChange} />
		</div>
	);
}

function Password() {
	const { user, storeUser } = useUser();
	const { alert, storeAlert } = useAlert();

	const [passwords, setPassword] = React.useState({
		cur_password: "",
		new_password: "",
		confirm_password: ""
	})

	const handleChangeInput = (id, value) => {
		switch (id) {
			case "cur_password":
				setPassword(passwords => ({ ...passwords, cur_password: value }))
				break;
			case "new_password":
				setPassword(passwords => ({ ...passwords, new_password: value }))
				break;
			case "confirm_password":
				setPassword(passwords => ({ ...passwords, confirm_password: value }))
				break;
			}
	}

	const validate = () => {
		if (!passwords.cur_password || passwords.cur_password != user.user_secret) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Invalid your current password!"
			})
			
			return false;
		}

		if (!passwords.new_password) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, enter your new password."
			})
			
			return false;
		}

		if (passwords.new_password != passwords.confirm_password) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, confirm your password."
			})
			
			return false;
		}

		return true
	}

	const handleResetPassword = () => {
		if (validate()) {
			authAPI.changePassword(user.userid, passwords)
				.then(
					response => {
						if (response.code === 200) {
							storeUser({
								...user,
								user_secret: passwords.new_password,
							})

							storeAlert({
								...alert,
								successSnackbarOpen: true,
								successSnackbarMessage: response.message
							})

							setPassword(passwords => ({	 ...passwords, cur_password: "" }))
							setPassword(passwords => ({ ...passwords, new_password: "" }))
							setPassword(passwords => ({ ...passwords, confirm_password: "" }))
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
		<div className="d-flex flex-column align-items-center">
			<div className="mt-3 mt-sm-5 password-container">
				<PasswordRow label="Current Password" id="cur_password" value={passwords.cur_password} changeInput={handleChangeInput} />
				<PasswordRow label="New Password" id="new_password" value={passwords.new_password} changeInput={handleChangeInput} />
				<PasswordRow label="Confirm Password" id="confirm_password" value={passwords.confirm_password} changeInput={handleChangeInput} />
				<div style={{display: 'flex'}} className=" password-row-wrapper">
					<div className="col-sm-3"></div>
					<button className="mt-5 password-btn" onClick={handleResetPassword} >Change</button>
				</div>
			</div>
		</div>
	);
}

export default Password;
