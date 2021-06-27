import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { addUsers } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";
import RegisterPanel from "./components/authPanel/RegisterPanel";

class AddUsers extends RegisterPanel {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.addUsers(newUser);
  }

  render() {
    const { errors } = this.state;

    return (
            <div className="col-6 m-auto">
              <div className="card mt-4">
                <div className="card-header bg-primary">
                  <h1 className="display-4 text-white text-center">Sign Up</h1>
                </div>
                <div className="card-body bg-light">
                  <p className="lead text-dark text-center">
                    Create a new account
                  </p>
                  <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="Name"
                      name="name"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />

                    <TextFieldGroup
                      placeholder="Email"
                      name="email"
                      type="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />

                    <TextFieldGroup
                      placeholder="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />
                    <TextFieldGroup
                      placeholder="Confirm Password"
                      name="password2"
                      type="password"
                      value={this.state.password2}
                      onChange={this.onChange}
                      error={errors.password2}
                    />
                    <input
                      type="submit"
                      className="btn btn-danger btn-block mt-4"
                      value="Sign Up"
                    />
                  </form>
                </div>
              </div>
            </div>
    );
  }
}

AddUsers.propTypes = {
  addUsers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addUsers }
)(withRouter(AddUsers));
