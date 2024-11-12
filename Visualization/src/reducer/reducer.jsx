import { salesData } from "../assets/data";
const storage = localStorage.getItem("auth");

const initialState = storage
  ? JSON.parse(storage)
  : {
      salesData: salesData,
      filterSales: [],
      token: "",
    };

console.log(initialState);

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_SALES":
      return { ...state, filterSales: action.payload };

    case "SIGNIN":
      const updatedState = { ...state, token: action.payload };
      localStorage.setItem("auth", JSON.stringify(updatedState));
      return updatedState;

    case "SIGNOUT":
      const resetState = {
        ...initialState,
        token: "",
      };
      localStorage.setItem("auth", JSON.stringify(resetState));
      return resetState;

    default:
      return state;
  }
};
export default saleReducer;
