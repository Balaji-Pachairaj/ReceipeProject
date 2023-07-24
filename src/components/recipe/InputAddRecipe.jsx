import React from "react";
import { Card, Form } from "react-bootstrap";
import { faPlaneDeparture } from "@fortawesome/free-solid-svg-icons";
import classes from "./recipe.module.css";
import { addrecipeActions } from "../../store/addrecipe";
import { uiSliceAction } from "../../store/ui";
import { useDispatch, useSelector } from "react-redux";
import { postingAddedRecipe } from "../../store/addrecipe";
import { useNavigate } from "react-router-dom";
import { gettingRecipeData, recipeSliceAction } from "../../store/recipe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const InputAddRecipe = () => {
     const addrecipe = useSelector((state) => {
          return state.addrecipe;
     });
     const recipe = useSelector((state) =>{
          return state.recipe
     })
     const auth = useSelector((state) => {
          return state.auth;
     });
     const dispatch = useDispatch();
     const navigate = useNavigate()
     const timing = ["Breakfast", "Brunch", "Lunch", "Snack", "Dinner"];

     const completedChecked = addrecipe.completedRecipeSteps;

     const recipeNameHandler = (event) => {
          dispatch(addrecipeActions.addRecipeName(event.target.value));
     };

     const recipeTypeHandler = (event) => {
          dispatch(addrecipeActions.addRecipeType(event.target.value));
     };

     const recipeMessageHandler = (event) => {
          dispatch(addrecipeActions.addRecipeSummary(event.target.value));
     };

     const submitHandler = (event) => {
          event.preventDefault();
          console.log(event);
          if (!addrecipe.completedRecipeSteps) {
               dispatch(
                    uiSliceAction.setAlertMessage({
                         index: true,
                         message: "Press Completed Steps button",
                    })
               );
               return;
          }

          if (!auth.auth) {
               let alertObj = {
                    index: true,
                    message: "You need to login to post recipes",
                    link: true,
                    route: "/login?user=exist",
                    linkMessage: "Sign in",
               };
               dispatch(uiSliceAction.setAlertMessage(alertObj));
               return;
          }

          if (addrecipe.steps.length === 0) {
               dispatch(
                    uiSliceAction.setAlertMessage({
                         index: true,
                         message: "Step cannot be empty",
                    })
               );
               return;
          }
          let postingOfAddedRecipe = {
               recipeName: addrecipe.recipeName,
               steps: addrecipe.steps,
               recipeSummary: addrecipe.recipeSummary,
               recipeType: addrecipe.recipeType,
               email: auth.email,
               views : 0 , 
               date : new Date(),

          };

          dispatch(postingAddedRecipe(postingOfAddedRecipe));
       
          setTimeout(()=>{
               dispatch(gettingRecipeData())
               navigate("/recipes/"+recipe.indivRecipeId)
               dispatch(recipeSliceAction.resetIndividualRecipes())
          },2500)
     };

     const checkChangeHandler = (event) => {
          dispatch(addrecipeActions.completedSteps(event.target.checked));
     };

     return (
          <Card
               className={classes.inputRecipe}
               style={{ backgroundColor: "#FFC107" }}
          >
               <Card.Title className="fw-bold" style={{ color: "#413543" }}>
                    Details about recipes
               </Card.Title>
               <hr />
               <Form onSubmit={submitHandler}>
                    <Form.Group>
                         <Form.Label className=" fw-bold text-light">
                              Name of the recipe :
                         </Form.Label>
                         <Form.Control
                              type="text"
                              required
                              value={addrecipe.recipeName}
                              onChange={recipeNameHandler}
                         />
                         <Form.Control.Feedback type="invalid">
                              Recipe name should not be empty
                         </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mt-3">
                         <Form.Label className=" fw-bold text-light">
                              Which of these type :{" "}
                         </Form.Label>
                         <Form.Select
                              value={addrecipe.recipeType}
                              onChange={recipeTypeHandler}
                         >
                              {timing.map((time) => {
                                   return <option>{time}</option>;
                              })}
                         </Form.Select>
                    </Form.Group>
                    <Form.Group className="d-flex flex-column mt-3">
                         <Form.Label className=" fw-bold text-light">
                              Summary about the recipe :
                         </Form.Label>
                         <textarea
                              className=" rounded-2 form-control"
                              rows="4"
                              value={addrecipe.recipeSummary}
                              onChange={recipeMessageHandler}
                         ></textarea>
                    </Form.Group>
                    <Form.Group className="mt-3">
                         <Form.Check
                              onChange={checkChangeHandler}
                              type="switch"
                              label="Completed Recipe Steps"
                              checked={completedChecked}
                         />
                    </Form.Group>
                    <Form.Group className="mt-3">
                         <button
                              type="submit"
                              className="btn btn-outline-light fw-semibold"
                              onclick={submitHandler}
                         >
                              <FontAwesomeIcon icon={faPlaneDeparture} className="me-2" />
                              Post my recipe 
                              
                         </button>
                    </Form.Group>
               </Form>
          </Card>
     );
};

export default InputAddRecipe;
