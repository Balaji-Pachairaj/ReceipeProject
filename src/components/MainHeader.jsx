import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKitchenSet } from "@fortawesome/free-solid-svg-icons";
const MainHeader = () => {
     const { auth } = useSelector((state) => {
          return state.auth;
     });
     const dispatch = useDispatch();
     const naviagte = useNavigate();
     const navigateAnotherPage = () => {
          naviagte("/addrecipe");
     };

     const signOut = () => {
          dispatch(logout());
     };
     return (
          <>
               <Navbar bg="warning" expand="sm" variant="warning">
                    <Container>
                         <Navbar.Brand href="/" className="fs-3 fw-semibold">
                              Receipe
                              <FontAwesomeIcon icon={faKitchenSet} className="ms-3" />
                         </Navbar.Brand>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                         <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="me-auto ms-md-5 fs-4 ">
                                   <Nav.Link>
                                        <NavLink
                                             to="/"
                                             className="text-decoration-none text-dark"
                                        >
                                             Home
                                        </NavLink>
                                   </Nav.Link>
                                   <Nav.Link>
                                        <NavLink
                                             to="/recipes"
                                             className="text-decoration-none text-dark"
                                        >
                                             Recipes
                                        </NavLink>
                                   </Nav.Link>
                                   <Nav.Link href="/recipes">
                                        {auth && (
                                             <NavLink
                                                  onClick={signOut}
                                                  className="text-decoration-none text-dark"
                                             >
                                                  Logout
                                             </NavLink>
                                        )}
                                        {!auth && (
                                             <NavLink
                                                  to="/login?user=exist"
                                                  className="text-decoration-none text-dark"
                                             >
                                                  Signin
                                             </NavLink>
                                        )}
                                   </Nav.Link>
                                   <Button
                                        onClick={navigateAnotherPage}
                                        variant="light"
                                        className="pt-0 pb-0 ms-2 "
                                   >
                                        <p className="m-0 text-decoration-none  text-danger text-nowrap">
                                             Add recipes
                                        </p>
                                   </Button>
                              </Nav>
                         </Navbar.Collapse>
                    </Container>
               </Navbar>
          </>
     );
};

export default MainHeader;
