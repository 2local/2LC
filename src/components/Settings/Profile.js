import React, { useEffect, useState } from "react";
import Icon from "../../assets/Rectangle 337.png";
import "./styles.css";
import { useUser } from '../../hook/Context/UserContext'
import Country from "../Country/Country"
import { getData } from 'country-list'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import userAPI from "../../apis/user";
import { useAlert } from '../../hook/Context/AlertContext'
import Button from "@material-ui/core/Button";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }));

function ProfileTop(props) {
    const classes = useStyles();
	const { clickButton } = props
	const [error, seterror] = useState("");
	const { user, storeUser } = useUser();
	const { alert, storeAlert } = useAlert();

	const [profile_image, setProfileImg] = useState("")
	useEffect(() => {
		setProfileImg(user.profile_image ? SERVER_URL + user.profile_image : GetAvartarFromName(user.full_name));
	}, [user.full_name, user.profile_image])

	const handleSaveChanges = () => {
		clickButton();
	}

	const GetAvartarFromName = (name) => {
		var name = name.trim();
		var res = "https://eu.ui-avatars.com/api/?name=" + name + "&background=edf6fd&color=53A8F0&font-size=0.33&bold=true&size=56";

		return res;
	}

	const onFileChange = (e) => {
		const files = e.target.files[0];
		if (files !== undefined) {
			if (files.size > 9000000) {
				seterror("File size is too large select below 1mb");
			} else {
				seterror("");
				onChangeImage(e);
			}
		}
	}

	const onChangeImage = (event) => {
		const reader = new FileReader();
		const files = event.target.files[0];
		let url = reader.readAsDataURL(files);

		userAPI.profilefile(user.userid, files).then((response) => {
			if (response.code === 200) {
				storeAlert({
					...alert,
					successSnackbarOpen: true,
					successSnackbarMessage: response.message
				});

				storeUser({
					...user,
					profile_image: response.data.name
				})
			} else {
				storeAlert({
					...alert,
					errorSnackbarOpen: true,
					errorSnackbarMessage: response.message
				})
			}
		});
	}

	return (
		<div className="profile-head">
			<div className="profile-left">
                <Avatar src={profile_image} className={classes.large}></Avatar>
				{/* <img className="profile-img" src={profile_image} alt="" /> */}
				<div className="ml-4">
					<div className="profile-name">{user.full_name}</div>
					<input accept="image/*" id="avatar" className="panel-upload-input" type="file" onChange={onFileChange} />
					<label htmlFor="avatar">
						<Button className="panel-upload-btn mt-1"
							color="primary"
							component="span">
							<small className="pr-8">Upload</small>
						</Button>
					</label>
					<small color="error">{error}</small>
				</div>
			</div>
			<button className="save-changes" onClick={handleSaveChanges}>Save changes</button>
		</div>
	);
}

function DateOfBirth() {
	return (
		<div className="profile-input d-flex justify-content-between align-items-center">
			<input type="text" className="profile-calendar-input" />
			<i class="fas fa-calendar-alt mr-4 calendar-icon"></i>
		</div>
	);
}

