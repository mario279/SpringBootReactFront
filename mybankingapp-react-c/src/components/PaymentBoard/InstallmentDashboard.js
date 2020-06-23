import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import PaymentLog from "./PaymentLog";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getpaymentLog } from "../../actions/paymentLogActions";
import { getPayment } from "../../actions/paymentActions";
import { findDOMNode } from "react-dom";

class InstallmentDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {}
    };
  }
  componentDidMount() {
    //const obj = {first:'jane',last:'doe'};   const{first,last} = obj // first = jane; last = doe
    // the id in this case is the paymentlog_id, which is used to find the correct payment log
    const { id: id } = this.props.match.params;
    console.log(
      "this is the id on the installment dashboard: its what we are passing to getPaymentLog " +
        id
    );
    this.props.getpaymentLog(id);
    this.props.getPayment(id, this.props.history);
  }
  static getDerivedStateFromProps(props, state) {
    if (state.errors !== props.errors) {
      console.log("state and props are different");
    }
    return { errors: props.errors };
  }
  render() {
    const { id } = this.props.match.params;
    const {
      payment_installments: payment_installments
    } = this.props.paymentlog;
    const { errors } = this.state;
    const { payment } = this.props.payments;

    const calculateDisplay = (errors, payment_installments) => {
      if (payment_installments.length < 1) {
        console.log("payment_installment.length is  less than 1");
        if (errors.paymentNotFound) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.paymentNotFound}
            </div>
          );
        } else if (errors.paymentIdentifier) {
          return (
            <div className="alert alert-danger text-center" role="alert">
              {errors.paymentIdentifier}
            </div>
          );
        }
      } else {
        return <PaymentLog payment_installments_props={payment_installments} />;
      }
    };

    let dashboardContent = calculateDisplay(errors, payment_installments);

    return (
      <div>
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/public/img/apple-icon.png"
        />
        <link rel="icon" type="image/png" href="/public/img/favicon.png" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <title></title>
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no"
          name="viewport"
        />
        {/*     Fonts and icons     */}
        <link
          rel="stylesheet"
          type="text/css"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Roboto+Slab:400,700|Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
        />
        {/* CSS Files */}

        {/* CSS Just for demo purpose, don't include it in your project */}

        <div className="wrapper ">
          <div
            className="sidebar"
            data-color="purple"
            data-background-color="black"
            data-image="/public/img/sidebar-2.jpg"
          >
            {/*
        Tip 1: You can change the color of the sidebar using: data-color="purple | azure | green | orange | danger"

        Tip 2: you can also add an image using data-image tag
    */}
            <div className="logo">
              <a href="#" className="simple-text logo-normal"></a>
            </div>
            <div className="sidebar-wrapper">
              <ul className="nav">
                <li className="nav-item  ">
                  <a className="nav-link" href="/MainPanel">
                    <i className="material-icons">dashboard</i>
                    <p>Dashboard</p>
                  </a>
                </li>
                <li className="nav-item ">
                  <a className="nav-link" href="#">
                    <i className="material-icons">person</i>
                    <p>Add Recipient </p>
                  </a>
                </li>
                <Link to={`/addpaymentinstallment/${id}`}>
                  <li className="nav-item ">
                    <div className="nav-link" href="#">
                      <i className="material-icons">border_outer</i>
                      <p>Add Installment </p>
                    </div>
                  </li>
                </Link>

                {/* <li class="nav-item active-pro ">
                <a class="nav-link" href="./upgrade.html">
                    <i class="material-icons">unarchive</i>
                    <p>Upgrade to PRO</p>
                </a>
            </li> */}
              </ul>
              <div className="paymentNm text-primary">
                <h4>
                  Here is the list of installments for: {payment.paymentName}
                </h4>
              </div>
            </div>
          </div>
          <div className="main-panel">
            {/* Navbar */}
            <nav
              className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top red  "
              id="navigation-example"
            >
              <div className="container-fluid  ">
                <div className="navbar-wrapper ">
                  <a className="navbar-brand" href="">
                    Installment List
                  </a>
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  aria-controls="navigation-index"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                  data-target="#navigation-example"
                >
                  <span className="sr-only">Toggle navigation</span>
                  <span className="navbar-toggler-icon icon-bar" />
                  <span className="navbar-toggler-icon icon-bar" />
                  <span className="navbar-toggler-icon icon-bar" />
                </button>
                <div className="collapse navbar-collapse justify-content-end">
                  <form className="navbar-form">
                    <div className="input-group no-border">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                      />
                      <button type="submit" className="btn-flat">
                        <i className="material-icons">search</i>
                        <div className="ripple-container" />
                      </button>
                    </div>
                  </form>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link" href="/MainPanel">
                        <i className="material-icons">dashboard</i>
                        <p className="d-lg-none d-md-block">Stats</p>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#">
                        <i className="material-icons">person</i>
                        <p className="d-lg-none d-md-block">Account</p>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {/* End Navbar */}
          </div>
        </div>
        {dashboardContent}
        <div className="fixed-plugin">
          <div className="dropdown show-dropdown">
            <a href="#" data-toggle="dropdown"></a>
            <ul className="dropdown-menu">
              <li className="header-title"> Sidebar Filters</li>
              <li className="adjustments-line"></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

InstallmentDashboard.propTypes = {
  paymentlog: PropTypes.object.isRequired,
  getpaymentLog: PropTypes.func.isRequired,
  getPayment: PropTypes.func.isRequired,
  payments: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  paymentlog: state.paymentlog,
  errors: state.errors,
  payments: state.payments
});
export default connect(mapStateToProps, { getpaymentLog, getPayment })(
  InstallmentDashboard
);
