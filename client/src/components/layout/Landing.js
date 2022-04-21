import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Grid, Typography } from "@mui/material";

class Landing extends Component {
  componentDidMount() {
    //If user exists and validation passes then redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <Grid
        container
        direction='column'
      >
        <Grid item >
          <Typography variant="h2" align="center" component="div">
            Admin Panel
          </Typography>
        </Grid>
        <Grid item >
          <Typography variant="p" align="center" component="div">
            Login or Sign Up for admin to continue
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
