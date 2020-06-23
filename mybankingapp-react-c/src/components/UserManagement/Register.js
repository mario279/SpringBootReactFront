import React, { Component } from "react";
import { createNewUser } from "../../actions/securityActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      fullName: "",
      password: "",
      confirmPassword: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      fullName: this.state.fullName,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };
    console.log("inside onsubmit, this is password: " + newUser.password);
    this.props.createNewUser(newUser, this.props.history);
  }
  static getDerivedStateFromProps(props, prevState) {
    if (props.errors !== prevState.errors) {
      console.log("inside the getDerived, its marking an error");
      return {
        errors: props.errors
      };
    }
  }
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/MainPanel");
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="col-md-5 relative align-self-center">
        <form
          action="#"
          className="registerForm rounded pb_form_v1"
          onSubmit={this.onSubmit}
        >
          <h2 className="mb-4 mt-0 text-center">Sign Up for Free</h2>
          <div className="form-group">
            <input
              type="text"
              className="form-control pb_height-50 reverse"
              name="username"
              required
              placeholder="User Name"
              className={classnames(
                "border",
                { "is-invalid": this.props.errors.username },
                { "border-danger": this.props.errors.username }
              )}
              defaultValue={this.state.username}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pb_height-50 reverse"
              placeholder="full name"
              name="fullName"
              required
              className={classnames(
                "border",
                { "is-invalid": this.props.errors.fullName },
                { "border-danger": this.props.errors.fullName }
              )}
              defaultValue={this.state.fullName}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pb_height-50 reverse"
              placeholder="Password"
              name="password"
              required
              className={classnames(
                "border",
                { "is-invalid": this.props.errors.password },
                { "border-danger": this.props.errors.password }
              )}
              defaultValue={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control pb_height-50 reverse"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              className={classnames(
                "border",
                { "is-invalid": this.props.errors.confirmPassword },
                { "border-danger": this.props.errors.confirmPassword }
              )}
              defaultValue={this.state.confirmPassword}
              onChange={this.onChange}
            />
          </div>

          <div className="row">
            <div className="input-field col s12">
              <button
                className="btn cyan waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Register.propTypes = {
  createNewUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  errors: state.errors,
  security: state.security
});

export default connect(mapStatetoProps, { createNewUser })(Register);
