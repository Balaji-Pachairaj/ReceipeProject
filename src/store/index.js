import { configureStore } from "@reduxjs/toolkit";

import recipeSlice from "./recipe";
import addrecipeSlice from "./addrecipe";
import authSlice from "./auth";
import uiSlice from "./ui";
const store = configureStore({
     reducer: {
          recipe: recipeSlice.reducer,
          addrecipe: addrecipeSlice.reducer,
          auth: authSlice.reducer,
          ui: uiSlice.reducer,
     },
});

export default store;
