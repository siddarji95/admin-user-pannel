import { GET_ERRORS } from "././actions";
import { PRESENT_USER } from "././actions";
import { SHOW_USERS } from "././actions";
import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const userRegister = (userInfo, history) => dispatch => {
  axios
    .post("/api/users/register", userInfo)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const userLogin = userInfo => dispatch => {
  axios
    .post("/api/users/login", userInfo)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setPresentUser(decoded));
      console.log(decoded);
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const addUsers = (userInfo, history) => dispatch => {
  console.log(userInfo)
  axios
    .post("/api/users/add_users", userInfo)
    .then(res => history.push("/dashboard"))
    .catch(err =>{
      console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    }
  
    );
};

export const getUsers = () => dispatch => {
  axios
    .get("/api/users/show_users")
    .then(res => {
      dispatch(showUsers(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const getAdminUsers = () => dispatch => {
  axios
    .get("/api/users/show_admin_users")
    .then(res => {
      dispatch(showUsers(res.data))
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

export const showUsers = data => {
  return {
    type: SHOW_USERS,
    payload: data
  };
}

export const setPresentUser = decoded => {
  console.log(decoded)
  return {
    type: PRESENT_USER,
    payload: decoded
  };
};


export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false); 
  dispatch(setPresentUser({}));
};
