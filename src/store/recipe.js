import { createSlice } from "@reduxjs/toolkit";
import { uiSliceAction } from "./ui";
import { json } from "react-router-dom";

const initialState = {
     recipeList: [],
     individualRecipe: {
          recipeName: "",
          email: "",
          steps: [],
          recipeSummary: "",
          recipeType: "",
          date: "",
          views: "",
     },
     indivRecipeId: "",
};

const recipeSlice = createSlice({
     name: "recipe",
     initialState,
     reducers: {
          loadingRecipeData(state, action) {
               let array = [];

               let fetchedData = action.payload;

               for (let key in fetchedData) {
                    let recipe = {
                         key: key,
                         recipeName: fetchedData[key].recipeName,
                         email: fetchedData[key].email,
                         steps: fetchedData[key].steps,
                         recipeSummary: fetchedData[key].recipeSummary,
                         recipeType: fetchedData[key].recipeType,
                         date: fetchedData[key].date,
                         views: fetchedData[key].views,
                    };

                    array.unshift(recipe);
               }

               return {
                    ...state,
                    recipeList: array,
               };
          },

          loadingIndividualRecipeData(state, action) {
               return {
                    ...state,
                    individualRecipe: action.payload,
               };
          },
          resetIndividualRecipes(state, action) {
               return {
                    ...state,
                    individualRecipe: initialState.individualRecipe,
               };
          },
          setIndivRecipeId(state, action) {
               return {
                    ...state,
                    indivRecipeId: action.payload,
               };
          },
          resetIndividualRecipes(state) {
               return {
                    ...state,
                    indivRecipeId: "",
               };
          },
     },
});

export const recipeSliceAction = recipeSlice.actions;

export default recipeSlice;

export const gettingRecipeData = () => {
     return async (dispatch) => {
          async function fetchData() {
               let response;
               try {
                    response = await fetch(
                         "https://recipeapp-4971c-default-rtdb.firebaseio.com/recipes.json"
                    );
               } catch (e) {
                    console.log(e.message);
                    if (e.message === "Failed to fetch") {
                         dispatch(
                              uiSliceAction.setAlertMessage({
                                   index: true,
                                   message: "Cannot not able to data from servers",
                                   link: true,
                                   route: "/",
                                   linkMessage: "Try again",
                              })
                         );
                    }
                    return;
               }

               const responseData = await response.json();
               dispatch(recipeSliceAction.loadingRecipeData(responseData));
          }
          fetchData();
     };
};

export const gettingIndividualRecipeData = (recipeId) => {
     return (dispatch) => {
          async function fetchData() {
               let response, responseData;
               try {
                    response = await fetch(
                         "https://recipeapp-4971c-default-rtdb.firebaseio.com/recipes/" +
                              recipeId +
                              ".json"
                    );
                    responseData = await response.json();
                    if (!responseData) {
                         throw "r";
                    }
               } catch (e) {
                    console.log(e);
                    if (e.message === "Failed to fetch") {
                         dispatch(
                              uiSliceAction.setAlertMessage({
                                   index: true,
                                   message: "Cannot not able to data from servers",
                                   link: true,
                                   route: "/",
                                   linkMessage: "Try again",
                              })
                         );
                    }
                    if (
                         e === "r" ||
                         e.error === "Invalid path: Invalid token in path"
                    ) {
                         dispatch(
                              uiSliceAction.setAlertMessage({
                                   index: true,
                                   message: "Recipe is not found",
                                   link: true,
                                   route: "/recipes",
                                   linkMessage: "Try out other's recipe",
                              })
                         );
                    }
                    return;
               }

               dispatch(
                    recipeSliceAction.loadingIndividualRecipeData(responseData)
               );
          }
          fetchData();
     };
};

export const updateViews = (recipeId , recipe ) => {
     return async (dispatch) => {
          let response, responseData;
          try {
               response = await fetch(
                    "https://recipeapp-4971c-default-rtdb.firebaseio.com/recipes/" +
                         recipeId +
                         ".json"
               ,{
                    method : "PUT",
                    body : JSON.stringify(recipe),
                    headers: {
                         "Content-Type": "application/json",
                    }, 
               });
               responseData = await response.json();
               console.log(responseData)
               if (!responseData) {
                    throw "r";
               }
          } catch (e) {}
          dispatch(gettingRecipeData())
     };
};

export const getDay = (dayNo) => {
     switch (dayNo) {
          case 0:
               return "sun";
          case 1:
               return "mon";
          case 2:
               return "tue";
          case 3:
               return "wed";
          case 4:
               return "thu";
          case 5:
               return "fri";
          case 6:
               return "sat";
          default:
               return "day";
     }
};

export const getMonth = (monthNo) => {
     switch (monthNo) {
          case 0:
               return "Jan";
          case 1:
               return "Feb";
          case 2:
               return "Mar";
          case 3:
               return "Apr";
          case 4:
               return "May";
          case 5:
               return "Jun";
          case 6:
               return "Jul";
          case 7:
               return "Aug";
          case 8:
               return "Sep";
          case 9:
               return "Oct";
          case 10:
               return "Nov";
          case 11:
               return "Dec";
     }
};
