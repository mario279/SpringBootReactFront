import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";
import { addPaymentInstallment } from "../../../actions/paymentLogActions";
import PropTypes from "prop-types";
class AddPaymentInstallment extends Component {
  //in order to make this a controlled component, we
  // need  to add a constructor
  //so that it can manage state and
  //when we load the form, we want to extract
  //the passed parameter from the url
  //which is what we will pass to the action
  //we will take props in a constructor
  constructor(props) {
    //we call super in order to use this,
    //we pass props even though its not obligatory
    //because we need the base react.component to initialize this.props
    //this insures this.props is set even before our constructor is called
    super(props);
    const { id } = this.props.match.params;

    this.state = {
      //check with your backend if name for each input field
      //matches with attributes in the ppayment object
      name: "",
      description: "",
      priority: 0,
      status: "",
      paymentIdentifier: id,
      paymentForm: "",
      errors: {}
    };
    //we do this to prevent "this" from losing context
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  //on change
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  static getDerivedStateFromProps(props, state) {
    console.log("inside get derived state from props");
    return {
      errors: props.errors
    };
  }
  //on submit

  //begin with printing the object

  onSubmit(e) {
    e.preventDefault();

    const newInstallment = {
      name: this.state.name,
      description: this.state.description,
      priority: this.state.priority,
      status: this.state.status,
      paymentForm: this.state.paymentForm
    };
    //since an a key method from an action was sent via props
    //we will use it to persist the object
    //important, react router dom always passes history as part of
    //the props
    console.log("this is the object being passed to axios: " + newInstallment);
    this.props.addPaymentInstallment(
      this.state.paymentIdentifier,
      newInstallment,
      this.props.history
    );
  }

  render() {
    //mapstatetoprops takes ownprops
    //react router will supply any dynamic piece of the url via
    //match.params
    const { id } = this.props.match.params;

    const { errors } = this.state;
    console.log(
      "this is the value of errors.name from : " + this.props.errors.name
    );
    return (
      <div id="basic-form" className="section">
        {/* Form with placeholder */}

        <div className="col s12 m12 16">
          <div className="row" id="iform">
            <div className="card-panel">
              <Link
                to={`/installmentdashboard/${id}`}
                button
                className="btn cyan waves-effect waves-light backtolog"
              >
                Back to Installment Log
              </Link>

              <h4 className="header2">
                Add an installment to your current payment
              </h4>
              <div className="row">
                <form className="col s12" onSubmit={this.onSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input
                        placeholder="Advance"
                        id="name2"
                        type="text"
                        name="name"
                        className={classnames(
                          "border",
                          { "is-invalid": this.props.errors.name },
                          { "border-danger": this.props.errors.name }
                        )}
                        //make sure that the name and the attribute in state
                        //are the same
                        value={this.state.name || ""}
                        onChange={this.onChange}
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
                        value={this.state.paymentForm}
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
                        value={this.state.description}
                        onChange={this.onChange}
                        defaultValue={""}
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
                      value={this.state.priority}
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
                      value={this.state.status}
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

AddPaymentInstallment.propTypes = {
  addPaymentInstallment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  errors: state.errors
});
//we do {addPaymentInstallment} so we can bring the payment installment here
// we are bringing in the action creator here, therefore connecting
//the action to the props that is being brought in and connecting it to the
//component
export default connect(mapStateToProps, { addPaymentInstallment })(
  AddPaymentInstallment
);
