import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import toasts from "./toasts";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  post: postReducer,
  toasts
});
