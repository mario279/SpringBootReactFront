import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { deletePaymentInstallment } from "../../../actions/paymentLogActions";

class PaymentInstallment extends Component {
  onDeleteClick(paymentlog_id, pi_id) {
    this.props.deletePaymentInstallment(paymentlog_id, pi_id);
  }
  render() {
    const { payment_installment: payment_installment } = this.props;

    let priorityString;
    let priorityClass;
    console.log(
      "inside payment installment component, priority passed is: " +
        this.props.payment_installment.priority
    );

    if (this.props.payment_installment.priority === 3) {
      priorityString = " text-light ";
      priorityClass = "LOW";
    }
    if (this.props.payment_installment.priority === 2) {
      priorityString = "bg-warning text-light ";
      priorityClass = "MID";
    }
    if (this.props.payment_installment.priority === 1) {
      priorityString = "bg-danger text-light ";
      priorityClass = "TOP";
    }
    const { paymentIdentifier } = this.props.payment_installment;
    const paymentSequence = this.props.payment_installment.paymentSequence;

    return (
      <div>
        <table className="table">
          <thead className={` text-light ${priorityString}`}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Summary</th>
              <th>Form of Payment</th>
              <th>Sequence</th>
              <th>Priority: {priorityClass}</th>
            </tr>
          </thead>
          <tbody className="installmentBody">
            <tr>
              <td>{this.props.payment_installment.id}</td>
              <td>{this.props.payment_installment.name}</td>
              <td>{this.props.payment_installment.description}</td>
              <td>{this.props.payment_installment.paymentForm}</td>
              <td>{this.props.payment_installment.paymentSequence}</td>
              <td className="text-primary">
                <Link
                  to={`/updatepaymentinstallment/${paymentIdentifier}/${paymentSequence}`}
                  className="btn btn-primary"
                >
                  Update
                </Link>
                <div
                  className="btn btn-danger ml-4"
                  onClick={this.onDeleteClick.bind(
                    this,
                    payment_installment.paymentIdentifier,
                    payment_installment.paymentSequence
                  )}
                >
                  Delete
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

PaymentInstallment.propTypes = {
  deletePaymentInstallment: PropTypes.func.isRequired
};

export default connect(null, { deletePaymentInstallment })(PaymentInstallment);
