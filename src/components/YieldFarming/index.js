import React from "react";
import "./styles.css";
import data from "./data.json";
import logo from "../../assets/196.png";
import { useMediaQuery } from "react-responsive";

const Logo = () => {
	return <img className="cell-logo" src={logo} alt="Logo" />;
};

const TableBodyCell = ({ data, id }) => {
	if (id === "totalValue") {
		return (
			<div className="totalValue-cell">
				<p className="m-0">${data[id].value.toLocaleString()}</p>
				<span className="text-right d-block">
					{data[id].percentage}% out of total
				</span>
			</div>
		);
	} else if (id === "rewardType") {
		return (
			<div
				className={`d-flex align-items-center flex-wrap rewardType-cell`}
			>
				{data[id].map((d) => (
					<p className="m-0 d-flex align-items-center">
						<Logo /> {d}
					</p>
				))}
			</div>
		);
	} else if (id === "apy") {
		return (
			<div className="apy-cell">
				<p className="text-center m-0">{data[id].yearly}% Yearly</p>
				<span className="text-left d-block">
					{data[id].daily}% Daily
				</span>
			</div>
		);
	} else if (id === "loss") {
		return (
			<div className={`d-flex flex-wrap loss-cell`}>
				<p className="m-0">{data[id]}</p>
			</div>
		);
	} else if (id === "pool") {
		return (
			<p className="d-flex align-items-center m-0">
				<Logo /> {data[id]}
			</p>
		);
	}
	return (
		<p
			className="m-0"
			style={{
				color: id === "pair" ? "#5B7ADA" : "initial",
			}}
		>
			{data[id]}
		</p>
	);
};

const YieldFarmingTable = () => {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	//can also add custom className
	const headersData = [
		{
			title: "#",
			key: "id",
			width: isMobile ? 10 : 40,
		},
		{
			title: "Pool",
			key: "pool",
			width: isMobile ? 180 : 200,
		},
		{
			title: "Pair",
			key: "pair",
			width: isMobile ? 120 : 150,
		},
		{
			title: "Total Value Locked",
			key: "totalValue",
			width: isMobile ? 160 : 200,
		},
		{
			title: "Reward Type",
			key: "rewardType",
			width: isMobile ? 120 : 200,
		},
		{
			title: "Impermanent Loss",
			key: "loss",
			width: isMobile ? 150 : 200,
		},
		{
			title: "APY",
			key: "apy",
			width: isMobile ? 120 : 150,
		},
	];

	return (
		<table className="w-100 yield-farming-table">
			<tr className="w-100 d-flex p-3 table-header">
				{headersData.map((h) => (
					<th
						key={h.key}
						style={{
							width: h.width,
						}}
						className={`table-header-cell text-left ${h.className}`}
					>
						{h.title}
					</th>
				))}
			</tr>
			<div className="mr-3 table-body">
				{data.data.map((d) => (
					<tr className="w-100 d-flex p-3 table-row">
						{headersData.map((h) => {
							return (
								<td
									style={{
										width: h.width,
									}}
									className={`text-left table-body-cell ${h.className}`}
								>
									<TableBodyCell
										key={h.key}
										data={d}
										{...h}
										id={h.key}
									/>
								</td>
							);
						})}
					</tr>
				))}
			</div>
		</table>
	);
};

const BreadCrums = () => {
	return (
		<div className="mt-4 mb-3 d-flex align-items-center breadcrums-container">
			<h5 className="p-1 p-sm-2 pl-sm-4 pr-sm-4 mr-3 breadcrum">
				New Projects
			</h5>
			<h5 className="p-1 p-sm-2 pl-sm-4 pr-sm-4 mr-3 breadcrum">
				Highest APY's
			</h5>
			<h5 className="p-1 p-sm-2 pl-sm-4 pr-sm-4 d-flex align-items-center breadcrum">
				Implement Loss Calculator <span className="to-bottom-icon" />
			</h5>
		</div>
	);
};

function YieldFarming() {
	return (
		<div
			className={`ml-sm-4 pt-sm-4 overflow-auto w-100 yield-farming-container`}
		>
			<h1 className="text-left font-weight-bold launch-pool-heading">
				Yield Farming
			</h1>
			<BreadCrums />
			<div className="overflow-auto bg-white p-sm-4 w-100 yieldFarmingContainer">
				<YieldFarmingTable />
			</div>
		</div>
	);
}

export default YieldFarming;
