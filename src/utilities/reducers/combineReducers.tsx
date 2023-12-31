import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "utilities/reduxSlices/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
});