function CountryDropdown() {
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
				California, USA
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

function Inputs(props) {
	const { label, id, value, changeInput } = props
	const handleChange = event => {
		changeInput(event.target.id, event.target.value)
	}

	const [countryList, setCountryList] = React.useState(null)

	React.useEffect(() => {
		setCountryList(getData().sort())
	}, [])

	const handleGetSelectedCountry = currentCountry => {
		changeInput(currentCountry)
	}

	const handleDateChange = (date) => {
		changeInput(date)
	};

	const handleMobileNumberChange = (value, country, e, formattedValue) => {
		changeInput(value, formattedValue, country);
	}

	return (
		<div className="col-sm mt-3 ">
			<label className="profile-label" htmlFor="">
				{label}
			</label>
			<br />
			{label === "Country" ? (
				<Country
					countryList={countryList !== null ? countryList : []}
					getSelectedCountry={handleGetSelectedCountry}
					// generalRequired={generalRequired}
					currentCountry={value}
				/>
			) : label === "Date of birth" ? (
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						label="Material Date Picker"
						format="yyyy-MM-dd"
						variant="dialog"
						value={value}
						onChange={handleDateChange}
					/>
				</MuiPickersUtilsProvider>
			) : label === "Mobile Number" ? (
				<PhoneInput
                    placeholder='Enter phone number'
					country="ua"
					value={value}
					onChange={handleMobileNumberChange}
				/>
			) : (
				<input className="profile-input" type="text" id={id} value={value} onChange={handleChange} />
			)}
		</div>
	);
}

function Profile() {
	const { user, storeUser } = useUser();
	const { alert, storeAlert } = useAlert();

	const [profile, setProfile] = React.useState({
		full_name: "",
		profile_image: "",
		email: "",
		address: "",
		mobile: "",
        mobile_country: {},
		dob: "",
		country: {},
	})
	React.useEffect(() => {
		setProfile({
			full_name: user.full_name,
			profile_image: user.profile_image,
			email: user.email,
			address: user.address,
			mobile: user.mobile,
			dob: user.dob,
			country: user.country,
		})
	}, [user])

	const handleChangeInput = (id, value) => {
		switch (id) {
			case "full_name":
				setProfile(profile => ({ ...profile, full_name: value }))
				break;
			case "email":
				setProfile(profile => ({ ...profile, email: value }))
				break;
			case "address":
				setProfile(profile => ({ ...profile, address: value }))
				break;
		}
	}

	const handleChangeMobile = (value, formattedValue, country) => {
		setProfile(profile => ({ ...profile, mobile: formattedValue }));

        if (!profile.mobile_country || (profile.mobile_country && profile.mobile_country.countryCode != country.countryCode)) {
            setProfile(profile => ({ ...profile, mobile_country: country }));
            setProfile(profile => ({ ...profile, mobile: "+" + country.dialCode }))
        }
	}

	const handleSelCountry = selcountry => {
		setProfile(profile => ({ ...profile, country: selcountry }));
	}

	const handleChangeDate = changedDate => {
		setProfile(profile => ({ ...profile, dob: changedDate }))
	}

	const validateEmail = email => {
		const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		if (email.match(mailformat)) {
			return true
		}

		return false
	}

	const validate = () => {
		if (!validateEmail(profile.email)) {
			storeAlert({
				...alert,
				errorSnackbarOpen: true,
				errorSnackbarMessage: "Invalid your email!"
			})

			return false;
		}

		return true
	}

	const handleClickButton = () => {
		if (!validate()) {
			return
		}
		
		userAPI.updateProfile(user.userid, profile)
			.then(
				response => {
					if (response.code === 200) {
						storeUser({
							...user,
							full_name: profile.full_name,
							profile_image: profile.profile_image,
							email: profile.email,
							address: profile.address,
							mobile: profile.mobile,
							dob: profile.dob,
							country: profile.country,
						})

						storeAlert({
							...alert,
							successSnackbarOpen: true,
							successSnackbarMessage: response.message
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
		<div className="profile-container">
			<ProfileTop clickButton={handleClickButton} />
			<div className=" mt-sm-5 row">
				<Inputs label="Full Name" id="full_name" value={profile.full_name} changeInput={handleChangeInput} />
				<Inputs label="Address" id="address" value={profile.address} changeInput={handleChangeInput} />
			</div>
			<div className=" mt-sm-5 row">
				<Inputs label="Email Address" id="email" value={profile.email} changeInput={handleChangeInput} />
				<Inputs label="Mobile Number" id="mobile" value={profile.mobile} changeInput={handleChangeMobile} />
			</div>
			<div className=" mt-sm-5 row">
				<Inputs label="Country" id="country" value={profile.country} changeInput={handleSelCountry} />
				<Inputs label="Date of birth" id="dob" value={profile.dob} changeInput={handleChangeDate} />
			</div>
			<button className="save-changes-mobile mt-4">Save changes</button>
		</div>
	);
}

export default Profile;
