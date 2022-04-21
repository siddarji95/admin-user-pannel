import jwt_decode from "jwt-decode";
import { PRESENT_USER } from "../actions/actions";
import { SHOW_USERS } from "../actions/actions";
import isEmpty from "../validation/isEmpty";
import setAuthToken from "../utils/setAuthToken";

console.log(localStorage.getItem('jwtToken'))
const token = localStorage.getItem('jwtToken');
let user = null;
if(token){
  setAuthToken(token);
  user = jwt_decode(token);
}

const initialState = {
  isAuthenticated: user? true: false,
  isAdmin: user? user.isAdmin: false,
  user: user? user: {},
  allUsers: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case PRESENT_USER:
      console.log(action.payload, !isEmpty(action.payload))
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        isAdmin: !isEmpty(action.payload) ? action.payload.isAdmin : false,
        user: action.payload
      };
    case SHOW_USERS:
      return {
        ...state,
        allUsers: action.payload
      }
    default:
      return state;
  }
}
