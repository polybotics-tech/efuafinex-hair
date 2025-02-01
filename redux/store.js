import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer";

// Passing rootReducer to configureStore
const store = configureStore({ reducer: rootReducer });

export default store;
