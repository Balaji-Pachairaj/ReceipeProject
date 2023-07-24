import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import classes from "./recipe.module.css";
import { useDispatch } from "react-redux";
import { addrecipeActions } from "../../store/addrecipe";
const messageValid = (text) => {
     if (text.trim().length > 19) {
          return true;
     }
     return false;
};

const StepsInput = () => {
    const dispatch = useDispatch()

     const [stepMessage, setSetMessage] = useState("");
     const [isMessageValid, setIsMessageValid] = useState(false);

     const changeMessage = (event) => {

          setSetMessage(event.target.value);
          setIsMessageValid(messageValid(event.target.value));
     };

     const submitHandler = (event) => {
          event.preventDefault();

          if (isMessageValid) {
          
               dispatch(addrecipeActions.addSteps(stepMessage))
                dispatch(addrecipeActions.changeModal())
          }
     };
     return (
          <Card
               className={classes.stepsInput}
               style={{ backgroundColor: "#ACBCFF" }}
          >
               <Card.Title>Add Your Steps :</Card.Title>
               <hr className="m-1 mb-3" />
               <Form validated={isMessageValid} onSubmit={submitHandler}>
                    <Form.Group>
                         <textarea
                              value={stepMessage}
                              onChange={changeMessage}
                              className="w-100"
                              rows="4"
                              cols={"60"}
                         />
                         {!isMessageValid && (
                              <p className="m-0 ms-1 text-primary">
                                   Steps should be more than 20 characters
                              </p>
                         )}
                    </Form.Group>
                    <Form.Group className="d-flex justify-content-end">
                         <button className="btn btn-warning mt-2">
                              Post the step
                         </button>
                    </Form.Group>
               </Form>
          </Card>
     );
};

export default StepsInput;
