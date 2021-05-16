import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  componentDidMount() {
    //If user exists and validation passes then redirect to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
        <div className="col-6 offset-md-3 text-center mt-5 m-auto">
          <div className="card mt-5">
            <div className="card-body">
              <h1 className="display-4">Admin Panel</h1>
              <p>Login or Sign Up for admin to continue</p>
            </div>
          </div>
        </div>
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
