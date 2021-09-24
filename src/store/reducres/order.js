import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false,
            }

        case actionTypes.BUGER_PURCHASE_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat({
                    id: action.orderId,
                    ...action.orderData,
                }),
                loading:false,
                purchased: true,
            }

        case actionTypes.BURGER_PURCHASE_FAILED:
            return {
                ...state,
                loading:false,
            }

        case actionTypes.BURGER_PURCHASE_START:
            return {
                ...state,
                loading:true,
            }
        
        case actionTypes.ORDER_FETCH_INIT:
            return {
                ...state,
                loading: true,
            }
        case actionTypes.ORDER_FETCH_FAILED:
            return {
                ...state,
                loading:false,
            }
        case actionTypes.ORDER_FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                orders : action.orders,
            }
        default:
            return state;
    }
}

export default reducer;