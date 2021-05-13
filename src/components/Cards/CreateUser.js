import React from "react";
import { useHistory, Link } from "react-router-dom";
import { useAlert } from '../../hook/Context/AlertContext'
import Logo from "../../assets/2local logo wht.svg";
import "./Card.css";
import Country from "../Country/Country"
import { getData } from 'country-list'
// call api
import userAPI from "../../apis/user";
import { useUser } from '../../hook/Context/UserContext'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

function Dropdown({ title }) {
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
				{title}
				<i class="fas fa-caret-down caret-dropdown"></i>
			</button>
			<div
				class="profile-dropdown-select dropdown-menu"
				aria-labelledby="dropdownMenuButton"
			>
				<a class="dropdown-item" href="#">
					Action
				</a>
				<a class="dropdown-item" href="#">
					Another action
				</a>
				<a class="dropdown-item" href="#">
					Something else here
				</a>
			</div>
		</div>
	);
}

function CreateUser() {
	const history = useHistory();
	const { alert, storeAlert } = useAlert();
	const { user, storeUser } = useUser();

	const [accountInfo, setAccountInfo] = React.useState({
		fullName: "",
		country: {},
		address: "",
		mobile: "",
        mobile_country: null,
		email: user.email,
		user_secret: user.user_secret
	})
	const [countryList, setCountryList] = React.useState(null)

	React.useEffect(() => {
		setCountryList(getData().sort())
	}, [])

	const handleGetSelectedCountry = currentCountry => {
		setAccountInfo(accountInfo => ({ ...accountInfo, country: currentCountry }))
	}

	const handleInputChange = event => {
		event.persist()

		switch (event.target.id) {
			case 'full_name':
				setAccountInfo(accountInfo => ({ ...accountInfo, fullName: event.target.value }))
				break
			case 'address':
				setAccountInfo(accountInfo => ({ ...accountInfo, address: event.target.value }))
				break
			case 'mobile':
				setAccountInfo(accountInfo => ({ ...accountInfo, mobile: event.target.value }))
				break
		}
	}

	const handleMobileNumberChange = (value, country, e, formattedValue) => {
		setAccountInfo(accountInfo => ({ ...accountInfo, mobile: formattedValue }))

        if (!accountInfo.mobile_country || (accountInfo.mobile_country && accountInfo.mobile_country.countryCode != country.countryCode)) {
            setAccountInfo(accountInfo => ({ ...accountInfo, mobile_country: country }));
            setAccountInfo(accountInfo => ({ ...accountInfo, mobile: "+" + country.dialCode }))
        }
	}

	const validate = () => {
		if (!accountInfo.fullName) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, enter your full name."
			})

			return false;
		}

		if (JSON.parse(accountInfo.country === JSON.stringify({})) || accountInfo.country === null) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, enter your Country."
			})

			return false;
		}

		if (!accountInfo.address) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Please, enter your address."
			})

			return false;
		}

		return true;
	}

	const OnCreateUser = () => {
		if (validate()) {
			userAPI.createUser(accountInfo)
				.then(
					response => {
						if (response.code === 200) {
							storeAlert({
								...alert,
								successSnackbarOpen: true,
								successSnackbarMessage: response.message
							})
							history.push("/login");
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
				<h1 className="newwallet-card-heading">Create user</h1>
				<div className="line"></div>
				<label className="newwallet-card-label" htmlFor="">
					Full Name
				</label>
				<input
					className="login-card-input"
					type="text"
					placeholder="Adam Sydanus"
					id="full_name"
					value={accountInfo.fullName}
					onChange={handleInputChange}
				/>
				<label className="newwallet-card-label" htmlFor="">
					Country
				</label>
				<Country
					countryList={countryList !== null ? countryList : []}
					getSelectedCountry={handleGetSelectedCountry}
					// generalRequired={generalRequired}
					currentCountry={accountInfo.country}
				/>
				<label className="newwallet-card-label" htmlFor="">
					Address
				</label>
				<input
					className="login-card-input"
					type="text"
					placeholder="4622 Linda Street"
					id="address"
					value={accountInfo.address}
					onChange={handleInputChange}
				/>
				<label className="newwallet-card-label" htmlFor="">
					Mobile Number
				</label>
				<PhoneInput
                    placeholder='Enter phone number'
					country="ua"
					value={accountInfo.mobile}
					onChange={handleMobileNumberChange}	
				/>
				{/* <div className="agree-to-terms">
					<input type="checkbox" className="checkbox" />I understand
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
				</div> */}
				<button className="login-btn" onClick={OnCreateUser}>Create account</button>
			</div>

			{/* <div className="login-card-no-wallet">
				Already have a Wallet? <span>Log in</span>{" "}
			</div> */}
		</>
	);
}

export default CreateUser;
