//in this file we will have actionCreators for burger Builder.

//actionCreators are small functions that are created to execute some funciton on basis of action types.

import axios from 'axios';
import * as actionTypes from './actionTypes';


export const addIngredient = (name) =>{
    return {
        type: actionTypes.ADD_INGRDIENT,
        ingredientName: name,
    }
}


export const removeIngredient = (name) =>{
    return {
        type: actionTypes.REMOVE_INGREDEINT,
        ingredientName: name,
    }
}


export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredients) => {
    console.log(ingredients);
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burgerbuilder-68afc-default-rtdb.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(
                error => {
                    dispatch(fetchIngredientsFailed());
                }
            );
    }
}



