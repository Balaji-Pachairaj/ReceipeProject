import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faClipboard } from "@fortawesome/free-regular-svg-icons";

import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getDay , getMonth } from "../store/recipe";
const returnEmailName = (email) => {
     const array = email.split("@gmail.com");
     return array[0];
};

const RecipeListItem = ({ user }) => {
     const navigate = useNavigate();
     const buttonClickHandler = () => {
          navigate("/recipes/" + user.key);
     };
     const email = returnEmailName(user.email);
     const dateTime = new Date(user.date)
     const date = dateTime.getDate()
     const day = getDay(dateTime.getDay())
     const month = getMonth(dateTime.getMonth())
     const displayTime = day + ", "+ date + " " + month 
     return (
          <div key={user.key}>
               <Card
                    style={{
                         width: "24rem",
                         minHeight : "15rem",
                         backgroundColor: "#BFCCB5",
                    }}
                    className="shadow"
               >
                    <Card.Body>
                         <div className=" d-flex justify-content-evenly align-items-center">
                              <Card.Title className="mt-2 overflow-hidden fs-2 ">
                                   {user.recipeName}
                              </Card.Title>

                              <button
                                   onClick={buttonClickHandler}
                                   className=" btn btn-outline-dark"
                              >
                                   <div className=" d-flex">
                                        <h6 className=" pt-1">
                                             Details
                                             <FontAwesomeIcon
                                                  icon={faClipboard}
                                                  className=" ms-2"
                                             />
                                        </h6>
                                   </div>
                              </button>
                         </div>

                         <hr />
                         <h6 className="mb-0 d-flex justify-content-start ms-3">
                              <p className="m-0">{user.views}</p>
                              <FontAwesomeIcon
                                   icon={faEye}
                                   className="mt-1 ms-1 me-1"
                              />
                              {/* <p className="m-0"> Views </p> */}
                              {"."}
                              {displayTime}

                         </h6>
                         <Card.Body className=" text-start">
                              {user.recipeSummary}.
                         </Card.Body>
                         <Card.Subtitle className=" text-end me-5">
                              {email}
                         </Card.Subtitle>
                    </Card.Body>
               </Card>
          </div>
     );
};

export default RecipeListItem;
