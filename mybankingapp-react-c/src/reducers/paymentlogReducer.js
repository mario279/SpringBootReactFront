import {
  GET_PAYMENTLOG,
  GET_PAYMENT_INSTALLMENT,
  DELETE_PAYMENT_INSTALLMENT
} from "../actions/types";

//reducers always have an initial state
//initial state is an empty array of installments
// and a single installment for when we updat e a single one
const initialState = {
  payment_installments: [],
  payment_installment: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENTLOG:
      return {
        ...state,
        payment_installments: action.payload
      };

    case GET_PAYMENT_INSTALLMENT:
      return {
        ...state,
        payment_installment: action.payload
      };

    case DELETE_PAYMENT_INSTALLMENT:
      return {
        ...state,
        payment_installments: state.payment_installments.filter(
          x => x.paymentSequence !== action.payload
        )
      };

    default:
      return state;
  }
}
