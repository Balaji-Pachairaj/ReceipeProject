import React, { useState } from "react";
import { Card, Form, Spinner } from "react-bootstrap";
import { faCircleUser , faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import classes from "./pages.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import { createUser, signin } from "../store/auth";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../store/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState();
     const emailChangeHandler = (event) => {
          setEmail(event.target.value);
     };
     const passwordChangeHandler = (event) => {
          setPassword(event.target.value);
     };
     const confirmPasswordChangeHandler = (event) => {
          setConfirmPassword(event.target.value);
     };

     const ui = useSelector((state) => {
          return state.ui;
     });
     const dispatch = useDispatch();
     const navigate = useNavigate();

     const [mode] = useSearchParams("user");

     const user = mode.get("user");
     const isUser = user === "new" ? false : true;

     let signMessage = !isUser
          ? "**Already!!, Having an account?"
          : "**Hey , Are you new here?";
     let buttonMessage = isUser ? "Log in " : "Sign Up";
     let titleMessage = isUser
          ? `Login your `
          : "Create new ";

     const anotherNavigation = () => {
          console.log("asfsafd");
          if (isUser) {
               navigate("/login?user=new");
          } else {
               navigate("/login?user=exist");
          }
     };

     const submitHandler = async (event) => {
          event.preventDefault();
          let userObj = {
               email: email,
               password: password,
          };
          if (password.trim().length < 6) {
               dispatch(
                    uiSliceAction.setAlertMessage({
                         index: true,
                         message: "Password should be atleast 6 characters",
                    })
               );
               return;
          }
          if (!isUser && confirmPassword === "") {
               dispatch(
                    uiSliceAction.setAlertMessage({
                         index: true,
                         message: "Input fields cannot be empty",
                    })
               );
               return;
          }

          if (!isUser) {
               if (password !== confirmPassword) {
                    dispatch(
                         uiSliceAction.setAlertMessage({
                              index: true,
                              message: "Passwords are not matching ",
                         })
                    );
                    return;
               }
               const responseData = await dispatch(createUser(userObj));

               if (responseData) {
                    setTimeout(() => {
                         navigate("/");
                    }, 800);
               }
               return;
          }

          const logResponseData = await dispatch(signin(userObj));
          dispatch(uiSliceAction.resetAlertMessage());
          if (logResponseData) {
               setTimeout(() => {
                    navigate("/");
               }, 800);
          }
     };

     return (
          <div
               style={{ width: "100%", height: "90vh", animation: "showUp 1s" }}
          >
               <Card
                    className={classes.signup}
                    style={{ backgroundColor: "#8FCFE5" }}
               >
                    <div className=" d-flex justify-content-between ">
                         <Card.Title>{titleMessage }
                         <FontAwesomeIcon className="me-1" icon={faCircleUser} />
                         account
                         </Card.Title>

                         {ui.signSpinner && (
                              <Spinner
                                   animation="border"
                                   variant="dark"
                                   className="me-3"
                              />
                         )}
                    </div>
                    <hr className="bg-black" />
                    <Form onSubmit={submitHandler}>
                         <Form.Group className="mb-3">
                              <Form.Label>Email Address</Form.Label>
                              <Form.Control
                                   type="email"
                                   onChange={emailChangeHandler}
                                   value={email}
                                   required
                              />
                         </Form.Group>
                         <Form.Group className="mb-3">
                              <Form.Label>Password </Form.Label>
                              <Form.Control
                                   type="password"
                                   onChange={passwordChangeHandler}
                                   value={password}
                                   required
                              />
                         </Form.Group>
                         {!isUser && (
                              <Form.Group className="mb-3">
                                   <Form.Label>Confirm password</Form.Label>
                                   <Form.Control
                                        type="password"
                                        onChange={confirmPasswordChangeHandler}
                                        value={confirmPassword}
                                   />
                              </Form.Group>
                         )}

                         <Form.Group className="mb-3 d-flex justify-content-end">
                              <button className="btn btn-primary" type="submit">
                                   {buttonMessage}
                                   <FontAwesomeIcon icon={faPaperPlane} className=" ms-2" />
                              </button>
                         </Form.Group>
                    </Form>
                    <p
                         onClick={anotherNavigation}
                         className="  m-0 text-center"
                    >
                         {signMessage}
                    </p>
               </Card>
          </div>
     );
};

export default Signup;
