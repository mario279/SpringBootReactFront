import React, { Component } from "react";
import PaymentInstallment from "./PaymentInstallments/PaymentInstallment";
export default class PaymentLog extends Component {
  render() {
    const { payment_installments_props } = this.props;
    const installments = payment_installments_props.map(payment_installment => (
      <PaymentInstallment
        key={payment_installment.id}
        payment_installment={payment_installment}
      />
    ));

    let inprogressPayments = [];
    let pendingPayments = [];
    let paidItems = [];

    for (let i = 0; i < installments.length; i++) {
      if (installments[i].props.payment_installment.status === "IN_PROGRESS") {
        inprogressPayments.push(installments[i]);
      }
      if (installments[i].props.payment_installment.status === "PAID") {
        paidItems.push(installments[i]);
      }
      if (installments[i].props.payment_installment.status === "PENDING") {
        pendingPayments.push(installments[i]);
      }
    }

    return (
      <div>
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary blue darken-1 text-white">
                    <h4 className="card-title ">PENDING</h4>
                    <p className="card-category text-white">
                      List of all transactions that are pending
                    </p>
                    {pendingPayments}
                  </div>

                  <div className="card-body"></div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-secondary  cyan darken-2 text-white">
                    <h4 className="card-title">IN PROGRESS</h4>
                    <p className="card-category text-white">
                      Thos installments which you are working on or have an
                      arrangement
                    </p>
                    {inprogressPayments}
                  </div>

                  <div className="card-body">
                    <div className="table-responsive"></div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-tertiary blue darken-3 text-white">
                    <h4 className="card-title ">PAID</h4>
                    <p className="card-category text-white">
                      Installments which have been paid
                    </p>
                    {paidItems}
                  </div>
                  <div className="card-body">
                    <div className="table-responsive"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
