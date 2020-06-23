//helps us talk to the backend
import axios from "axios";
//import the types of actions we will be using
//actions represent an intention to change state. they are the only
//way to get data into the store.
import { GET_ERRORS, GET_PAYMENTS, GET_PAYMENT, DELETE_PAYMENT } from "./types";
import { withRouter } from "react-router-dom";
// import { createBrowserHistory } from "history";

//this is a named export, because we will be exporting all methods individually
//history allows us to redirect to another page once we are done adding a payment
//we pass it the dispatch, which is what we are going to be returning when we are dispatching
//the dispatcher dispatches one or more actions to the store. The base
// dispatcher always sends an action to the store's reducer, along with
// the previous state returned by the store, this is done to calculate
// a new state.
// Middleware wraps the base dispatch function. It allows the dispatch
// function to handle async actions in addition to actions. Middleware may
// transform, delay, ignore, or otherwise interpret actions or async actions
// before passing them to the next middleware. See below for more information.
export const createPayment = (payment, history) => async dispatch => {
  try {
    // const history = createBrowserHistory();
    //waiting for the async promise to get returned once the process is done
    //takes a valid payment object
    const res = await axios.post("http://localhost:8080/api/payment", payment);
    // dispatch({
    //   type: GET_ERRORS,
    //   payload: {}
    // });
    // history.push("/MainPanel");
  } catch (error) {
    //if there is an error we are going to dispatch this aciton
    //the type is of type get errors

    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const updatePayment = (payment, history) => async dispatch => {
  try {
    // const history = createBrowserHistory();
    //waiting for the async promise to get returned once the process is done
    //takes a valid payment object
    const res = await axios.put("http://localhost:8080/api/payment", payment);
  } catch (error) {
    //if there is an error we are going to dispatch this aciton
    //the type is of type get errors

    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const getPayments = () => async dispatch => {
  const res = await axios.get("http://localhost:8080/api/payment/all");

  dispatch({
    type: GET_PAYMENTS,
    //this is what we will be passing on to the reducer
    payload: res.data
  });
};

export const getPayment = (id, history) => async dispatch => {
  try {
    //fetching data from axios
    const res = await axios.get(`http://localhost:8080/api/payment/${id}`);
    console.log("I am getting called getPayment: " + res.data.identifier);

    // dispatching data to store
    dispatch({
      type: GET_PAYMENT,
      payload: res.data
    });
  } catch (error) {
    history.push("/MainPanel");
  }
};

export const deletePayment = id => async dispatch => {
  if (window.confirm("Are you sure?")) {
    await axios.delete(`http://localhost:8080/api/payment/${id}`);
    dispatch({
      type: DELETE_PAYMENT,
      payload: id
    });
  }
};
