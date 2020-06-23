import React, { Component } from "react";

class PaymentObject extends Component {
  render() {
    return (
      <div>
        <div className="PaymentContent container">
          <div className="paymentName">Name</div>
          <div className="identifier">P001</div>
          <div className="description">laundry </div>
          <div className="createdOn">createdOn</div>
          <div className="updatedOn">updatedOn</div>
          <div className="delete-button btn">Delete</div>
          <div className="update-button btn ">Update</div>
        </div>
        <footer className="page-footer">
          <div className="footer-copyright"></div>
        </footer>
      </div>
    );
  }
}
export default PaymentObject;
