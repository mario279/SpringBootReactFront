// import React from "react";

import React, { Component } from "react";
import PropTypes from "prop-types";
//this is how we connect to the state
import { connect } from "react-redux";
import { getPayment, updatePayment } from "./actions/paymentActions";
import { Route, withRouter, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import classNames from "classnames";
// import { Button } from "../node_modules/bootstrap/dist/css/bootstrap.min.css";

class Testing extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  static propTypes = {
    payments: PropTypes.object.isRequired
  };
  state = {
    paymentName: "default State ",
    description: "default State"
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.paymentName !== nextProps.paymentName) {
      return {
        paymentName: prevState.paymentName,
        description: prevState.description
      };
    }
  }
  onSubmit(e) {
    e.preventDefault();
  }
  onChange(e) {
    // this.setState({ paymentName: e.target.value });
    this.setState({ paymentName: e.target.value });
  }
  setStateFunc(s) {}

  //onClick={() => this.onSubmit(historyObjet)}
  render() {
    const historyObjet = this.props.history;
    return (
      <div>
        moving to the main panel
        <div className="testinButton btn">Test me</div>
        <form className="tellMe" onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.paymentName}
            onChange={this.onChange}
          ></input>

          <button
            className="btn waves-effect waves-light"
            type="submit"
            name="action"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    payments: state.payments
  };
}

//this is how we map our state to our props
//we are going to want to map our state to our component properties
//once we start getting errors
//create payment is a method inside our payment Action
export default connect(mapStateToProps, { getPayment, updatePayment })(Testing);
