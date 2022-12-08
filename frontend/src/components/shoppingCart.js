/* This page is the shopping cart page for users to add items to and view their current items in the cart */
import React from "react";
import { TextField, Button, Select, MenuItem, InputLabel, Checkbox, Input } from "@material-ui/core";
import FormControl from '@mui/material/FormControl';
import Box from "@mui/material/Box";

import axios from "axios";

let currShoppingCartInfo = {
    username : "",
    shoppingCart : null
};

// GET Request to verify that we have a current user right now. 
// If this gives us no user, we redirect them to the login page 
// so that they can login
axios({
    method:'GET',
    url:'/user-shopping-cart',
    data: {
        token: Cookies.get("token")
    }
})
.then((response) => {
    if (response["status_code"] == 200) {
        currShoppingCartInfo.username = response["username"];
        currShoppingCartInfo.shoppingCart = response["shopping-cart"]
    }
},
(error) => {
    console.log(error);
});


const ShoppingCart = () => {
    return (
        <div></div>
    );
};

export default ShoppingCart;