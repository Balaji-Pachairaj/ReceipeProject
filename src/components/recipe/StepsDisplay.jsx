import React from "react";
import { Card } from "react-bootstrap";
import classes from "./recipe.module.css";
import { useSelector } from "react-redux";

const StepsDisplay = () => {
     const addrecipe = useSelector((state) => {
          return state.addrecipe;
     });

     let steps = addrecipe.steps;

     return (
          <Card className={classes.displaySteps}>
               <Card.Title>Steps :</Card.Title>
               <Card className="border-0">
                    {steps.map((step, index) => {
                         return (
                              <Card.Text>
                                   {index + 1 + ")    "}
                                   {step}
                              </Card.Text>
                         );
                    })}
               </Card>
          </Card>
     );
};

export default StepsDisplay;
