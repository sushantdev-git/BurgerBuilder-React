import * as actionTypes from '../actions/actionTypes';



const Ingredient_Price = {
    salad: 0.5,
    bacon: 0.9,
    cheese: 0.6,
    meat: 1.2,
}

const initialState = {
    ingredients: null,
    totalPrice :4,
    ingredientCount: 0,
    error: false,
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.ADD_INGRDIENT:
            return {
                //copying state like this in necessary because using spread operator only copy the outer object 
                //inner object remain same, so we have also have to spead the inner object.
                //we always try to update with copying the state, if we directy use state and update it, it will lead to some issue
                //so this is be best way to update state. (always copy objet before updating the state.)
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName]+1,
                },
                totalPrice : state.totalPrice + Ingredient_Price[action.ingredientName],
                ingredientCount : state.ingredientCount+1
            }
        case actionTypes.REMOVE_INGREDEINT:
            if(state.ingredients[action.ingredientName] <= 0){
                return;
            }
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] :state.ingredients[action.ingredientName]-1,
                },
                totalPrice : state.totalPrice - Ingredient_Price[action.ingredientName],
                ingredientCount : state.ingredientCount-1
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                error: false,
            }
        
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            }

        default:
            return state;
    }
}

export default reducer;