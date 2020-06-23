import React from "react";
import "./App.css";
import MainPanel from "./components/MainPanel";
import Header from "./components/layout/Header";
import "bootstrap/dist/css/bootstrap-grid.css";
import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from "react-dom";
import $ from "jquery";
import "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import CurrentPayments from "./components/Payment/CurrentPayments";
import PaymentObject from "./components/Payment/PaymentObject";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import AddPayment from "./components/Payment/AddPayment";
import QuickLinks from "./components/Payment/QuickLinks";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Testing from "../src/Testing";
import UpdatePaymentForm from "./components/Payment/UpdatePaymentForm";
import UpdatePaymentForm2 from "./components/Payment/UpdatePaymentForm2";
import InstallmentDashboard from "./components/PaymentBoard/InstallmentDashboard";
import addpaymentinstallment from "./components/PaymentBoard/PaymentInstallments/AddPaymentInstallment";
import UpdatePaymentInstallment from "./components/PaymentBoard/PaymentInstallments/UpdatePaymentInstallment";
import Landing from "./components/layout/Landing";
import Register from "./components/UserManagement/Register";
import Login from "./components/UserManagement/Login";
import jwt_decode from "jwt-decode";
import setJWTToken from "./components/securityUtils/setJWTToken";
import { SET_CURRENT_USER } from "./actions/types";
import { logout } from "./actions/securityActions";
import SecuredRoute from "./components/securityUtils/SecureRoute";

const jwtToken = localStorage.jwtToken;
if (jwtToken) {
  setJWTToken(jwtToken);
  const decoded_jwtToken = jwt_decode(jwtToken);

  store.dispatch({
    type: SET_CURRENT_USER,
    payload: decoded_jwtToken
  });

  const currentTime = Date.now() / 1000;
  console.log("this is what current time is: " + currentTime);
  if (decoded_jwtToken.exp < currentTime) {
    //handle logout
    store.dispatch(logout());
    //window.location.href = "/"

    window.location.href = "/";
  }
}

function App() {
  return (
    <div>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <Header>{}</Header>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <SecuredRoute path="/MainPanel" exact component={MainPanel} />
              <SecuredRoute exact path="/addPayment" component={AddPayment} />
              <SecuredRoute
                exact
                path="/currentpayments"
                component={CurrentPayments}
              />

              <SecuredRoute
                path="/updatePayment/:id"
                exact
                component={UpdatePaymentForm}
              />
              <SecuredRoute
                path="/installmentdashboard/:id"
                exact
                component={InstallmentDashboard}
              />
              <SecuredRoute
                path="/addpaymentinstallment/:id"
                exact
                component={addpaymentinstallment}
              />
              <SecuredRoute
                path="/updatepaymentinstallment/:paymentlog_id/:pi_sequence"
                exact
                component={UpdatePaymentInstallment}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </Provider>
    </div>
  );
}

export default App;
