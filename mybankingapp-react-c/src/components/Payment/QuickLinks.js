import React, { Component } from "react";
import CurrentPayments from "./CurrentPayments";

class QuickLinks extends Component {
  // Or with jQuery
  // componentDidMount() {
  //   document.tooltipped.addEventListener("DOMContentLoaded", function() {
  //     var elems = this.tooltipped.querySelectorAll(".tooltipped");
  //     var instances = this.Tooltip.init(elems);
  //   });
  // }

  render() {
    return (
      <div>
        <div className="container">
          <div className="quick-links center-align">
            <h3>Quick Links</h3>
            <div className="row">
              <div className="col l3 s12" data-position="top">
                <a
                  className="tooltipped waves-effect waves-light btn-large "
                  data-position="bottom"
                  data-tooltip="I am a tooltip"
                  href="/updatePayment"
                >
                  Update
                </a>
              </div>

              <div className="col l3 s12 tooltipped" data-position="top">
                <a className="waves-effect waves-light btn-large" href="#">
                  Delete
                </a>
              </div>
              <div className="col l3 s12 tooltipped" data-position="top">
                <a className="waves-effect waves-light btn-large" href="/">
                  Recipients
                </a>
              </div>
              <div className="col l4  s12 tooltipped" data-position="top">
                <a
                  className="waves-effect waves-light btn-large"
                  href="/AddPayment"
                >
                  Create
                </a>
              </div>
            </div>
          </div>

          <CurrentPayments></CurrentPayments>
        </div>
      </div>
    );
  }
}
export default QuickLinks;
