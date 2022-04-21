import React, { Component } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getUsers } from "../../actions/authActions";
import { getAdminUsers } from "../../actions/authActions";
import { connect } from "react-redux";

class ShowUsers extends Component {
  componentDidMount() {
    if (this.props.auth.isAdmin) {
      this.props.getAdminUsers();
    } else {
      this.props.getUsers();
    }
  }

  render() {
    const { allUsers } = this.props.auth;
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allUsers &&
              allUsers.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>{value.name}</TableCell>
                  <TableCell>{value.email}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

ShowUsers.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers, getAdminUsers })(ShowUsers);
