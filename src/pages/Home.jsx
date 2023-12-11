import React from "react";

import OtherReceipe from "../components/OtherReceipe";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const Home = () => {
     const { auth } = useSelector((state) => {
          return state.auth;
     });
     const naviagte = useNavigate();

     const navigateCreate = () => {
          naviagte("/login?user=new");
     };

     const navigateExist = () => {
          naviagte("/login?user=exist");
     };

     return (
          <>
               <div
                    style={{ background: "#4D4D4D", animation: "slideUp 1s" }}
                    className=" shadow-lg p-5"
               >
                    <h1 class="text-center text-light mb-5 ">
                         Coooking is an expression that crosses boundaries.
                    </h1>
                    {!auth && (
                         <div className=" d-flex justify-content-center flex-lg-row flex-sm-row flex-wrap gap-4">
                              <button
                                   onClick={navigateCreate}
                                   className="btn btn-warning shadow p-md-3 p-sm-2"
                              >
                                   Create new user account
                              </button>
                              <button
                                   onClick={navigateExist}
                                   className="btn btn-outline-light p-md-3 p-sm-2 shadow-lg"
                              >
                                   Log in existing account
                              </button>
                         </div>
                    )}
               </div>

               <OtherReceipe />

               
          </>
     );
};

export default Home;
