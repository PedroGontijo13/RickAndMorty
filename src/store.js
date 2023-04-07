import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice";
import ramReducer from "./reducers/ramSlice";

const rootReducer = combineReducers({
    user: userReducer,
    ram: ramReducer
})

const store = configureStore({
    reducer: rootReducer
});

export default store;