import { configureStore } from "@reduxjs/toolkit"
import calculator  from "./calculatorReducer"
import homePage from "./homeReducer"
import { combineReducers } from "redux";
import snakeGame from'./snakeReducer';
import PlayGroundReducer from "./playgroundReducer";
import kofReducer from "./kofReducer";

const creducer = combineReducers({
    calculator: calculator,
    homePage: homePage,
    snakeGame : snakeGame,
    playground : PlayGroundReducer,
    kofGame : kofReducer,
});

const store = configureStore({
    reducer: creducer,
});

export default store;