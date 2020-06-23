import React, { Component } from "react";
import PaymentObject from "./Payment/PaymentObject";
import CreatePaymentButton from "./Payment/CreatePaymentButton";
import QuickLinks from "./Payment/QuickLinks";
import PaymentForMain from "./Payment/PaymentForMain";

import { connect } from "react-redux";

import PropTypes from "prop-types";

class MainPanel extends Component {
  render() {
    const { payments } = this.props.payments;
    return (
      <div>
        <meta charSet="UTF-8" />
        <title>Control Panel</title>
        <meta
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
          name="viewport"
        />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />

        <main>
          <section className="content">
            <div className="page-announce center-align valign">
              <h1 className="page-announce-text center-align">
                Analyze The Payments You Owe here
              </h1>
            </div>
            {/* Stat Boxes */}
            <div className="row">
              <div className="col l3 s6">
                {/* small box */}

                {/*  payments*/}
                <PaymentForMain key={payments.id} payments={payments} />
                {/* end payments*/}
              </div>
              {/* ./col */}
              <div className="col l3 s6">
                {/* small box */}
                <div className="small-box bg-green">
                  <div className="inner">
                    <h3>0</h3>
                    <p>Updates</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col l3 s6">
                {/* small box */}
                <div className="small-box bg-yellow">
                  <div className="inner">
                    <h3>0</h3>
                    <p>Payments Deleted</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-email" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
              {/* ./col */}
              <div className="col l3 s6">
                {/* small box */}
                <div className="small-box bg-red">
                  <div className="inner">
                    <h3>0</h3>
                    <p>Recepients</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">
                    More info <i className="fa fa-arrow-circle-right" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <QuickLinks></QuickLinks>
      </div>
    );
  }
}
MainPanel.propTypes = {
  payments: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  //this statement allow us to have access to the state
  //we need this so that we can extract the project's array and traverse it
  payments: state.payments
});
export default connect(mapStateToProps)(MainPanel);
