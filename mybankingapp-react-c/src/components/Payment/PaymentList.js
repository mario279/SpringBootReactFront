import React, { Component } from "react";

// import bigtext from "react-bigtext";
import { Route, withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { deletePayment } from "../../actions/paymentActions";
import { connect } from "react-redux";

class PaymentList extends Component {
  onDeleteClick = id => {
    this.props.deletePayment(id);
  };
  render() {
    const { payments } = this.props;
    return (
      <div>
        <div className="paymentBox">
          <div className="nameTitle">{payments.paymentName}</div>
          <div className="idT">{payments.identifier}</div>
          <div className="descT">{payments.description}</div>

          <div
            className="buttonToDel btn center-align waves-effect waves-light"
            id="delBtn"
            onClick={this.onDeleteClick.bind(this, payments.identifier)}
          >
            Delete
          </div>
          <Link
            className="buttonToEdit btn center-align waves-effect waves-light"
            id="editBtn"
            to={"/updatePayment/" + payments.identifier}
          >
            Update
          </Link>
          <Link
            className="buttonToLog btn center-align waves-effect waves-light"
            id="logBtn"
            to={"/installmentdashboard/" + payments.identifier}
          >
            Log
          </Link>
        </div>
      </div>
    );
  }
}
PaymentList.propTypes = {
  deletePayment: PropTypes.func.isRequired
};

export default connect(null, { deletePayment })(PaymentList);
