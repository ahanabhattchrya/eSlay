import React, { useEffect, useState } from "react";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

import axios from "axios";

const statuses = ["Sold", "On Market", "Sold at Auction", "In Auction"];
function makeItemRow(itemId, name, price, description, image, status, curBid, maxBid, minBid) {
	let statMsg = statuses[status];
	return { itemId, name, price, description, image, statMsg, curBid, maxBid, minBid };
}

const History = (props) => {
	const [table, setTable] = useState([]);

	useEffect(() => {
		let currTable = [];

		axios({
			method: "POST",
			url: "/purchase-history",
			data: { username: props.userInfo.username },
		}).then((response) => {
			console.log(`purchase history response: ${JSON.stringify(response)}`);
			if (response.data["status_code"] === 200) {
				currTable = response.data["item"];

				for (let idx = 0; idx < currTable.length; idx++) {
					let currItem = currTable[idx];
					currTable[idx] = makeItemRow(
						currItem["itemId"],
						currItem["name"],
						currItem["price"],
						currItem["description"],
						currItem["image"],
						currItem["status"],
						currItem["curBid"],
						currItem["maxBid"],
						currItem["minBid"]
					);
				}

				console.log("Retrieved purchase history");
				setTable(currTable);
			}
		});
	}, []);

	return (
		<div className="user-items">
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>Listing</TableCell>
							<TableCell className="desc-col">Description</TableCell>
							<TableCell>Status</TableCell>
							<TableCell>Price</TableCell>
							<TableCell>Current Top Bid</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* This controls the generation of rows for listings */}
						{table.map((row) => (
							<TableRow key={row.itemId}>
								<TableCell>
									<img src={row.image} alt={row.listing} width="120px" />
								</TableCell>
								<TableCell>{row.name}</TableCell>
								<TableCell className="desc-col">{row.description}</TableCell>
								<TableCell>{row.status}</TableCell>
								<TableCell>${row.price}</TableCell>
								<TableCell>{row.maxBid}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				{!(table.length > 0) && <h2 className="empty-cell">You've never purchased an item!</h2>}
			</TableContainer>
		</div>
	);
};

export default History;
