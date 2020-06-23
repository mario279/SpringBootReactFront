import { GET_PAYMENTS, GET_PAYMENT, DELETE_PAYMENT } from "../actions/types";

//setup initial state like in the other reducer
const initialState = {
  //array of projects
  payments: [],
  //a single project
  payment: {}
};
//just like with the errors reducers we will create a function
//this function will take in the state
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTS:
      return {
        //projects: action.payload is what we are sending back to the store
        ...state,
        payments: action.payload
      };
    case GET_PAYMENT:
      return {
        ...state,
        payment: action.payload
      };
    case DELETE_PAYMENT:
      return {
        ...state,
        payments: state.payments.filter(
          payment => payment.identifier !== action.payload
        )
      };

    default:
      return state;
  }
}
