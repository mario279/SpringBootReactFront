import React, { Component } from "react";
import { connect } from "react-redux";
import { getPayments } from "../../actions/paymentActions";
import PropTypes from "prop-types";
import PaymentList from "./PaymentList";
class CurrentPayments extends Component {
  //life cycle hook dictates what happens when we render the component, setting state will trigger re
  //rendering
  componentDidMount() {
    this.props.getPayments();

    // var allPayments = [];
    // allPayments = this.props.getPayments;
    // return allPayments[1].data;
  }

  render() {
    //equivlant to  payments = this.props.payments.payments
    const { payments } = this.props.payments;
    return (
      <div>
        <h3 className="center-align">Current Payments</h3>

        <div className="paladesT">
          {payments.map(payments => (
            <PaymentList key={payments.id} payments={payments} />
          ))}
        </div>
      </div>
    );
  }
}
CurrentPayments.propTypes = {
  //this statement allows us to have access to the state
  payments: PropTypes.object.isRequired,
  getPayments: PropTypes.func.isRequired
};
//map state to the components properties
//we mapped our application state to a property, which is of type object
const mapStateToProps = state => ({
  //this statement allow us to have access to the state
  //we need this so that we can extract the project's array and traverse it
  payments: state.payments
});
//connect component to store
//we are mapping getpayments when we connect it to the store.
export default connect(mapStateToProps, { getPayments })(CurrentPayments);
