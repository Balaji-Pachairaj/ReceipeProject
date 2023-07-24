import React from "react";

import RecipeList from "./RecipeList";
import RecipeHeader from "./RecipeHeader";
import { useSelector } from "react-redux";
const OtherReceipe = () => {
    const ui = useSelector((state) =>{
     return state.ui
    })
     const header = "Check out Other's recipes";
     const message = ui.headerMessage 
         
     return (
          <div className="mt-5 text-center" style={{ animation: "slideUp 1s" }}>
               <RecipeHeader message={message} header={header} />
               <div>
                    <RecipeList />
               </div>
          </div>
     );
};

export default OtherReceipe;
