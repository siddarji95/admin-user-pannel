import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault(); //This prevents default button click action
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const guestLinks = ( //These links will be shown when user isn't logged in
        <div className= "nav flex-column pl-1">
          <Link className="nav-link" to="/register">
           Sign Up
          </Link>
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </div>
    );

    const authLinks = ( //These links will be shown when user is logged in
          <a
            href="login"
            onClick={this.onLogoutClick.bind(this)} //Binding onClick to defined function
            className="nav-link"
          >
            Logout
          </a>
    );

    return (
          <div className="col-3 px-1">
            <div className="nav flex-column flex-nowrap vh-100 overflow-auto text-white p-2">
              <Link className="nav-link" to="/">
                <img src={require('../../img/logo.png')} className="img-fluid" alt=""/>
          </Link>
           {/* Check for which links are to be shown  */}
           {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
