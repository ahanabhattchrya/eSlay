import * as React from "react";
import { Button, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

import "../assets/css/auctions.scss";
import { Grid } from "@material-ui/core";

let itemInfo = {
	name: "",
	imgDir: "",
	desc: "",
};

const Auction = (props) => {
	return (
		<div className="auction">
			<Grid container>
				<Grid item className="item-details">
					<img src={itemInfo.imgDir} />
					<h2>Name: {itemInfo.name}</h2>
					<p className="item-desc">{itemInfo.desc}</p>
				</Grid>
				<Grid item className="live-section"></Grid>
			</Grid>
		</div>
	);
};
