import { ActionType } from "../type/productType"

export const setProducts = (products) => {
    return {
        type: ActionType.SET_PRODUCT,
        payload: products
    }
}

export const selectedProduct = (product) => {
    return {
        type: ActionType.SELECTED_PRODUCT,
        payload: product
    }
}

export const removeSelectedProduct = () => {
    return {
        type: ActionType.REMOVE_SELECTED_PRODUCT,
    }
}

export const searchProduct = (prodect) => {
    return {
        type: ActionType.SEARCH_PRODUCT,
        payload: prodect
    }
}

export const questionProduct = (question) => {
    return {
        type: ActionType.QUESTION_PRODUCT,
        payload: question
    }
} 

export const loginSuccess = () => {
    return {
        type: ActionType.LOGIN_SUCCESS,
    }
}

export const loginFail = () => {
    return {
        type: ActionType.LOGIN_FAIL,
    }
}

export const vendorSuccess = () => {
    return {
        type: ActionType.VENDOR_SUCCESS,
    }
}

export const vendorFail = () => {
    return {
        type: ActionType.VENDOR_FAIL,
    }
}