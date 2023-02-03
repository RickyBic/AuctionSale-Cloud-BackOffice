import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from "../services/index";

const NavigationBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
  };

  const userLinks = (
    <>
      <Nav className="mr-auto">
        <Link to={"/categories"} className="nav-link">
          Ajouter catégorie
        </Link>
        <Link to={"/encheres"} className="nav-link">
          Liste enchères
        </Link>
        <Link to={"/users"} className="nav-link">
          Liste utilisateurs
        </Link>
        <Link to={"/home"} className="nav-link">
          Liste demandes
        </Link>
        <Link to={"/home"} className="nav-link">
          Statistiques
        </Link>
      </Nav>
      <Nav className="navbar-right">
        <Link to={"logout"} className="nav-link" onClick={logout}>
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </Link>
      </Nav>
    </>
  );

  return (
    <Navbar bg="dark" variant="dark">
      <Link to={auth.isLoggedIn ? "home" : ""} className="navbar-brand">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Book_icon_1.png"
          width="25"
          height="25"
          alt="brand"
        />{" "}
        Auction Sale
      </Link>
      {auth.isLoggedIn ? userLinks : null}
    </Navbar>
  );
};

export default NavigationBar;
