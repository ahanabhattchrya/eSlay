import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Box, Tabs } from "@material-ui/core";
import "../../assets/css/userInfo.scss";

const UserInfo = (props) => {
	return (
		<div className="user-info">
			<Box>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<h1>Welcome {props.userInfo.username}!</h1>
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody className="user-data">
							<TableRow>
								<TableCell>
									<h3>Points: {props.userInfo.points}</h3>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<h3>Reward Level: {props.userInfo.rewardLevel}</h3>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>
									<h3>All Time Profit: {props.userInfo.totalProfit}</h3>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</div>
	);
};

export default UserInfo;
