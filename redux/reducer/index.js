import { combineReducers } from "redux";
import cartSlice from "./cartSlice";

// Combining burgerReducer and pizzaReducer in rootReducer
export const rootReducer = combineReducers({
  cart: cartSlice.reducer,
});
