import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const burgerPurcaseSuccess = (id, orderData) => {
    return {
        type: actionTypes.BUGER_PURCHASE_SUCCESS,
        orderId : id,
        orderData: orderData,
    }
}

export const burgerPurchaseFailed = (error) => {
    return{
        type: actionTypes.BURGER_PURCHASE_FAILED,
        error: error
    }
}

export const burgerPurchaseStart = () => {
    return {
        type: actionTypes.BURGER_PURCHASE_FAILED
    }
}

export const burgerPurchase = (orderData) => {
    return dispatch => {
        dispatch(burgerPurchaseStart())
        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(burgerPurcaseSuccess(response.data, orderData));
            })
            .catch(error => {
                dispatch (burgerPurchaseFailed(error))
            });
    }
}