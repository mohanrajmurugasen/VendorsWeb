import { ActionType } from "../type/productType";

const initialState = {
    product: []
}

export const productReducer = (state = initialState,{type,payload}) => {
    switch (type) {
        case ActionType.SET_PRODUCT:
            return {...state,product: payload}
        default:
            return state;
    }
}

export const selectedProductReducer = (state = {},{type,payload}) => {
    switch (type) {
        case ActionType.SELECTED_PRODUCT:
            return {...state,...payload}
        case ActionType.REMOVE_SELECTED_PRODUCT:
            return {}
        default:
            return state;
    }
}

export const searchReducer = (state = {},{type,payload}) => {
    switch (type) {
        case ActionType.SEARCH_PRODUCT:
            return {...state,...payload}
        default:
            return state;
    }
}

const initialValue = {
    question: []
}

export const questionReducer = (state = initialValue,{type,payload}) => {
    switch (type) {
        case ActionType.SEARCH_PRODUCT:
            return {...state,question: payload}
        default:
            return state;
    }
} 

const auth = {
    result: false
}

export const loginReducer = (state = auth,action) => {
    switch (action.type) {
        case ActionType.LOGIN_SUCCESS:
            return {...state,result:true}
        case ActionType.LOGIN_FAIL:
            return {...state,result:false}
        default:
            return state;
    }
}

const vendorAuth = {
    results: false
}

export const vendorLoginReducer = (state = vendorAuth,action) => {
    switch (action.type) {
        case ActionType.VENDOR_SUCCESS:
            return {...state,results:true}
        case ActionType.VENDOR_FAIL:
            return {...state,results:false}
        default:
            return state;
    }
}