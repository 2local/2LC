import React from "react";
import "./Airdrops.css";
import Swissborg from "../../assets/swissborg.png";
import Allohash from "../../assets/Allohash.png";
import CereFinance from "../../assets/Cere Finance.png";
import Goldario from "../../assets/Goldario.png";
import Payshares from "../../assets/Payshares.png";
import Swaprol from "../../assets/Swaprol.png";
import Ultron from "../../assets/Utron.png";

function AirdropCard({
	icon,
	status,
	head,
	desc,
	end,
	rewards,
	twitter,
	mail,
	telegram,
	color,
}) {
	return (
		<div className=" airdrop-card-container">
			<div className="d-flex justify-content-between align-items-center">
				<img width="30px" src={icon} alt="" />
				<div className="d-flex align-items-center ">
					<div
						style={{
							marginRight: "0.5rem",
							borderRadius: "50%",
							height: "5px",
							width: "5px",
							backgroundColor: color,
						}}
					></div>
					<span
						className="font-weight-bold"
						style={{ color: color, fontSize: "14px" }}
					>
						{status}
					</span>
				</div>
			</div>
			<h1 className="airdrop-card-head">{head}</h1>
			<p className="airdrop-card-para">{desc}</p>
			<div className="airdrop-card-line"></div>
			<div className="d-flex justify-content-between align-items-center flex-wrap">
				<div className="airdrop-card-bottom">
					End Date
					<div>{end}</div>
				</div>
				<div className="airdrop-card-bottom">
					Rewards
					<div>≈ ${rewards}</div>
				</div>
				<div className="airdrop-card-bottom">
					Requirements
					<div className="card-bottom-requirements">
						{twitter && <i class="fab fa-twitter"></i>}
						{mail && <i class="fas fa-envelope"></i>}
						{telegram && <i class="fas fa-paper-plane"></i>}
					</div>
				</div>
			</div>
		</div>
	);
}

function Airdrops() {
	return (
		<div className="pl-md-4 pt-md-4">
			<div className="airdrop-container">
				<h1 className="airdrop-head ">Airdrops</h1>
				<div className="row d-flex flex-wrap mt-4">
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={Swissborg}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={Allohash}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={CereFinance}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={Goldario}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={Payshares}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={Swaprol}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col-sm-12 col-md-4 col-lg-3">
						<AirdropCard
							icon={Ultron}
							status="Active"
							head="SwissBorg"
							desc="The community is one of the key values of SwissBorg. We were growing rapidly and constantly and that’s all thanks to your support."
							end="31-03-2021"
							rewards="10.5"
							twitter
							mail
							telegram
							color="#A8C33B"
						/>
					</div>
					<div className="col"></div>
				</div>
			</div>
		</div>
	);
}

export default Airdrops;
