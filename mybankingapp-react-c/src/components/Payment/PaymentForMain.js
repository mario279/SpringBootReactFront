import React, { Component } from "react";

class PaymentForMain extends Component {
  render() {
    const { payments } = this.props;
    return (
      <div>
        <div className="small-box bg-aqua">
          <div className="inner">
            <h3>{payments.length}</h3>
            <p>Payments</p>
          </div>
          <div className="icon">
            <i className="ion ion-person-add" />
          </div>
          <a href="#" className="small-box-footer">
            More info <i className="fa fa-arrow-circle-right" />
          </a>
        </div>
      </div>
    );
  }
}
export default PaymentForMain;
