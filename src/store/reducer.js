import * as actionTypes from './actions';

initialState = {
    ingredients: null,
    totalPrice :4,
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGRDIENT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]+1,
                }
            }
        case actionTypes.REMOVE_INGREDEINT:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] > 0 ? state.ingredients[action.ingredientName]-1: 0,
                }
            }
        default:
            return state;
    }
}

export default reducer;