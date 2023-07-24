import { createSlice } from "@reduxjs/toolkit";

import { uiSliceAction } from "./ui";
import { recipeSliceAction } from "./recipe";

const initialState = {
     recipeName: "",
     recipeType: "Breakfast",
     recipeSummary: "",
     addRecipeModal: false,
     steps: [],
     completedRecipeSteps: false,

};

const addrecipeSlice = createSlice({
     name: "addrecipe",
     initialState,
     reducers: {
          addRecipeName(state, action) {
               return {
                    ...state,
                    recipeName: action.payload,
               };
          },
          addRecipeType(state, action) {
               return {
                    ...state,
                    recipeType: action.payload,
               };
          },
          addRecipeSummary(state, action) {
               return {
                    ...state,
                    recipeSummary: action.payload,
               };
          },
          changeModal(state, action) {
               const modal = !state.addRecipeModal;
               return {
                    ...state,
                    addRecipeModal: modal,
               };
          },

          addSteps(state, action) {
               let step = action.payload;

               let nextstep = [];

               for (let i = 0; i < state.steps.length; i++) {
                    nextstep.push(state.steps[i]);
               }
               nextstep.push(step);
               return {
                    ...state,
                    steps: nextstep,
               };
          },

          completedSteps(state, action) {
               return {
                    ...state,
                    completedRecipeSteps: action.payload,
               };
          },
          resetAddRecipe() {
               return initialState;
          },
     },
});

export const addrecipeActions = addrecipeSlice.actions;

export default addrecipeSlice;

///Thunk for posting added recipes

export const postingAddedRecipe = (recipe) => {
     return async (dispatch) => {
          console.log(recipe);

          const fetchData = async () => {
               try {
                    const response = await fetch(
                         "https://recipeapp-4971c-default-rtdb.firebaseio.com/recipes.json",
                         {
                              method: "POST",
                              body: JSON.stringify(recipe),
                              headers: {
                                   "Content-Type": "application/json",
                              },
                         }
                    );

                    console.log(response.ok, response);
                    if (!response.ok) {
                         throw "Something went wrong";
                    }
                    const responseData = await response.json();
                    dispatch(recipeSliceAction.setIndivRecipeId(responseData.name))
                    console.log(responseData.name)

              } catch (e) {
                    dispatch(
                         uiSliceAction.setAlertMessage({
                              index: true,
                              message: "Something went wrong",
                              link: true,
                              route: "/",
                              linkMessage: "try again",
                         })
                    );
               }
               dispatch(addrecipeActions.resetAddRecipe());
              
          };
          fetchData();
     };
};



