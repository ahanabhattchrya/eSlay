/* This is the page where users can list items */
import React from "react";
import { TextField, Button } from "@material-ui/core";
import Box from "@mui/material/Box";

import axios from "axios";

// function dynInput(cbox) {
// 	if (cbox.checked) {
// 		var input = document.createElement("input");
// 		input.type = "datetime-local";
// 		var div = document.createElement("div");
// 		div.id = cbox.name;
// 		div.innerHTML = "Auction end time ";
// 		div.appendChild(input);
// 		document.getElementById("insertinputs").appendChild(div);
// 	} else {
// 		document.getElementById(cbox.name).remove();
// 	}
// }

const UploadItem = (props) => {
	return (
		<div className="form-container upload-item">
			<Box className="form-box upload-box">
				<form action="/add-item" id="item-upload-form" method="post" enctype="multipart/form-data">
					<label for="item-name">Item name: </label>
					<textarea id="item-name" name="item-name" cols="40" rows="6"></textarea>
					<br />
					<label for="image-price">Price: </label>
					<textarea id="item-price" name="item-price" cols="40" rows="6"></textarea>
					<br />
					<label for="image-description">Description: </label>
					<textarea id="item-description" name="item-description" cols="40" rows="6"></textarea>
					{/* <br />
					<input type="checkbox" id="toAuction" name="toAuction" value="true" onClick={dynInput(this)} />
					<label for="toAuction">Put item up for auction?</label>
					<p id="insertedInputs"></p> */}
					<br />
					<label for="form-file">Image: </label>
					<input id="form-file" type="file" name="upload" />
					<input type="submit" value="Post" />
				</form>
			</Box>
		</div>
	);
};

export default UploadItem;
