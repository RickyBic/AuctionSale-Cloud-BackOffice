import { combineReducers } from "redux";
import userReducer from "./user/userReducer";
import authReducer from "./user/auth/authReducer";
import categorieReducer from "./categorie/categorieReducer";

const rootReducer = combineReducers({
  user: userReducer,
  categorie: categorieReducer,
  auth: authReducer,
});

export default rootReducer;
