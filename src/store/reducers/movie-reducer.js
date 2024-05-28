import { createSlice } from "@reduxjs/toolkit";

export const {
  reducer: movieReducer,
  actions: { setMovies },
} = createSlice({
  name: "movie",
  initialState: {
    movies: [],
  },
  reducers: {
    setMovies(state, { payload }) {
      state.movies = payload;
    },
  },
  reducerPath: "movie-reducer.js",
});
