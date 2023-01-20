import * as CT from "./categorieTypes";

const initialState = {
  categorie: "",
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CT.SAVE_CATEGORIE_REQUEST:
    case CT.FETCH_CATEGORIE_REQUEST:
    case CT.UPDATE_CATEGORIE_REQUEST:
    case CT.DELETE_CATEGORIE_REQUEST:
      return {
        ...state,
      };
    case CT.CATEGORIE_SUCCESS:
      return {
        categorie: action.payload,
        error: "",
      };
    case CT.CATEGORIE_FAILURE:
      return {
        categorie: "",
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
