import { PRESENT_USER } from "../actions/actions";
import { SHOW_USERS } from "../actions/actions";
import isEmpty from "../validation/isEmpty";

const initialState = {
  isAuthenticated: false,
  user: {},
  allUsers: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case PRESENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
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
