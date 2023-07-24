import React from "react";
import RecipeHeader from "./RecipeHeader";
import StepsOfRecipe from "./StepsOfRecipe";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getDay, getMonth, updateViews } from "../store/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaneArrival , faEye } from "@fortawesome/free-solid-svg-icons";

const IndividualRecipe = ({id}) => {
     const recipe = useSelector((state) => {
          return state.recipe;
     });
     const dispatch = useDispatch()
     const IndivRecipe ={

          ... recipe.individualRecipe,
     }
     const dateTime = new Date(IndivRecipe.date);
     const date = dateTime.getDate();
     const day = getDay(dateTime.getDay());
     const month = getMonth(dateTime.getMonth());
     const displayTime = day + ", " + date + " " + month;

     
     if (IndivRecipe.recipeName){
          IndivRecipe.views = ++IndivRecipe.views
          dispatch(updateViews(id,IndivRecipe))
     }
     return (
          <>
               {!IndivRecipe.recipeName && (
                    <p className="text-center mt-5">
                         <FontAwesomeIcon
                              icon={faPlaneArrival}
                              className="fs-2"
                              beatFade
                         />
                    </p>
               )}
               {IndivRecipe.recipeName && (
                    <div className="mt-5 text-center">
                         <RecipeHeader
                              header={IndivRecipe.recipeName}
                              message={IndivRecipe.recipeSummary}
                         />
                         <div className=" d-flex justify-content-center">
                              <Card className="mt-4 pt-2 pb-2 shadow-lg" style={{ width: "20rem" }}>
                                   <Card.Title className=" d-flex justify-content-center">
                                        {" "}
                                        <p className="m-0">{IndivRecipe.views}</p>
                                        <FontAwesomeIcon
                                             icon={faEye}
                                             className="mt-1 ms-1 me-1"
                                        />
                                        {/* <p className="m-0"> Views </p> */}
                                        {"."}
                                        {displayTime}
                                   </Card.Title>
                              </Card>
                         </div>
                         <div className="d-flex justify-content-center mt-3">
                              <StepsOfRecipe steps={IndivRecipe.steps} />
                         </div>
                    </div>
               )}
          </>
     );
};

export default IndividualRecipe;
