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
    localStorage.removeItem('token'); //removing user token when user is logout
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}

export const AuthCheckTimeout = (expirationTime) => {

    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);
    }
}

export const sethAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
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
                    console.log(response);
                    const expirationDate = new Date(new Date().getTime() + response.data.expiresIn*1000); //storing expiration time of token
                    //new Date() create and datetime object with current date.
                    localStorage.setItem('token', response.data.idToken);
                    localStorage.setItem('expirationDate', expirationDate);
                    localStorage.setItem('userId', response.data.localId);
                    dispatch(authSuccess(response.data.idToken, response.data.localId))
                    dispatch(AuthCheckTimeout(response.data.expiresIn))
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


export const authCheckState = () => {
    //this is function is needed to check if user token is not expired then we should directly login the user.
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout());
        }
        else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate > new Date()){
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));
                dispatch(AuthCheckTimeout((expirationDate.getTime() - new Date().getTime())/1000)); //here we are passing in how much time the token should expire and we should log out the user.
            }
            else{
                dispatch(logout());
            }
        }
    }
}