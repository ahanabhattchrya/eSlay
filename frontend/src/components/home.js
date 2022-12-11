/*This page is the / path, meaning everything that should rendered when the user visits our site should be here. 
    We will then call this component in <App /> along with all the other paths*/
import React from "react";
import { Button, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "../assets/css/home.scss";

const Home = () => {
	return (
		<div className="home">
			<div className="home-col">
				<Box className="home-box home-box1" sx={{ lineHeight: 4 }}>
					<Typography component="div">
						<Box sx={{ lineHeight: 2, fontSize: "h3.fontSize", fontWeight: "bold" }}>Why E-Slay?</Box>
						<Box sx={{ lineHeight: 2, fontSize: "h5.fontSize", textAlign: "center" }}>
							Because it's slay and better than ebay! We provide live auctions and various items from other users all within the reach of your fingertips! Keep scrolling to know more
							about us and what we do!
						</Box>
					</Typography>
				</Box>
				<Box className="home-box">
					<img src="/images/slay.gif" alt="slay gif" />
				</Box>
			</div>
			<div className="home-col">
				<Box className="home-box">
					<img src="/images/slay.gif" alt="slay gif" />
				</Box>
				<Box className="home-box home-box1" sx={{}}>
					<Typography component="div">
						<Box sx={{ lineHeight: 2, fontSize: "h3.fontSize", fontWeight: "bold" }}>First Time Here?</Box>
						<Box sx={{ lineHeight: 2, fontSize: "h5.fontSize", textAlign: "center" }}>
							There's a whole world of people ready to buy your used or new items. <br /> <b>Register here now!</b>
						</Box>
					</Typography>
					<Button variant="contained" color="primary" component={Link} to="/register">
						Register
					</Button>
				</Box>
			</div>
		</div>
	);
};

export default Home;
