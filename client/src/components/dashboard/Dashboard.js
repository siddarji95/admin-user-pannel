import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Dashboard extends Component {
  render() {
    const { user } = this.props.auth;

    return ( 
        <div className="col-6 m-auto dashboard">
          <h1 className="display-4">Dashboard</h1>
          <h3 className="mt-4">Welcome, {user.name}!</h3>
        </div>
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
