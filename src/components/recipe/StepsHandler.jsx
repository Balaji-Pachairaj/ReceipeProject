import React from "react";
import classes from "./recipe.module.css";
import { Card } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { addrecipeActions } from "../../store/addrecipe";

import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const StepsHandler = () => {
     const dispatch = useDispatch();

     const clickHandler = () => {
          dispatch(addrecipeActions.changeModal());
     };

     const completedClickHandler = () => {
          dispatch(addrecipeActions.completedSteps(true));
     };

     return (
          <Card
               className={classes.stepsHandler}
               style={{ backgroundColor: "#B799FF" }}
          >
               <div className="d-flex justify-content-between ms-3 me-5 pt-2">
                    <Card.Title>Steps Handler</Card.Title>
                    <button onClick={clickHandler} className="btn btn-primary">
                         <FontAwesomeIcon icon={faPlus} /> Steps
                    </button>
               </div>
               <hr className="m-1" />
               <Card.Text className="text-center">
                    <button
                         onClick={completedClickHandler}
                         className="btn btn-warning mt-2 mb-2"
                    >
                         Click me after completing recipe steps
                    </button>
               </Card.Text>
          </Card>
     );
};

export default StepsHandler;
