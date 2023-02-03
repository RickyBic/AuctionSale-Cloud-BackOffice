import React, { Component } from "react";

import { connect } from "react-redux";
import {
  saveCategorie,
  deleteCategorie,
} from "../../services/index";

import { Card, Table, ButtonGroup, InputGroup, FormControl, Form, Button, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import axios from "axios";

class Categorie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      show: false,
      message: "",
      type: "",
      categories: [],
      currentPage: 1,
      categoriesPerPage: 5,
      sortDir: "asc",
    };
  }

  componentDidMount() {
    this.findAllCategories(this.state.currentPage);
  }

  sortData = () => {
    setTimeout(() => {
      this.state.sortDir === "asc"
        ? this.setState({ sortDir: "desc" })
        : this.setState({ sortDir: "asc" });
      this.findAllCategories(this.state.currentPage);
    }, 500);
  };

  findAllCategories(currentPage) {
    currentPage -= 1;
    axios
      .get(
        "http://localhost:8080/categories?pageNumber=" +
          currentPage +
          "&pageSize=" +
          this.state.categoriesPerPage +
          "&sortBy=name&sortDir=" +
          this.state.sortDir
      )
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          categories: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
      })
      .catch((error) => {
        console.log(error);
        localStorage.removeItem("jwtToken");
        this.props.history.push("/");
      });
  }

  deleteCategorie = (categorieId) => {
    this.props.deleteCategorie(categorieId);
    setTimeout(() => {
      if (this.props.categorieObject != null) {
        this.setState({ show: true, message: "Catégorie supprimée.", type: "danger", method: "post" });
        setTimeout(() => this.setState({ show: false }), 4000);
      } else {
        this.setState({ show: false });
      }
    }, 400);
  };

  changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if (this.state.search) {
      this.searchData(targetPage);
    } else {
      this.findAllCategories(targetPage);
    }
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
      if (this.state.search) {
        this.searchData(firstPage);
      } else {
        this.findAllCategories(firstPage);
      }
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      if (this.state.search) {
        this.searchData(this.state.currentPage - prevPage);
      } else {
        this.findAllCategories(this.state.currentPage - prevPage);
      }
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.categoriesPerPage
    );
    if (this.state.currentPage < condition) {
      if (this.state.search) {
        this.searchData(condition);
      } else {
        this.findAllCategories(condition);
      }
    }
  };

  nextPage = () => {
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.categoriesPerPage)
    ) {
      if (this.state.search) {
        this.searchData(this.state.currentPage + 1);
      } else {
        this.findAllCategories(this.state.currentPage + 1);
      }
    }
  };

  refresh = () => {
    this.findAllCategories(this.state.currentPage);
  };

  submitCategorie = (event) => {
    event.preventDefault();

    const categorie = {
      name: this.state.name,
    };

    this.props.saveCategorie(categorie);
    setTimeout(() => {
      if (this.props.categorieObject.categorie != null) {
        this.setState({ show: true, message: "Catégorie sauvegardée.", type: "success", method: "post" });
        setTimeout(() => this.setState({ show: false }), 4000);
      } else {
        this.setState({ show: false });
      }
    }, 400);
    this.findAllCategories(this.state.currentPage);
  };

  categorieChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { name, categories, currentPage, totalPages } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={this.state.message}
            type={this.state.type}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <FontAwesomeIcon icon={faPlusSquare} />{" "}
          </Card.Header>
          <Form
            onSubmit={this.submitCategorie}
            id="CategorieFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                  <Form.Label>Donnez le nom de la catégorie ci-dessous :</Form.Label>
                  <Form.Control
                    required
                    autoComplete="off"
                    type="test"
                    name="name"
                    value={name}
                    onChange={this.categorieChange}
                    className={"bg-dark text-white"}
                  />
                </Form.Group>
              </Form.Row>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />{" "}
                Ajouter
              </Button>{" "}
              <Button
                size="sm"
                variant="info"
                type="button"
                onClick={() => this.refresh()}
                >
              <FontAwesomeIcon icon={faUndo} /> Rafraîchir
              </Button>
            </Card.Body>
          </Form>
          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th onClick={this.sortData}>
                    Liste des catégories{" "}
                    <div
                      className={
                        this.state.sortDir === "asc"
                          ? "arrow arrow-up"
                          : "arrow arrow-down"
                      }
                    >
                      {" "}
                    </div>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr align="center">
                    <td colSpan="7">Aucunes catégories.</td>
                  </tr>
                ) : (
                  categories.map((categorie) => (
                    <tr key={categorie.id}>
                      <td>{categorie.name}</td>
                      <td>
                        <ButtonGroup>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => this.deleteCategorie(categorie.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
          {categories.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" }}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div style={{ float: "right" }}>
                <InputGroup size="sm">
                  <InputGroup.Prepend>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                      <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>
                  </InputGroup.Prepend>
                  <FormControl
                    className={"page-num bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  <InputGroup.Append>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    categorieObject: state.categorie,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveCategorie: (categorie) => dispatch(saveCategorie(categorie)),
    deleteCategorie: (categorieId) => dispatch(deleteCategorie(categorieId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categorie);
