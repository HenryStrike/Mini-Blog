import { configureStore } from "@reduxjs/toolkit"
import calculator  from "./calculatorReducer"
import homePage from "./homeReducer"
import { combineReducers } from "redux";

const creducer = combineReducers({
    calculator: calculator,
    homePage: homePage,
});

const store = configureStore({
    reducer: creducer,
});

export default store;