import * as CT from "./categorieTypes";
import axios from "axios";

export const saveCategorie = (categorie) => {
  return (dispatch) => {
    dispatch({
      type: CT.SAVE_CATEGORIE_REQUEST,
    });
    axios
      .post("https://auctionsale-cloud-webservice-production.up.railway.app/categories", categorie)
      .then((response) => {
        dispatch(categorieSuccess(response.data));
      })
      .catch((error) => {
        dispatch(categorieFailure(error));
      });
  };
};

export const deleteCategorie = (categorieId) => {
  return (dispatch) => {
    dispatch({
      type: CT.DELETE_CATEGORIE_REQUEST,
    });
    axios
      .delete("https://auctionsale-cloud-webservice-production.up.railway.app/categories/" + categorieId)
      .then((response) => {
        dispatch(categorieSuccess(response.data));
      })
      .catch((error) => {
        dispatch(categorieFailure(error));
      });
  };
};

const categorieSuccess = (categorie) => {
  return {
    type: CT.CATEGORIE_SUCCESS,
    payload: categorie,
  };
};

const categorieFailure = (error) => {
  return {
    type: CT.CATEGORIE_FAILURE,
    payload: error,
  };
};
