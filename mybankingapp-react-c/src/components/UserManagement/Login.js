import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { login } from "../../actions/securityActions";
import MainPanel from "../MainPanel";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      token: "",
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
    const LoginRequest = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.login(LoginRequest);
  }
  // componentDidMount() {
  //   if (this.props.security.validToken) {
  //     console.log("token is valid");
  //   } else console.log("component did mount did not work");
  // }
  static getDerivedStateFromProps(props, state) {
    if (props.security.validToken) {
      console.log("getderived worked!");
      props.history.push("/MainPanel");
      return { token: "true" };
    } else
      return {
        token: "false"
      };
  }

  changeTheState() {
    this.setState({
      errors: this.props.errors
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.errors !== this.props.errors) {
      this.changeTheState();
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
              placeholder="User Name(Email)"
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

Login.propTypes = {
  login: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security,
  errors: state.errors
});
export default connect(mapStateToProps, { login })(Login);
