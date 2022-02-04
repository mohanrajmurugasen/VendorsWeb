import { combineReducers } from "redux";
import { loginReducer, productReducer, questionReducer, searchReducer, selectedProductReducer, vendorLoginReducer } from "./productReducer";

export const reducer = combineReducers({
    allProduct: productReducer,
    products: selectedProductReducer,
    search: searchReducer,
    question: questionReducer,
    login: loginReducer,
    vendor: vendorLoginReducer,
})  