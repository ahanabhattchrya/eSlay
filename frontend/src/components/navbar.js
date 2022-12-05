import React from "react";
import { Link } from "react-router-dom";
import {Button, Grid} from "@material-ui/core";
import { typography } from '@mui/system';

const Navbar = () => {
    return (
        <div class="navBar" sx={{ width: 500, height: 2000, border: '3px solid black', borderRadius: 2, display: 'flex', alignItems: 'center'}}>
        <center>
          <Grid container xs = {12} padding={3} direction="row" alignItems="center" style = {{ textAlign: "left", backgroundColor: "black", height: 70, justifyContent: "flex-end"}}>
            <Grid item xs={1} >
              <Button variant="text" color="secondary" size="large" component={Link} to="/" style={{ opacity: "90%", letterSpacing: "0.15em", height: "40px"}}>
                <p>
                  <b>Home</b>
                </p>
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="text" color="secondary" size="large" component={Link} to="/" style={{ opacity: "90%", letterSpacing: "0.15em"}}>
                <p>
                    <b>Items</b>
                </p>
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="text" color="secondary" size="large" component={Link} to="/" style={{ opacity: "90%", letterSpacing: "0.15em" }}>
                <p>
                    <b>Auctions</b>
                </p>
              </Button>
            </Grid>
            <Grid item xs={1}>
              <Button variant="text" color="secondary" size="large" component={Link} to="/login" style={{ opacity: "90%", letterSpacing: "0.15em" }}>
                <p>
                    <b>Login</b>
                </p>
              </Button>
            </Grid>
          </Grid>
        </center>
      </div>
    );
};

export default Navbar;