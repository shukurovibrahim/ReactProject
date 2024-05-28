import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./reducers/movie-reducer.js";
import { basketReducer } from "./reducers/basket-reducer.js";

export const store = configureStore({
  reducer: { movie: movieReducer, basket: basketReducer },
});
