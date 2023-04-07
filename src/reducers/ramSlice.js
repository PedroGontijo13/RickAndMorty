import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  characters: [],
  locations: [],
  episodes: [],
  isLoading: false,
  error: null,
};

const ramSlice = createSlice({
  name: "ram",
  initialState,
  reducers: {
    setCharacters(state, action) {
      state.characters = action.payload;
    },
    setLocations(state, action) {
      state.locations = action.payload;
    },
    setEpisodes(state, action){
      state.episodes = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCharacters, setLocations, setEpisodes, setLoading, setError } = ramSlice.actions;

export const fetchCharacters = () => async dispatch => {
    try {
        dispatch(setLoading(true));
        const response = await axios.get(import.meta.env.VITE_APP_RAM_URL + '/character');
        dispatch(setCharacters(response.data.results));
    } catch (error) {
        dispatch(setError(error.response.data.message));
    } finally {
        dispatch(setLoading(false));
    }
}

export const fetchLocations = () => async dispatch => {
  // write your logic here
    try {
        
    } catch (error) {
        
    }
}

export const fetchEpisodes = () => async dispatch => {
  // write your logic here
  try{

  }catch(error){

  }
}

export default ramSlice.reducer;