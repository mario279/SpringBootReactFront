import React, { Component } from "react";
import { Link } from "react-router-dom";
import Register from "../UserManagement/Register";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class Landing extends Component {
  componentDidMount() {
    if (this.props.security.validToken) {
      this.props.history.push("/MainPanel");
    }
  }
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-lg navbar-dark pb_navbar pb_scrolled-light"
          id="pb-navbar"
        >
          <div className="container">
            <a className="navbar-brand" href="#">
              Manage Your Installments
            </a>
            <button
              className="navbar-toggler ml-auto"
              type="button"
              data-toggle="collapse"
              data-target="#probootstrap-navbar"
              aria-controls="probootstrap-navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span>
                <i className="ion-navicon" />
              </span>
            </button>
            <div className="collapse navbar-collapse" id="probootstrap-navbar">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link" href="#section-home" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section-features" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section-reviews" />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section-pricing">
                    Sign Up
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section-faq" />
                </li>
                <li className="nav-item cta-btn ml-xl-2 ml-lg-2 ml-md-0 ml-sm-0 ml-0">
                  <a className="nav-link" href="#" target="_blank">
                    <span className="pb_rounded-4 px-4">Login</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {/* END nav */}
        <section
          className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light"
          id="section-home"
        >
          <div className="container">
            <div className="controlLife row align-items-center justify-content-center">
              <div className="col-md-6">
                <h2 className="heading mb-3">Controll Your Life</h2>
                <div className="sub-heading">
                  <p className="mb-4">
                    New free template by For more templates visit the Lorem
                    ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>

                  <p className="mb-5">
                    <a
                      className=" btn cyan waves-effect waves-light"
                      href="/Login"
                    >
                      <span className="pb_font-14 text-uppercase pb_letter-spacing-1">
                        Login
                      </span>
                    </a>
                  </p>
                </div>
              </div>
              <Register />
            </div>
          </div>
        </section>
        {/* END section */}
        <footer className="pb_footer bg-light" role="contentinfo">
          <div className="container">
            <div className="row text-center">
              <div className="col">
                <ul className="list-inline">
                  {/*              <li class="list-inline-item"><a href="#" class="p-2"><i class="fa fa-facebook"></i></a></li>*/}
                  {/*              <li class="list-inline-item"><a href="#" class="p-2"><i class="fa fa-twitter"></i></a></li>*/}
                  {/*              <li class="list-inline-item"><a href="#" class="p-2"><i class="fa fa-linkedin"></i></a></li>*/}
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <p className="pb_font-14">
                  © 2020. All Rights Reserved. <br />{" "}
                  <a href="#">Mario Alfaro</a> a Software Developer
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* loader */}
        <div id="pb_loader" className="show fullscreen"></div>
      </div>
    );
  }
}
Landing.propTypes = {
  security: PropTypes.object.isRequired
};
const mapStatetoProps = state => ({
  security: state.security
});

export default connect(mapStatetoProps)(Landing);
