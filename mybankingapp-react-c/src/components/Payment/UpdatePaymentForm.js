import React, { Component } from "react";
import PropTypes from "prop-types";
//this is how we connect to the state
import { connect } from "react-redux";
import {
  getPayment,
  createPayment,
  updatePayment
} from "../../actions/paymentActions";
import { Route, withRouter, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import classNames from "classnames";
import { Button } from "react-bootstrap";

class UpdatePaymentForm extends Component {
  constructor(props) {
    //you call the super method in order to use the "this"
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.changeState = this.changeState(this);
    // const { paymentIdentifier } = props.match.params;
  }

  onChange(e) {
    // this.setState({ paymentName: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
    // console.log(
    //   ("here is on change e.target.paymentName.value " +
    //     [e.target.name]: e.target.value)
    // );
  }
  changeState(e) {
    // this.state.paymentName: this.props.payments.payment.paymentName;
  }
  state = {
    id: "",
    paymentName: "",
    identifier: "",
    description: "",
    startDate: null,
    endDate: null,
    errors: {}
  };

  static propTypes = {
    getPayment: PropTypes.func.isRequired,
    updatePayment: PropTypes.func.isRequired,
    payments: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  onSubmit(e) {
    e.preventDefault();

    // const newPayment = {
    //   paymentName: this.props.payments.payment.paymentName,
    //   description: this.props.payments.payment.description,
    //   identifier: this.props.payments.payment.identifier
    // };

    const newPayment = {
      id: this.props.payments.payment.id,
      paymentName: this.state.paymentName,
      description: this.state.description,
      identifier: this.state.identifier
    };

    // this.props.updatePayment(newPayment, this.props.history);
    const one = this.state.paymentName;
    const two = this.state.description;
    const three = this.state.identifier;
    if (one === "" && two === "" && three === "") {
      console.log("user DID NOT INPUT ANYTHING");
    } else if (three === "" && two === "" && one !== "") {
      console.log("entered name");
    } else if (three === "" && two !== "" && one === "") {
      console.log("entered desc");
    } else if (three === "" && two !== "" && one !== "") {
      console.log("entered desc and name");
    } else if (three !== "" && two === "" && one === "") {
      console.log("entered ident");
    } else if (three !== "" && two === "" && one !== "") {
      console.log("entered name and ident");
    } else if (three !== "" && two !== "" && one !== "") {
      console.log("entered all three");
    }

    this.props.updatePayment(newPayment, this.props.history);
    alert("udpated payment");
  }

  redirection(e) {
    e.push("/MainPanel");
  }

  static getDerivedStateFromProps(props, state) {
    const o = state.paymentName;
    const t = state.description;
    const th = state.identifier;
    //if dude entered nothing
    //paymentName will come from the state
    //description will be automatically derived from the props being passed
    //
    if (o !== "" && (t === "") & (th === "")) {
      return {
        paymentName: state.paymentName,
        description: props.payments.payment.description,
        identifier: props.payments.payment.identifier,
        errors: state.errors
      };
    }
    if (o === "" && (t !== "") & (th === "")) {
      return {
        paymentName: props.payments.payment.paymentName,
        description: state.description,
        identifier: props.payments.payment.identifier,
        errors: state.errors
      };
    }
    if (o === "" && (t !== "") & (th !== "")) {
      return {
        paymentName: props.payments.payment.paymentName,
        description: state.description,
        identifier: state.identifier,
        errors: state.errors
      };
    }
    if (o !== "" && (t === "") & (th !== "")) {
      return {
        paymentName: state.paymentName,
        description: props.payments.payment.description,
        identifier: state.identifier,
        errors: state.errors
      };
    }
    if (o !== "" && (t !== "") & (th === "")) {
      return {
        paymentName: state.paymentName,
        description: state.description,
        identifier: props.payments.payment.identifier,
        errors: state.errors
      };
    }
    if (o === "" && (t === "") & (th !== "")) {
      return {
        paymentName: props.payments.payment.paymentName,
        description: props.payments.payment.description,
        identifier: state.identifier,
        errors: state.errors
      };
    }
    if (o !== "" && (t !== "") & (th !== "")) {
      return {
        paymentName: state.paymentName,
        description: state.description,
        identifier: state.identifier,
        errors: state.errors
      };
    }
    if (props.errors) {
      return {
        errors: props.errors
      };
    }
    // props.updatePayment(newPayment, props.history);
    // alert("successfully edited payment!");
    else {
      return {
        paymentName: props.payments.payment.paymentName,
        description: props.payments.payment.description,
        identifier: props.payments.payment.identifier,
        errors: state.errors
      };
    }
  }

  componentDidMount(props) {
    //when react router renders a component, its going to pass it 3 things
    //1.match   2.        3.

    const ids = this.props.match.params.id;

    //load the project that you want to load from the database

    this.props.getPayment(ids, this.props.history);
    // this.setState({paymentName:""})
    // this.setState({
    //   paymentName: this.props.paymentName,
    //   description: this.props.description,
    //   identifier: this.props.identifier
    // });
  }

  passTheRightValue = () => {
    let rightValue;
    if (this.state.paymentName == undefined) {
      rightValue = this.props.payments.payment.paymentName;
    } else {
      rightValue = this.state.paymentName;
    }
    return rightValue;
  };
  render() {
    // const historyObject = this.props.history;
    //destructuring to get errors from state
    // const { errors } = this.state;
    // const { payment } = this.props.payment;

    const pName = this.props.payments;

    const { errors } = this.state;

    return (
      //onSubmit={this.onSubmit}
      <div>
        <div className="row container">
          <form className="col s12" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s6"></div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pId"
                  type="text"
                  name="id"
                  defaultValue={pName.payment.id || ""}
                />
                <label htmlFor="pId">{}</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pName"
                  type="text"
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.paymentName
                    },
                    { "border-danger": errors.paymentName }
                  )}
                  name="paymentName"
                  defaultValue={pName.payment.paymentName || ""}
                  onChange={this.onChange}
                />
                <label htmlFor="pName"></label>
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
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.identifier
                    },
                    { "border-danger": errors.identifier }
                  )}
                  name="identifier"
                  defaultValue={pName.payment.identifier || ""}
                  onChange={this.onChange}
                />

                <label htmlFor="pidentifier">
                  {}
                  {errors.identifier && (
                    <div className="invalid-feedback">{errors.identifier}</div>
                  )}
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pdescription"
                  type="text"
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.description
                    },
                    { "border-danger": errors.description }
                  )}
                  name="description"
                  defaultValue={pName.payment.description || ""}
                  onChange={this.onChange}
                />

                <label htmlFor="pdescription">
                  {" "}
                  {errors.identifier && (
                    <div className="invalid-feedback">{errors.identifier}</div>
                  )}
                </label>
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

function mapStateToProps(state) {
  return {
    payments: state.payments,
    errors: state.errors
  };
}

//this is how we map our state to our props
//we are going to want to map our state to our component properties
//once we start getting errors
//create payment is a method inside our payment Action
export default connect(mapStateToProps, {
  getPayment,
  createPayment,
  updatePayment
})(UpdatePaymentForm);
