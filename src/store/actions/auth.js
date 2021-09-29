import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authInit = () => {
    return {
        type: actionTypes.AUTH_INIT
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId,
    }
}


export const authFailed = (error) => {
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const AuthCheckTimeout = (expirationTime) => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime* 1000);
    }
}


export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authInit());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpNxk804rMrMerEW4NXwx7Ug9KSoK4niM';

        if(!isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpNxk804rMrMerEW4NXwx7Ug9KSoK4niM'
        }

        console.log(url);
        axios.post(url, authData)
            .then(
                response => {
                    console.log(response)
                    dispatch(authSuccess(response.data.idToken, response.data.localId))
                    dispatch(AuthCheckTimeout())
                }
            )
            .catch(
                error => {
                    console.log(error);
                    dispatch(authFailed(error.response.data.error))
                }
            )
    }
}