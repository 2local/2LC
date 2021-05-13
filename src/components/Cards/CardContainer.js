import React from "react";
import "./Card.css";
import Logo from "../../assets/2local logo.svg";
import LoginCard from "./LoginCard";
import NewWalletcard from "./NewWalletcard";
import WalletExchange from "./WalletExchange";
import CreateUser from "./CreateUser";
import ForgotPassword from "./ForgotPassword";
import RequestWallet from "./RequestWallet";
import ResetPassword from "./ResetPassword"

function CardContainer({ name }) {
	return (
		<div className="card-container">
			<img className="logo" src={Logo} alt="" />
			{name === "login" ? (
				<LoginCard />
			) : name === "new-wallet" ? (
				<NewWalletcard />
			) : name === "wallet-exchange" ? (
				<WalletExchange />
			) : name === "create-user" ? (
				<CreateUser />
			) : name === "forgot-password" ? (
				<ForgotPassword />
			) : name === "reset-password" ? (
				<ResetPassword />
			) : name === "request-wallet" ? (
				<RequestWallet />
			) : (
				""
			)}
		</div>
	);
}

export default CardContainer;
