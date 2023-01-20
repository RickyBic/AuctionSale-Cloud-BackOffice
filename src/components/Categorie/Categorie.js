import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveCategorie,
  fetchCategorie,
  updateCategorie,
} from "../../services/index";

import { Card, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";

class Categorie extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state = {
      show: false,
    };
  }

  initialState = {
    id: "",
    name: "",
  };

  componentDidMount() {
    const CategorieId = +this.props.match.params.id;
    if (CategorieId) {
      this.findCategorieById(CategorieId);
    }
  }

  findCategorieById = (CategorieId) => {
    this.props.fetchCategorie(CategorieId);
    setTimeout(() => {
      let Categorie = this.props.CategorieObject.Categorie;
      if (Categorie != null) {
        this.setState({
          id: Categorie.id,
          name: Categorie.name,
        });
      }
    }, 1000);
  };

  resetCategorie = () => {
    this.setState(() => this.initialState);
  };

  submitCategorie = (event) => {
    event.preventDefault();

    const Categorie = {
      name: this.state.name,
    };

    this.props.saveCategorie(Categorie);
    setTimeout(() => {
      if (this.props.CategorieObject.Categorie != null) {
        this.setState({ show: true, method: "post" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  updateCategorie = (event) => {
    event.preventDefault();

    const Categorie = {
      id: this.state.id,
      name: this.state.name,
    };
    this.props.updateCategorie(Categorie);
    setTimeout(() => {
      if (this.props.CategorieObject.Categorie != null) {
        this.setState({ show: true, method: "put" });
        setTimeout(() => this.setState({ show: false }), 3000);
      } else {
        this.setState({ show: false });
      }
    }, 2000);
    this.setState(this.initialState);
  };

  CategorieChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  CategorieList = () => {
    return this.props.history.push("/list");
  };

  render() {
    const { name } =
      this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.method === "put"
                ? "Categorie Updated Successfully."
                : "Categorie Saved Successfully."
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare} />{" "}
            {this.state.id ? "Update Categorie" : "Add New Categorie"}
          </Card.Header>
          <Form
            onReset={this.resetCategorie}
            onSubmit={this.state.id ? this.updateCategorie : this.submitCategorie}
            id="CategorieFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="name"
                    value={name}
                    onChange={this.CategorieChange}
                    className={"bg-dark text-white"}
                    placeholder="Enter Categorie Name"
                  />
                </Form.Group>
              </Form.Row>
            </Card.Body>
            <Card.Footer style={{ textAlign: "right" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                {this.state.id ? "Update" : "Save"}
              </Button>{" "}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.CategorieList()}
              >
                <FontAwesomeIcon icon={faList} /> Categorie List
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    CategorieObject: state.Categorie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategorie: (Categorie) => dispatch(saveCategorie(Categorie)),
    fetchCategorie: (CategorieId) => dispatch(fetchCategorie(CategorieId)),
    updateCategorie: (Categorie) => dispatch(updateCategorie(Categorie)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorie);
