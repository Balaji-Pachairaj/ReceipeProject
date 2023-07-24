import React from "react";
import classes from "./pages.module.css";
import RecipeAdd from "../components/recipe/RecipeAdd";
const AddRecipes = () => {
     return (
          <div className={classes.addrecipes}>
               <RecipeAdd />
          </div>
     );
};

export default AddRecipes;
