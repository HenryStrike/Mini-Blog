import { configureStore } from "@reduxjs/toolkit"
import calculator  from "./calculatorReducer"
import homePage from "./homeReducer"
import { combineReducers } from "redux";
import snakeGame from'./snakeReducer';
import PlayGroundReducer from "./playgroundReducer";

const creducer = combineReducers({
    calculator: calculator,
    homePage: homePage,
    snakeGame : snakeGame,
    playground : PlayGroundReducer,
});

const store = configureStore({
    reducer: creducer,
});

export default store;