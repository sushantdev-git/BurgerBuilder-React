import * as actionTypes from './actionTypes';


export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}


export const authFailed = (error) => {
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const auth = () => {
    return dispatch => {
        dispatch(authInit());
    }
}