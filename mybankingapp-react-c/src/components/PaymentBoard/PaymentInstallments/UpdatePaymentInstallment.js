import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import {
  getPaymentInstallment,
  updatePaymentInstallment
} from "../../../actions/paymentLogActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class UpdatePaymentInstallment extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      name: "",
      paymentSequence: "",
      description: "",
      priority: "",
      status: "",
      paymentIdentifier: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //match.params is used to extract url parameters
    const paymentIdentifier = this.props.match.params.paymentlog_id;
    const id = this.props.match.params.pi_sequence;

    this.props.getPaymentInstallment(paymentIdentifier, id, this.props.history);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const UpdatePaymentInstallment = {
      id: this.props.payment_installment.id,
      name: this.state.name,
      paymentSequence: this.props.payment_installment.paymentSequence,
      description: this.state.description,
      priority: this.state.priority,
      status: this.state.status,
      paymentForm: this.state.paymentForm,
      paymentIdentifier: this.props.payment_installment.paymentIdentifier
    };
    console.log(
      "before the ifs inside updatepayment, this is the status: " +
        this.props.payment_installment.status
    );
    if (this.state.name == "" || this.state.name == null) {
      UpdatePaymentInstallment.name = this.props.payment_installment.name;
    }
    if (this.state.paymentForm == "" || this.state.paymentForm == null) {
      UpdatePaymentInstallment.paymentForm = this.props.payment_installment.paymentForm;
    }
    if (this.state.description == "" || this.state.description == null) {
      UpdatePaymentInstallment.description = this.props.payment_installment.description;
    }
    if (this.state.status == "" || this.state.status == null) {
      UpdatePaymentInstallment.status = this.props.payment_installment.status;
    }
    if (this.state.priority == "" || this.state.priority == null) {
      UpdatePaymentInstallment.priority = this.props.payment_installment.priority;
    }
    console.log(
      "xxx inside updatePayment Installment in submit, this is the status: " +
        UpdatePaymentInstallment.status
    );
    this.props.updatePaymentInstallment(
      UpdatePaymentInstallment.paymentIdentifier,
      UpdatePaymentInstallment.paymentSequence,
      UpdatePaymentInstallment,
      this.props.history
    );
    this.setState({
      id: UpdatePaymentInstallment.id,
      name: UpdatePaymentInstallment.name,
      paymentSequence: UpdatePaymentInstallment.paymentSequence,
      description: UpdatePaymentInstallment.description,
      priority: UpdatePaymentInstallment.priority,
      status: UpdatePaymentInstallment.status,
      paymentForm: UpdatePaymentInstallment.paymentForm,
      paymentIdentifier: UpdatePaymentInstallment.paymentIdentifier
    });
  }
  render() {
    const { errors } = this.props.errors;
    return (
      <div id="basic-form" className="section">
        {/* Form with placeholder */}

        <div className="col s12 m12 16">
          <div className="row" id="iform">
            <div className="card-panel">
              <Link
                to={`/installmentdashboard/${this.props.payment_installment.paymentIdentifier}`}
                className="btn cyan waves-effect waves-light backtolog"
              >
                Back to Installment Log
              </Link>

              <h4 className="header2">Edit this installment</h4>
              <div className="row">
                <form className="col s12" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        placeholder="Advance"
                        type="text"
                        name="name"
                        defaultValue={this.props.payment_installment.name || ""}
                        onChange={this.onChange}
                        //make sure that the name and the attribute in state
                        //are the same
                      />
                      <label htmlFor="installment_name" className="active">
                        Name
                      </label>
                    </div>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        placeholder="Credit Card"
                        id="password2"
                        type="text"
                        name="paymentForm"
                        defaultValue={
                          this.props.payment_installment.paymentForm || ""
                        }
                        onChange={this.onChange}
                      />
                      <label htmlFor="password" className="active">
                        Form of Payment
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        placeholder="First Auto Installment"
                        id="message2"
                        className="materialize-textarea"
                        name="description"
                        defaultValue={
                          this.props.payment_installment.description || ""
                        }
                        onChange={this.onChange}
                      />
                      <label htmlFor="message" className="active">
                        Description
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="priority"
                      defaultValue={
                        this.props.payment_installment.priority || ""
                      }
                      onChange={this.onChange}
                    >
                      <option value={0}>Select priority</option>
                      <option value={1}>Top</option>
                      <option value={2}>Medium</option>
                      <option value={3}>Low</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <select
                      className="form-control form-control-lg"
                      name="status"
                      defaultValue={this.props.payment_installment.status || ""}
                      onChange={this.onChange}
                    >
                      <option value="">Select Status</option>
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="PAID">PAID</option>
                    </select>
                  </div>

                  <div className="row">
                    <div className="input-field col s12">
                      <button
                        className="btn cyan waves-effect waves-light"
                        type="submit"
                        name="action"
                      >
                        Submit
                        <i className="mdi-content-send" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdatePaymentInstallment.propTypes = {
  getPaymentInstallment: PropTypes.func.isRequired,
  updatePaymentInstallment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  payment_installment: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors,
  payment_installment: state.paymentlog.payment_installment
});

export default connect(mapStateToProps, {
  getPaymentInstallment,
  updatePaymentInstallment
})(UpdatePaymentInstallment);
