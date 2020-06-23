import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTToken from "../components/securityUtils/setJWTToken";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async dispatch => {
  console.log("inside securityActions: " + newUser.password);
  try {
    await axios.post("http://localhost:8080/api/users/register", newUser);
    // history.push("/login");
    alert("User registered, please login with credentials");
    window.location.reload(false);

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

export const login = LoginRequest => async dispatch => {
  try {
    //login request being posted
    const res = await axios.post(
      "http://localhost:8080/api/users/login",
      LoginRequest
    );

    //extract token from res.data
    const { token } = res.data;
    //store the token in the local storage
    localStorage.setItem("jwtToken", token);
    //set the token in the header
    setJWTToken(token);
    //decode token on react
    const decoded = jwt_decode(token);
    //dispatch to our securit reducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
};
