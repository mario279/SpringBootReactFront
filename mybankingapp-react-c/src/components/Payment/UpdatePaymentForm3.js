import React, { Component } from "react";
import PropTypes from "prop-types";
//this is how we connect to the state
import { connect } from "react-redux";
import { getPayment, updatePayment } from "../../actions/paymentActions";
import { Route, withRouter, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import classNames from "classnames";

class UpdatePaymentForm extends Component {
  constructor() {
    super();

    this.state = {
      paymentName: "",
      identifier: "",
      description: "",
      startDate: "",
      endDate: "",
      updatedOn: "",
      errors: {}
    };
  }

  redirection(e) {
    e.push("/MainPanel");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.identifier == nextProps.identifier) {
      return {
        paymentName: nextProps.paymentName,
        description: nextProps.description,
        identifier: nextProps.identifier
      };
    }
    return null;
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    //load the project that you want to load from the database
    this.props.getPayment(id, this.props.history);
  }

  render() {
    const historyObject = this.props.history;
    //destructuring to get errors from state
    const { errors } = this.state;
    // const { payment } = this.props.payment;

    return (
      <div>
        <div className="formTitle1">testing</div>
        <div className="row container">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6"></div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pName"
                  type="text"
                  name="paymentName"
                  value={this.state.paymentName}
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.paymentName
                    },
                    { "border-danger": errors.paymentName }
                  )}
                  onChange={this.onChange}
                />

                <label htmlFor="pName">Payment Name</label>
                {errors.paymentName && (
                  <div className="invalid-feedback">{errors.paymentName}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pidentifier"
                  type="text"
                  name="identifier"
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.identifier
                    },
                    { "border-danger": errors.identifier }
                  )}
                  value={this.state.identifier}
                  onChange={this.onChange}
                />
                {errors.identifier && (
                  <div className="invalid-feedback">{errors.identifier}</div>
                )}
                <label htmlFor="pidentifier">{this.state.identifier}</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pdescription"
                  type="text"
                  name="description"
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.description
                    },
                    { "border-danger": errors.description }
                  )}
                  value={this.state.description}
                  onChange={this.onChange}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description}</div>
                )}
                <label htmlFor="pdescription">Description</label>
              </div>
            </div>
            <button
              className="btn waves-effect waves-light"
              type="submit"
              name="action"
            >
              Add
              <i className="material-icons right"></i>
            </button>

            <Link to="/MainPanel" className="takeMe btn">
              Main Panel
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  payment: state.payment
});
UpdatePaymentForm.propTypes = {
  //this is like a constraint,  you are basicly telling react that the following functions
  //are required proptypes for this component to work properly
  payment: PropTypes.object.isRequired,
  getPayment: PropTypes.func.isRequired,
  updatePayment: PropTypes.func.isRequired
};

//this is how we map our state to our props
//we are going to want to map our state to our component properties
//once we start getting errors
//create payment is a method inside our payment Action
export default connect(mapStateToProps, { getPayment, updatePayment })(
  UpdatePaymentForm
);
