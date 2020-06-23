import React, { Component } from "react";
import PropTypes from "prop-types";
//this is how we connect to the state
import { connect } from "react-redux";
import { createPayment } from "../../actions/paymentActions";
import { Route, withRouter, Link } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import classNames from "classnames";
import ImageUploader from "react-images-upload";

class CreatePaymentForm extends Component {
  constructor() {
    super();

    this.state = {
      paymentName: "",
      identifier: "",
      description: "",
      startDate: "",
      endDate: "",
      updatedOn: "",
      image: {},
      errors: {},
      imagePreviewUrl: [],
      pictures: [],
      file: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }
  onDrop(pictureFiles, pictureDataURLs) {
    this.setState({
      pictures: this.state.pictures.concat(pictureFiles)
    });
  }

  onChange(e) {
    // this.setState({ paymentName: e.target.value });
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log("this is the image: " + this.state.imagePreviewUrl.data);

    const newPayment = {
      paymentName: this.state.paymentName,
      identifier: this.state.identifier,
      description: this.state.description
    };
    alert("payment created!");
    // this.setState({ image: image });
    console.log("print the image: " + newPayment.image);
    this.props.createPayment(newPayment, this.props.history);
  }

  handleImageChange(e) {
    let file = e.target.files[0];
    let reader = new FileReader();
    console.log("inside handleImage this is file " + file.toString());
    reader.readAsDataURL(file);
    console.log("reader stuff: " + reader.result);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
  }

  redirection(e) {
    e.push("/MainPanel");
  }

  //life cycle hooks
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.response.data });
    }
  }

  render() {
    const historyObject = this.props.history;
    //destructuring to get errors from state
    const { errors } = this.state;

    return (
      <div>
        <div className="container">
          <form className="addPaymentForm" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="pName"
                  type="text"
                  name="paymentName"
                  className={classNames(
                    "border",
                    {
                      "is-invalid": errors.paymentName
                    },
                    { "border-danger": errors.paymentName }
                  )}
                  value={this.state.paymentName}
                  onChange={this.onChange}
                />

                <label htmlFor="pName">Payment Name</label>
                {errors.paymentName && (
                  <div className="invalid-feedback">{errors.paymentName}</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
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
                <label htmlFor="pidentifier">Identifier</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s4">
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
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={this.handleImageChange}
              ></input>
            </div>
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              onChange={this.onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              withPreview={true}
              onChange={e => this.handleImageChange}
            />
            <button
              className="btn waves-effect waves-light"
              id="submitBtn"
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

CreatePaymentForm.propTypes = {
  //this is like a constraint,  you are basicly telling react that the create payment function
  //is a required proptype for this component to work properly
  createPayment: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});
//this is how we map our state to our props
//we are going to want to map our state to our component properties
//once we start getting errors
//create payment is a method inside our payment Action
export default connect(mapStateToProps, { createPayment })(CreatePaymentForm);
