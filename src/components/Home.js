import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";

const Home = () => {
  if (localStorage.jwtToken) {
    authToken(localStorage.jwtToken);
  }

  const auth = useSelector((state) => state.auth);

  return (
    <Alert style={{ backgroundColor: "#343A40", color: "#ffffff80" }}>
      Back office managed by {auth.username}
    </Alert>
  );
};

export default Home;
