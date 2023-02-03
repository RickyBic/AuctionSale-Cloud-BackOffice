import React from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationBar from "./components/NavigationBar";
import Categorie from "./components/Categorie/Categorie";
import EnchereList from "./components/Enchere/EnchereList";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";
import Footer from "./components/Footer";
import Home from "./components/Home";

const App = () => {
  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = "";
    }
    return "";
  };

  return (
    <Router>
      <NavigationBar />
      <Container>
        <Row>
          <Col lg={12} className={"margin-top"}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/home" exact component={Home} />
              <Route path="/categories" exact component={Categorie} />
              <Route path="/encheres" exact component={EnchereList} />
              <Route path="/users" exact component={UserList} />
              <Route path="/logout" exact component={Login} />
            </Switch>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
