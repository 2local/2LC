import React, { useEffect, useState } from "react";
import { useUser } from '../../hook/Context/UserContext'
import { useAlert } from '../../hook/Context/AlertContext'
import userAPI from "../../apis/user";
import "./styles.css";
import CurrencyList from 'currency-list';
const languages = require('language-list')();

function CheckBoxes({isEmail,isSMS, onEmail, onSMS}) {
	const [email, setEmail] = useState(isEmail)
	const [sms, setSMS] = useState(isSMS)

	useEffect(() => {
		setEmail(isEmail)
	}, [isEmail])

	useEffect(() => {
		setSMS(isSMS)
	}, [isSMS])

	const handleEmailChange = () => {
		onEmail(!email)
		setEmail(!email)
	}

	const handleSMSChange = () => {
		onSMS(!sms)
		setSMS(!sms)
	}

	return (
		<div className="checkbox-container-wrapper">
			<span className="checboxes-container">
				<input type="checkbox" name="" id="" checked={email} onChange={handleEmailChange} />
				<span className="ml-2">Email</span>
			</span>
			<span className="ml-md-5 checboxes-container">
				<input type="checkbox" name="" id="" checked={sms} onChange={handleSMSChange} />
				<span className="ml-2">SMS</span>
			</span>
		</div>
	);
}

function Dropdown({ selected, list, type, onSelect }) {
	const [select, setSelect] = useState(selected);
	useEffect(() => {
		setSelect(selected)
	}, [selected])

	const handleSelect = item => {
		if (type === 'language') {
			setSelect(item.language)
		}
		else {
			setSelect(item.name)
		}
		onSelect(item)
	}

	return (
		<div class="dropdown">
			<button
				class="text-left d-flex justify-content-between align-items-center pr-4  profile-input dropdown-toggle"
				type="button"
				id="dropdownMenuButton"
				data-toggle="dropdown"
				aria-haspopup="true"
				aria-expanded="false"
			>
				{select ? select : (type === 'language' ? "English" : "US Dollar")}
				<i class="fas fa-caret-down caret-dropdown"></i>
			</button>
			<div
				class="profile-dropdown-select dropdown-menu"
				aria-labelledby="dropdownMenuButton"
			>
				{
					list && (type === 'language' ? list.map((item) => {
						return <a class="dropdown-item" onClick={() => handleSelect(item)}>
							{item.language}
						</a>
					})
					: Object.keys(list).map((key) => {
						return <a class="dropdown-item" onClick={() => handleSelect(list[key])}>
							{list[key].name}
						</a>
					}))
				}
			</div>
		</div>
	);
}

function GeneralRow({ head, desc, span, right }) {
	return (
		<>
			<div className="d-flex justify-content-between mt-sm-5 mb-1">
				{head === "Mobile Number" ? (
					<div className="preferences-container-left-top">
						<div className="left-head">{head}</div>
							<div className="preferences-container-right-mobile mb-3">
								{right}
							</div>
						<div className="left-desc">
							{desc}
							<span>{span}</span>
						</div>
					</div>
				) : (
					<div className="preferences-container-left">
						<div className="left-head">{head}</div>
						<div className="left-desc">
							{desc}
							<span>{span}</span>
						</div>
						{head === "Notifications" && (
							<div className="preference-container-right-mobile mb-3">
								{right}
							</div>
						)}
					</div>
				)}
				

				{(head === "Mobile Number" || head ==="Notifications") && right ? (
					<div className="preferences-container-right-top">
						{right}
					</div>
				) : (
					<div className="preferences-container-right">{right}</div>
				)}
			</div>{" "}
			<hr className="mt-sm-5 " />
		</>
	);
}

function Preferences() {
	const { user, storeUser } = useUser();
	const { alert, storeAlert } = useAlert();

	const handleLanguageSelect = (lang) => {
		userAPI.updateLanguage(user.userid, lang.language)
			.then(
				response => {
					if (response.code === 200) {
						storeAlert({
							...alert,
							successSnackbarOpen: true,
							successSnackbarMessage: response.message
						})

						storeUser({
							...user,
							wallet_language: lang.language
						})
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

	const handleCurrencySelect = (currency) => {
		userAPI.updateCurrency(user.userid, currency.name)
			.then(
				response => {
					if (response.code === 200) {
						storeAlert({
							...alert,
							successSnackbarOpen: true,
							successSnackbarMessage: response.message
						})

						storeUser({
							...user,
							wallet_currency: currency.name
						})
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

	const handleEmailChange = (value) => {
		userAPI.updateEmail(user.userid, value)
			.then(
				response => {
					if (response.code === 200) {
						storeAlert({
							...alert,
							successSnackbarOpen: true,
							successSnackbarMessage: response.message
						})

						storeUser({
							...user,
							email_noti: value
						})
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

	const handleSMSChange = (value) => {
		userAPI.updateSMS(user.userid, value)
			.then(
				response => {
					if (response.code === 200) {
						storeAlert({
							...alert,
							successSnackbarOpen: true,
							successSnackbarMessage: response.message
						})

						storeUser({
							...user,
							sms_noti: value
						})
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
		<div className="general-container">
			<GeneralRow
				head="Mobile Number"
				desc="Your mobile phone can be used to enable two-factor authentication,helping to secure your wallet from unauthorized access,and to send bitcoin payment alerts when you receive funds."
				right={user.mobile ? user.mobile : "Add Mobile Number"}
			/>
			<GeneralRow
				head="Wallet Language"
				desc="Set your preferred language."
				right={<Dropdown selected={user.wallet_language} list={languages.getData().sort()} type="language" onSelect={item => handleLanguageSelect(item)} />}
			/>
			<GeneralRow
				head="Local Currency"
				desc="Select your local currency."
				right={<Dropdown selected={user.wallet_currency} list={CurrencyList.getAll("en")} type="currency" onSelect={item => handleCurrencySelect(item)} />}
			/>
			<GeneralRow
				head="Notifications"
				desc="Choose how to get notified when you receive crypto."
				right={<CheckBoxes isEmail={user.email_noti} isSMS={user.sms_noti} onEmail={value => handleEmailChange(value)} onSMS={value => handleSMSChange(value)} />}
			/>
		</div>
	);
}

export default Preferences;
