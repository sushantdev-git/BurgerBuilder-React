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
        type: actionTypes.BURGER_PURCHASE_START
    }
}

export const burgerPurchase = (orderData, token) => {
    return dispatch => {
        dispatch(burgerPurchaseStart())
        axios.post('/orders.json?auth='+token, orderData)
            .then(response => {
                dispatch(burgerPurcaseSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch (burgerPurchaseFailed(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.ORDER_FETCH_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = () => {
    return {
        type: actionTypes.ORDER_FETCH_FAILED,
    }
}

export const fetchOrderInit = () => {
    return {
        type: actionTypes.ORDER_FETCH_INIT
    }
}

export const fetchOrders = (token) => {
    return dispatch => {
        dispatch(fetchOrderInit())
        axios.get('/orders.json?auth='+token) //token is required if we want to get data access from firebase if we have chaged the rules of read and write to null if user is not authenticated.
            .then((res) => {
                let orders = []
                
                for(let key in res.data){
                    console.log(res[key]);
                    orders.push({
                        id: key,
                        ...res.data[key],
                    })
                }

                dispatch(fetchOrderSuccess(orders))
            })
            .catch((err) => {
                dispatch(fetchOrderFailed());
            });
    }
}