import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action){
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        setLoading(state, action){
            state.isLoading = action.payload;
        },
        setError(state, action){
            state.error = action.payload;
        },
        resetState(state){
            state.user = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = null;
            state.token = null;
            state.expiresIn = null;
        }
    }
});

export const { setUser, setLoading, setError, resetState } = userSlice.actions;

export const login = (userData) => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.post(import.meta.env.VITE_APP_URL + "/api/user/login", userData);
        axios.defaults.headers.common["Authorization"] = response.data.token;
        dispatch(setUser(response.data));
    } catch (error) {
        dispatch(setError(error.response.data.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const register = (userData) => async dispatch => {
    try {
        dispatch(setLoading(true));
        await axios.post(import.meta.env.VITE_APP_URL + "/api/user/signup", userData);
        // console.log(response);
    } catch (error) {
        dispatch(setError(error.response.data.message));
    } finally {
        dispatch(setLoading(false));
    }
};

export const logout = () => async dispatch => {
    try {
        dispatch(resetState());
        delete axios.defaults.headers.common["Authorization"];
    } catch (error) {
        console.log(error);
    }
};

export const getMe = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(import.meta.env.VITE_APP_URL + "/api/user/");
        dispatch(setUser(response.data));
        console.log(response.data);
    } catch (error) {
        dispatch(setError(error.response.data.error));
    } finally {
        dispatch(setLoading(false));
    }
};

export default userSlice.reducer;