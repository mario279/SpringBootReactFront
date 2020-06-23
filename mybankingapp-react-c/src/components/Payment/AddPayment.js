import React, { Component } from "react";
import CreatePaymentForm from "./CreatePaymentForm";

class AddPayment extends Component {
  render() {
    return (
      <div>
        <h1> Add Payment Form</h1>
        <CreatePaymentForm />
      </div>
    );
  }
}

export default AddPayment;
