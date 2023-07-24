import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase";

import {
     createUserWithEmailAndPassword,
     onAuthStateChanged,
     signInWithEmailAndPassword,
     signOut,
} from "firebase/auth";
import { uiSliceAction } from "./ui";

const initialState = {
     auth: false,
     email: "",
};

const authSlice = createSlice({
     name: "authentication",
     initialState,
     reducers: {
          showDetails(state, action) {
               console.log(action.payload);

               console.log(state);
          },

          login(state, action) {
               return {
                    ...state,
                    auth: true,
                    email: action.payload,
               };
          },
          logout(state) {
               return initialState;
          },
     },
});

export const authSliceActions = authSlice.actions;
export default authSlice;

export const createUser = (userObj) => {
     return async (dispatch) => {
          async function user() {
               const { email, password } = userObj;
               dispatch(uiSliceAction.showSignSpinner());
               let response;
               try {
                    response = await createUserWithEmailAndPassword(
                         auth,
                         email,
                         password
                    );
               } catch (e) {
                    dispatch(uiSliceAction.cancelSignSpinner());
                    alert("Something went wrong");
                    return;
               }

               dispatch(uiSliceAction.cancelSignSpinner());

               dispatch(authSliceActions.login(response.user.email));
          }

          user();

          return true;
     };
};

export const signin = (userObj) => {
     return async (dispatch) => {
          const { email, password } = userObj;
          dispatch(uiSliceAction.showSignSpinner());
          let response;
          try {
               response = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
               );
          } catch (e) {
               console.log(e.code);
               dispatch(uiSliceAction.cancelSignSpinner());

               if (e.code === "auth/user-not-found") {
                    console.log("asdfsdaf");

                    alert(
                         "This user email is not authenticated in this app, signup for this app"
                    );
                    return;
               }
               if (e.code === "auth/wrong-password") {
                    alert("Password is incorrect");
                    return;
               }
               alert("Something went wrong");
               return;
          }

          dispatch(uiSliceAction.cancelSignSpinner());

          dispatch(authSliceActions.login(response.user.email));

          return true;
     };
};

export const authChange = () => {
     return async (dispatch) => {
          onAuthStateChanged(auth, (user) => {
               if (user) {
                    dispatch(authSliceActions.login(user.email));
                    console.log(user.uid)
               }
          });
     };
};

//Sign OUT

export const logout = () => {
     return async (dispatch) => {
          await signOut(auth);

          dispatch(authSliceActions.logout());
     };
};
