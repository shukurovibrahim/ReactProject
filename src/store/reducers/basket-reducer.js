import { createSlice } from "@reduxjs/toolkit";

export const {
  reducer: basketReducer,
  actions: {
    addItemToList,
    setIsLoading,
    removeItemFromList,
    setListName,
    addListToBasket,
    setListId,
    clearList,
  },
} = createSlice({
  name: "basket",
  initialState: {
    items: [],
    isLoading: false,
    list: {
      id: "",
      name: "",
      items: [],
    },
  },
  reducers: {
    setListName(state, action) {
      state.list.name = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    removeItemFromList(state, action) {
      state.list.items = state.list.items.filter(
        (item) => item.imdbID !== action.payload,
      );
    },
    addItemToList(state, action) {
      if (
        state.list.items.some((item) => item.imdbID === action.payload.imdbID)
      ) {
        return;
      }
      state.list.items.push(action.payload);
    },
    addListToBasket(state, action) {
      if (!state.list.name || !state.list.items.length) {
        return;
      }

      state.items.push(action.payload);
    },
    setListId(state, action) {
      state.list.id = action.payload;
    },
    clearList(state) {
      state.list.id = "";
      state.list.name = "";
      state.list.items = [];
    },
  },
  reducerPath: "basket-reducer.js",
});
