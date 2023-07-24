import React, { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { uiSliceAction } from "../store/ui";
import { authChange } from "../store/auth";
import { gettingRecipeData } from "../store/recipe";
let intitalTime = 0;
const Root = () => {
     const alert = useSelector((state) => {
          return state.ui.alert;
     });
     const dispatch = useDispatch();
     const naviagte = useNavigate();

    
     const clickHandler = () => {
          console.log("sadsafd", alert.route);
          naviagte(alert.route);
          dispatch(uiSliceAction.resetAlertMessage());
     };
     const closeHandler = () => {
          if (!alert.link) {
               dispatch(uiSliceAction.resetAlertMessage());
          }
     };

     useEffect(() => {
          const timer = setTimeout(() => {
               if (!alert.link) {
                    dispatch(uiSliceAction.resetAlertMessage());
               }
          }, 3000);

          return () => {
               clearTimeout(timer);
          };
     }, [alert,dispatch]);

     useEffect(() => {
          if (!intitalTime) {
               dispatch(authChange());
               dispatch(gettingRecipeData());
          }
     }, [dispatch]);
     return (
          <div>
               <MainHeader />
               {alert.index && (
                    <Alert
                         onClick={closeHandler}
                         className=" text-center"
                         variant="dark"
                    >
                         {alert.message} {"   "}{" "}
                         {alert.link && (
                              <p
                                   onClick={clickHandler}
                                   className=" d-inline text-primary text-decoration-underline"
                              >
                                   {alert.linkMessage}
                              </p>
                         )}
                    </Alert>
               )}
               <Outlet />
          </div>
     );
};

export default Root;
