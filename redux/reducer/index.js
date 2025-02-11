import { combineReducers } from "redux";
import userSlice from "./userSlice";
import appSlice from "./appSlice";
import notificationSlice from "./notificationSlice";

// Combining burgerReducer and pizzaReducer in rootReducer
export const rootReducer = combineReducers({
  user: userSlice.reducer,
  app: appSlice.reducer,
  notification: notificationSlice.reducer,
});
