import { createStore } from "redux";
import saleReducer from "../reducer/reducer";

const store = createStore(saleReducer);
export default store;
