import React from "react";
import { Card } from "react-bootstrap";
const RecipeHeader = (props) => {
     return (
          <div>
               <h2 className="text-center">{props.header}</h2>
               <Card
                    bg="light"
                    text="dark"
                    className="p-3 ms-lg-5 me-lg-5 ms-sm-3 me-sm-3 me-3 ms-3  mt-4 shadow"
               >
                    <Card.Text>{props.message}</Card.Text>
               </Card>
          </div>
     );
};

export default RecipeHeader;
