import React from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Grid, Box, Tabs,  } from "@material-ui/core";
import "../../assets/css/userInfo.scss";

const UserInfo = (props) => {
	return (
		<div className="user-info">
			<Box>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell><h1>Welcome !</h1></TableCell>
						</TableRow>
					</TableHead>
					<TableBody className="user-data">
						<TableRow>
							<TableCell><h3>Points: </h3></TableCell>
						</TableRow>
						<TableRow>
							<TableCell><h3>Reward Level: </h3></TableCell>
						</TableRow>
						<TableRow>
							<TableCell><h3>All Time Profit: </h3></TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			</Box>
		</div>
	);
};

export default UserInfo;
