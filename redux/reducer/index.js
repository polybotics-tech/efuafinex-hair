import { combineReducers } from "redux";
import userSlice from "./userSlice";

// Combining burgerReducer and pizzaReducer in rootReducer
export const rootReducer = combineReducers({
  user: userSlice.reducer,
});
