import React from "react";
import MainHeader from "../components/MainHeader";

const Error = () => {
     return (
          <div>
               <MainHeader />
               <div
                    className=" text-center p-5 pt-3 "
                    style={{ background: "#F99B7D", animation: "slideUp 1s" }}
               >
                    <h1 className="mt-5">An error occurs</h1>
                    <h5 className="mt-5 mb-5">Something went wrong </h5>
               </div>
          </div>
     );
};

export default Error;
