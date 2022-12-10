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

function getBuffer(fileData) {
	return function(resolve) {
		var reader = new FileReader();
		reader.readAsArrayBuffer(fileData);
		reader.onload = function() {
			let arrayBuffer = reader.result;
			let bytes = new Uint8Array(arrayBuffer);
			resolve(bytes);
		}
	}
}

function sendItem(userInfo){

	let input = document.getElementById("itemImg");

	let files = input.files;

	let formData = new FormData();

	formData.append("username", userInfo.username);
	formData.append("name", currItemInfo.name)
	formData.append("price", currItemInfo.price)
	formData.append("description", currItemInfo.description)
	formData.append("image", currItemInfo.image)
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
function imageChange(event){
	let file = event.target.files[0];
	let reader = new FileReader();

	console.log(file);
	reader.onload = function(e) {
		currItemInfo.image = e.target.result
	};
	console.log(reader.readAsDataURL(event.target.files[0]));
}

const UploadItem = (props) => {
	return (
		<div className="form-container upload-item">
			<Box className="form-box upload-box">
			<form action="/add-item" id="image-form" method="post" enctype="multipart/form-data">
				<label for="image-form-comment">Comment: </label>
				<textarea id="item-name" name="item-name" cols="40" rows="6"></textarea>
				<br/>
				<label for="image-form-price">Price: </label>
				<textarea id="item-price" name="item-price" cols="40" rows="6"></textarea>
				<br/>
				<label for="image-form-description">Description: </label>
				<textarea id="item-description" name="item-description" cols="40" rows="6"></textarea>
				<br/>
				<label for="form-file">Image: </label>
				<input id="form-file" type="file" name="upload" />
				<input type="submit" value="Post" />
			</form>
				{/* <div className="input-container">
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
					<input hidden accept="image/*" type="file" id="itemImg" onChange={(event) => imageChange(event)}/>
				</Button>
				<Button variant="contained" color="primary" size="large" onClick={() => {sendItem(props.userInfo)}}>
					List item
				</Button> */}
			</Box>
		</div>
	);
};

export default UploadItem;
