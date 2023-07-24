import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     headerMessage : "Welcome to our recipe community! We're thrilled to have you here, and we encourage you to share your favorite recipes with our passionate food-loving community. Whether you're an experienced chef, a home cook, or just someone who enjoys experimenting in the kitchen, your culinary creations are valued and appreciated. Feel free to post your recipes and join in the exchange of flavors, tips, and inspiration.",
     signSpinner: false,
     alert: {
          index: false,
          message: "",
          link: false,
          route: "",
          linkMessage: "",
        
     },
};

const uiSlice = createSlice({
     name: "uiSlice",
     initialState,
     reducers: {
          showSignSpinner(state, action) {
               return {
                    ...state,
                    signSpinner: true,
               };
          },
          cancelSignSpinner(state, action) {
               return {
                    ...state,
                    signSpinner: false,
               };
          },

          resetAlertMessage(state) {
               return {
                    ...state,
                    alert: initialState.alert,
               };
          },

          setAlertMessage(state, action) {
               const alterObj = action.payload;
  
               return {
                    ...state,
                    alert: {
                         index: alterObj.index,
                         message: alterObj.message,
                         link: alterObj.link,
                         route: alterObj.route,
                         linkMessage: alterObj.linkMessage,
                    },
               };
          },
     },
});

export const uiSliceAction = uiSlice.actions;

export default uiSlice;
