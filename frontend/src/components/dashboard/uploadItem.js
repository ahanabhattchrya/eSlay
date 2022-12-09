/* This is the page where users can list items */
import React from "react";
import { TextField, Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import axios from "axios";

const UploadItem = () => {
	return (
		<div className="form-container upload-item">
			<Box className="form-box upload-box">
				<div className="input-container">
					<div className="small-fields">
						<TextField required id="outlined-required" label="Item Name" variant="outlined" />
						<TextField required id="outlined-required" label="Price" variant="outlined" />
					</div>
					<div className="large-fields">
						<TextField required multiline rows="3" id="outlined-required" label="Description" variant="outlined" />
					</div>
				</div>
				<Button variant="contained" color="secondary" component="label">
					Upload Image
					<input hidden accept="image/*" multiple type="file" />
				</Button>
				<Button variant="contained" color="primary" size="large">
					List item
				</Button>
			</Box>
		</div>
	);
};

export default UploadItem;
