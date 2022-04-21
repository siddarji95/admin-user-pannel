import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../../actions/authActions";
import CustomList from "./CustomList";
import routes from "../../routes";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, isAdmin } = this.props.auth;
    console.log(this.props)
    const guestLinks = routes.filter((route)=>{
      return route.group === "guest"
    });
    const userAuthLinks = routes.filter((route)=>{
      return route.group === "auth"
    });
    const adminAuthLinks = routes.filter((route)=>{
      return route.group === "auth" || route.group === "admin"
    });

    return (
      <>
        {isAuthenticated ?
          <>
            <CustomList links={isAdmin ? adminAuthLinks : userAuthLinks} />
            <ListItem button key="logout"
              onClick={this.onLogoutClick.bind(this)}
              component={Link}
              to="/login"
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </>
          : <CustomList links={guestLinks} /> }
      </>
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
