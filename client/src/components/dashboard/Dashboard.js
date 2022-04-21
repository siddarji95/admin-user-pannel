import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid,Typography } from "@mui/material";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;
    console.log(this.props)

    return (
      <Grid
        container
        direction='column'
      >
        <Grid item >
          <Typography variant="h2" align="center" component="div">
            Dashboard
          </Typography>
        </Grid>
        <Grid item >
          <Typography variant="p" align="center" component="div">
            Welcome, {user.name}!
          </Typography>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Dashboard);
