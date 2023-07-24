import React from "react";
import RecipeListItem from "./RecipeListItem";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

const RecipeList = () => {
     const recipe = useSelector((state) => {
          return state.recipe;
     });
     let recipeList = recipe.recipeList;

     return (
          <div className="d-flex flex-row flex-wrap justify-content-center align-content-center gap-5 mt-5 mb-5">
               {recipeList.length === 0 && <Spinner />}
               {recipeList &&
                    recipeList.map((recipe) => {
                         return <RecipeListItem user={recipe} key={recipe.key} />;
                    })}
          </div>
     );
};

export default RecipeList;
