import React from "react";
import { Card } from "react-bootstrap";
import classes from "./recipeBox.module.css";

const StepsOfRecipe = (props) => {
     const steps = props.steps || [];
     return (
          <div className={classes.stepsDisplay}>
               <Card
                    style={{ backgroundColor: "#FFE194" }}
                    className=" pb-5 shadow-lg"
               >
                    <Card.Title className="pt-3 text-center">
                         Steps need to follow{" "}
                    </Card.Title>
                    <hr className="m-3 mt-1" />
                    {steps.map((step, index) => {
                         return (
                              <Card.Text className="p-3 ps-lg-5 pe-lg-5 text-start">
                                   {index + 1 + ")    "}
                                   {step}
                              </Card.Text>
                         );
                    })}
               </Card>
          </div>
     );
};

export default StepsOfRecipe;
