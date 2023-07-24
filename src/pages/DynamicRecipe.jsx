import React from "react";

import { useParams } from "react-router-dom";
import IndividualRecipe from "../components/IndividualRecipe";
import { useDispatch } from "react-redux";
import {
     gettingIndividualRecipeData,
     recipeSliceAction,
} from "../store/recipe";

const DynamicRecipe = () => {
     const param = useParams().recipeId;

     const dispatch = useDispatch();
     dispatch(recipeSliceAction.resetIndividualRecipes());
     dispatch(gettingIndividualRecipeData(param));

     return (
          <div style={{ animation: "slideUp 1s" }}>
               <IndividualRecipe id={param} />
          </div>
     );
};

export default DynamicRecipe;
