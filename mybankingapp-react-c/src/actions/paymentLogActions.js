//used for java communications
import axios from "axios";

import {
  GET_ERRORS,
  GET_PAYMENTS,
  GET_PAYMENT,
  DELETE_PAYMENT,
  GET_PAYMENTLOG,
  GET_PAYMENT_INSTALLMENT,
  DELETE_PAYMENT_INSTALLMENT
} from "./types";

//input parameters: paymentlog_id, payment_installment
//this is our first action, requesting the state to change
//to the reducer
//actions need to be dispatched in order to change the state
//history is used to push to a new page
export const addPaymentInstallment = (
  paymentlog_id,
  payment_installment,

  history
) => async dispatch => {
  //lets extract the errors from the state and use them
  try {
    await axios.post(
      `http://localhost:8080/api/paymentlog/${paymentlog_id}`,
      payment_installment
    );
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
    alert("installment added");
    history.push(`/installmentdashboard/${paymentlog_id}`);
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

//with input:  paymentlog_id
export const getpaymentLog = paymentlog_id => async dispatch => {
  try {
    //res is an object which will receive whatever axios.get receives
    const res = await axios.get(
      `http://localhost:8080/api/paymentlog/${paymentlog_id}`
    );
    dispatch({
      type: GET_PAYMENTLOG,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updatePaymentInstallment = (
  paymentlog_id,
  pi_id,
  payment_installment,
  history
) => async dispatch => {
  console.log(
    "inside updatepaymentinstallment in actions, you passed description: " +
      payment_installment.description
  );
  console.log(
    "inside updatepaymentinstallment in actions, you passed priority: " +
      payment_installment.priority
  );
  try {
    await axios.patch(
      `http://localhost:8080/api/paymentlog/${paymentlog_id}/${pi_id}`,
      payment_installment
    );
    console.log(
      "updated installment this is what we passed to axios: " +
        payment_installment.priority
    );
    history.push(`/installmentDashboard/${paymentlog_id}`);
    dispatch({
      type: GET_ERRORS,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getPaymentInstallment = (
  paymentIdentifier,
  id,
  history
) => async dispatch => {
  try {
    const res = await axios.get(
      `http://localhost:8080/api/paymentlog/${paymentIdentifier}/${id}`
    );
    dispatch({
      type: GET_PAYMENT_INSTALLMENT,
      payload: res.data
    });
  } catch (error) {
    //in this case if the people are trying to look for a payment that doesn't exist through the url, then
    // we redirect them to the board
    // history.push("/InstallmentDashboard");

    alert("here is the error: " + error.data);
  }
};

export const deletePaymentInstallment = (
  paymentlog_id,
  pi_id
) => async dispatch => {
  if (
    window.confirm(`are you sure you wish to
   delete this installment with id? ${pi_id}`)
  ) {
    await axios.delete(
      `http://localhost:8080/api/paymentlog/${paymentlog_id}/${pi_id}`
    );
    dispatch({
      type: DELETE_PAYMENT_INSTALLMENT,
      payload: pi_id
    });
  }
};
