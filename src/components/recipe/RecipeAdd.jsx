import React from "react";
import InputAddRecipe from "./InputAddRecipe";
import classes from "./recipe.module.css";

import StepsHandler from "./StepsHandler";
import StepsInput from "./StepsInput";
import StepsDisplay from "./StepsDisplay";

import { useSelector } from "react-redux";
import StepsOfRecipe from "../StepsOfRecipe";
const RecipeAdd = () => {
     const addrecipe = useSelector((state) => {
          return state.addrecipe;
     });
     const isAddingSteps = addrecipe.addRecipeModal;
     const isCompletedSteps = addrecipe.completedRecipeSteps;
     return (
          <div
               className="d-flex flex-column"
               style={{ animation: "slideUp 1s" }}
          >
               <div className="mt-4">
                    <h1 className="text-center" style={{ color: "#B799FF" }}>
                         Add your recipes
                    </h1>
                    <hr className="border border-warning border-2 ms-5  me-5" />
               </div>

               <div className={classes.wholeBox}>
                    <div className={classes.wholeElement1}>
                         <div className="w-100 d-flex justify-content-center">
                              <InputAddRecipe />
                         </div>
                    </div>
                    <div className={classes.wholeElement2}>
                         {!isCompletedSteps && (
                              <div className="w-100 d-flex justify-content-center">
                                   <StepsHandler />
                              </div>
                         )}
                         {!isCompletedSteps && isAddingSteps && (
                              <div className=" d-flex justify-content-center">
                                   <StepsInput />
                              </div>
                         )}
                         {!isCompletedSteps && (
                              <div className="w-100 d-flex justify-content-center">
                                   <StepsDisplay />
                              </div>
                         )}

                         {isCompletedSteps && (
                              <div className="w-100 d-flex justify-content-center">
                                   <StepsOfRecipe steps={addrecipe.steps} />
                              </div>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default RecipeAdd;
