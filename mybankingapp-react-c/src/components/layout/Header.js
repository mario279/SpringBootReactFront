import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/securityActions";

class Header extends Component {
  logout() {
    this.props.logout();
    window.location.href = "/";
  }

  render() {
    const { validToken, user } = this.props.security;
    const userIsAuthenticated = (
      <nav className="blue darken-3">
        <div className="nav-wrapper  container">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/MainPanel">Dashboard</a>
            </li>

            <li>
              <a href="/AddPayment">Add Payment</a>
            </li>

            <li>
              <Link
                className="waves-effect waves-light btn"
                to="/logout"
                onClick={this.logout.bind(this)}
              >
                logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
    const userIsNotAuthenticated = (
      <nav className="blue darken-3">
        <div className="nav-wrapper  container">
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/login">Login</a>
            </li>

            <li>
              <a href="/register">Signup</a>
            </li>
          </ul>
        </div>
      </nav>
    );

    let headerLinks;
    if (validToken && user) {
      headerLinks = userIsAuthenticated;
    } else {
      headerLinks = userIsNotAuthenticated;
    }
    return (
      <div>
        <nav className="blue darken-3">
          <div className="nav-wrapper  container">
            <a
              href="/MainPanel"
              className="brand-logo d-flex justify-content-left"
            >
              Payment Portal
            </a>
            {headerLinks}
          </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  security: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  security: state.security
});
export default connect(mapStateToProps, { logout })(Header);
