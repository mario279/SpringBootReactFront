import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import paymentReducer from "./paymentReducer";
import paymentlogReducer from "./paymentlogReducer";
import securityReducer from "./securityReducer";

export default combineReducers({
  //importing the error reducer into the store
  //reducers are the departments in the analogy
  //stores are the combination of reducers
  //stores allow components to share state, like a database of state
  errors: errorReducer,
  payments: paymentReducer,
  paymentlog: paymentlogReducer,
  security: securityReducer
});
