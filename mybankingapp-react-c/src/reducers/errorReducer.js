//first thing you do in a reducer is import the action you will use.
import { GET_ERRORS } from "../actions/types";

const initialState = { test: "im an error state" };

//fthis function takes a state, which is our initial state
//action= is the form in the analogy, here is the action we are going to perform
//dispatcher= is the form receiver
//reducer is the department
export default function(state = initialState, action) {
  //takes the action we are going to pass
  switch (action.type) {
    //main use case for this reducer, is to return the errors
    case GET_ERRORS:
      return action.payload;

    //the default case, is to return the state as it is
    default:
      return state;
  }
}
//we hook this reducer up to the store, by sending it to the root,which is in index.js inside the reducers folder
