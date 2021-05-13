import React, { useEffect, useState } from "react";
import backImg from "../../assets/Icon feather-image.svg"
import Button from "@material-ui/core/Button";
import { FormControl } from "@material-ui/core";
import { useUser } from '../../hook/Context/UserContext'
import userAPI from "../../apis/user";
import "./styles.css";
const SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS;

function DropLocation({ head, label, onChangeImage, id, image }) {
	const [error, seterror] = useState("");
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

	return (
		<div
			className={`flex-column ${
				head === "ID Document"
					? "panel-drop-location "
					: "panel-drop-location2"
			} d-flex justify-content-center align-items-center`}
		>
			<FormControl>
				<img className="drop-location-image" src={image ? SERVER_URL + image : backImg} />
				{label && <div className="drop-location-title">{label}</div>}
				<input accept="image/*" id={id} className="panel-upload-input" type="file" onChange={onFileChange} />
				<label htmlFor={id} className="align-self-center">
					<Button className="panel-upload-btn mt-1"
						color="primary"
						component="span">
						<small className="pr-8">Upload</small>
					</Button>
				</label>
				<small color="error">{error}</small>
			</FormControl>
		</div>
	);
}

function DragArea({ head, onChangeImage, idFrontImage, idBackImage, bankImage }) {
	return (
		<div className="panel-drag-area mb-sm-5 mb-4">
			{head === "ID Document" ? (
				<>
					<DropLocation id="ID_1" image={idFrontImage} head="ID Document" label="Front Side" onChangeImage={(e) => onChangeImage(e, "id_1")} />
					<DropLocation id="ID_2" image={idBackImage} head="ID Document" label="Back Side" onChangeImage={(e) => onChangeImage(e, "id_2")} />
				</>
			) : (
				<DropLocation id="bank_1" image={bankImage} onChangeImage={(e) => onChangeImage(e, "bank")} />
			)}
		</div>
	);
}

function RadioSelection({ name, value, label, onChange, checked }) {
	return (
		<div className="mb-sm-4 mb-3">
			<input className="panel-radio" type="radio" name={name} checked={checked} id="" value={value} onChange={onChange} />
			<label className="panel-radio-label ml-3" htmlFor="">
				{label}
			</label>
		</div>
	);
}

function Panel({ head, desc }) {
	const { user, storeUser } = useUser();
	const [idRadio, setIdRadio] = useState('0');
	const [idFrontImage, setIdFrontImage] = useState('');
	const [idBackImage, setIdBackImage] = useState('');
	const [bankRadio, setBankRadio] = useState('0');
	const [bankImage, setBankImage] = useState('');

	useEffect(() => {
		user.idproof_type && setIdRadio(user.idproof_type - 1);
		user.idproof_front && setIdFrontImage(user.idproof_front);
		user.idproof_back && setIdBackImage(user.idproof_back);
	}, [user.idproof_type, user.idproof_front, user.idproof_back])

    useEffect(() => {
		user.addproof_type && setBankRadio(user.addproof_type - 1);
		user.addproof_front && setBankImage(user.addproof_front);
	}, [user.addproof_type, user.addproof_front])

	const handleIdChange = (event) => {
        if (user.idproof_type - 1 == event.currentTarget.value) {
            user.idproof_front && setIdFrontImage(user.idproof_front);
            user.idproof_back && setIdBackImage(user.idproof_back);
        }
        else {
            setIdFrontImage('');
            setIdBackImage('');
        }
		setIdRadio(event.currentTarget.value);
	}

	const handleBankChange = (event) => {
        if (user.addproof_type - 1 == event.currentTarget.value) {
            user.addproof_front && setBankImage(user.addproof_front);
        } else {
            setBankImage('');
        }
		setBankRadio(event.currentTarget.value);
	}

	const handleImageChange = (event, type) => {
		const reader = new FileReader();
		const files = event.target.files[0];
		let url = reader.readAsDataURL(files);
		let t = 1;
		let idtype;
		if (type === "id_1") {
			t = 1;
			idtype = ~~idRadio + 1;
		}
		else if (type === "id_2") {
			t = 2;
			idtype = ~~idRadio + 1;
		}
		else if (type === "bank") {
			t = 3;
			idtype = ~~bankRadio + 1;
		}
		userAPI.uploadMedia(user.userid, files, idtype, t).then((res) => {
			switch (t) {
				case 1:
					setIdFrontImage(res.data.front_image)
                    storeUser({
                        ...user,
                        idproof_type: res.data.type,
                        idproof_front: res.data.front_image,
                        idproof_back: res.data.back_image,
                    })
                        break;
				case 2:
					setIdBackImage(res.data.back_image)
                    storeUser({
                        ...user,
                        idproof_type: res.data.type,
                        idproof_front: res.data.front_image,
                        idproof_back: res.data.back_image,
                    })
                        break;
				case 3:
					setBankImage(res.data.front_image)
                    storeUser({
                        ...user,
                        addproof_type: res.data.type,
                        addproof_front: res.data.front_image,
                    })
                    break;			
				default:
					break;
			}
		});
	}
    
	return (
		<div className="panel-wrapper">
			<div className="panel-head">{head}</div>
			<div className="panel-desc mt-3">{desc}</div>
			{head === "ID Document" ? (
				<div>
					{
						["National ID Card", "Passport", "Drivers License"].map((label, index) => {                            
							return <div key={index}>
								<RadioSelection label={label} name="id_radios" value={index} checked={idRadio == index} onChange={handleIdChange} />
								{idRadio == index && <DragArea head="ID Document" idFrontImage={idFrontImage} idBackImage={idBackImage} onChangeImage={handleImageChange} />}
							</div>
						})
					}
				</div>
			) : (
				<div>
					{
						["Bank Statement", "Utility Bill"].map((label, index) => {
							return <div key={index}>
								<RadioSelection label={label} name="bank_radios" value={index} checked={bankRadio == index}  key={index} onChange={handleBankChange} />
								{bankRadio == index && <DragArea onChangeImage={handleImageChange} bankImage={bankImage} />}
							</div>
						})
					}
				</div>
			)}
		</div>
	);
}

function KYC() {
	return (
		<div className="kyc-container">
			<Panel
				head="ID Document"
				desc="Please choose a valid government issued picture identification document."
			/>
			<Panel
				head="Proof of Adress"
				desc="Please choose a bank statement or utility bill which will serve as proof of address."
			/>
		</div>
	);
}

export default KYC;
