import { configureStore } from "@reduxjs/toolkit"
import calculator  from "./reducer"

const store = configureStore({
    reducer: calculator,
});

export default store;