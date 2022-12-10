/* This is the page where users can list items */
import React from "react";
import { TextField, Button } from "@material-ui/core";
import Box from "@mui/material/Box";

import axios from "axios";


let currItemInfo = {
	name : "",
	description : "",
	price : "",
	image : ""
}

function sendItem(userInfo){

	axios({
		method : 'POST',
		url : '/add-item',
		data: {
			username : userInfo.username,
			name : currItemInfo.name,
			price : currItemInfo.price,
			description : currItemInfo.description,
			image : currItemInfo.image
		}
	})
	.then((response) => {
		if (response.data["status_code"] == 200) {
			window.location.replace("http://localhost:3030/item-listings")
		}
	});
};


// Functions For the OnChange Events
function nameChange(value){ currItemInfo.name = value; }
function priceChange(value){ currItemInfo.price = value; }
function descriptionChange(value){ currItemInfo.description = value; }
function imageChange(value){ currItemInfo.image = value; }

const UploadItem = (props) => {
	return (
		<div className="form-container upload-item">
			<Box className="form-box upload-box">
				<div className="input-container">
					<div className="small-fields">
						<TextField required id="outlined-required" label="Item Name" variant="outlined" onChange={(event) => nameChange(event.target.value)} />
						<TextField required id="outlined-required" label="Price" variant="outlined" onChange={(event) => priceChange(event.target.value)} />
					</div>
					<div className="large-fields">
						<TextField required multiline rows="3" id="outlined-required" label="Description" variant="outlined" onChange={(event) => descriptionChange(event.target.value)} />
					</div>
				</div>
				<Button variant="contained" color="secondary" component="label">
					Upload Image
					<input hidden accept="image/*" type="file" onChange={(event) => imageChange(event.target.value)} />
				</Button>
				<Button variant="contained" color="primary" size="large" onClick={sendItem(props.userInfo)}>
					List item
				</Button>
			</Box>
		</div>
	);
};

export default UploadItem;
