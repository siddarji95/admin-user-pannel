import React, { Component } from "react";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/authActions";
import { getAdminUsers } from "../../actions/authActions";
import { connect } from "react-redux";

class ShowUsers extends Component {

  componentDidMount() {
    if (this.props.auth.isAdmin) {
      this.props.getAdminUsers();
    }
    else {
      this.props.getUsers();
    }
  }

  render() {
    const { allUsers, isAdmin } = this.props.auth;
    return ( 
        <div className="col-6 m-auto dashboard">
            <h1 className="display-8 text-center">{ isAdmin ? 'Admin ':''}Users</h1>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                </tr>
            </thead>
            <tbody>
           { allUsers && allUsers.map((value, index) => {
             return <tr key={index}><td >{value.name}</td><td>{value.email}</td></tr>
            })}
            </tbody>
            </table>  
        </div>
    );
  }
}

ShowUsers.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
    mapStateToProps,
    { getUsers, getAdminUsers }
  )(ShowUsers);