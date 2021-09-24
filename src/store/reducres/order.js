import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading: false,
}

const reducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.BUGER_PURCHASE_SUCCESS:
            return {
                ...state,
                orders: state.orders.concat({
                    id: action.orderId,
                    ...action.orderData,
                }),
                loading:false,
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
        default:
            return state;
    }
}

export default reducer;