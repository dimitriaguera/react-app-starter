/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import ApiService from 'core/client/services/core.api.services'
import { DEFAULT_AUTH_ROLE } from 'users/commons/roles'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export const FETCH_USERS = 'FETCH_USERS'

export const requestLogin = () => {
    return {
        type: LOGIN_REQUEST,
    }
};

export const registerUser = user => {
    return {
        type: LOGIN_SUCCESS,
        user: user
    }
};

export const loginError = msg => {
    return {
        type: LOGIN_FAILURE,
        msg: msg
    }
};

export const registerRequest = () => {
    return {
        type: REGISTER_REQUEST,
    }
};

export const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESS,
    }
};

export const registerError = msg => {
    return {
        type: REGISTER_FAILURE,
        msg: msg
    }
};

export const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST,
    }
};

export const logoutOk = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
};

export const setUsers = ( data ) => {
    return {
        type: FETCH_USERS,
        users: data.msg,
    }
};

/**
 * Thunk that set store to no-authenticated,
 * And remove token on sessionStorage
 * @returns {function(*)}
 */
export function logoutUser(){

    return dispatch => {
        dispatch(requestLogout());
        sessionStorage.removeItem('token');
        dispatch(logoutOk());
    }
}

export function registerNewUser( creds ) {
    return dispatch => {

        const body = JSON.stringify({
            username:creds.username,
            password:creds.password,
            roles:[DEFAULT_AUTH_ROLE]
        });

        // Request login on server.
        return dispatch(ApiService.request('register', {
            method: 'POST',
            body: body,
            types: {
                REQUEST_TYPE: registerRequest,
                FAILURE_TYPE: registerError,
                SUCCESS_TYPE: (data) => {
                    return dispatch => {
                        const user = data.msg;
                        // If success, put token in sessionStorage
                        sessionStorage.setItem('token', user.token);

                        // And set store to authenticated.
                        dispatch(registerSuccess(user));
                    }
                }
            }
        }))
    }
}

/**
 * Thunk for login pipe.
 *
 * @param creds
 * @returns {function(*)}
 */
export function loginUser( creds ) {

    return dispatch => {

        const body = JSON.stringify({
            username:creds.username,
            password:creds.password,
        });

        // Request login on server.
        return dispatch(ApiService.request('login', {
            method: 'POST',
            body: body,
            types: {
                REQUEST_TYPE: requestLogin,
                FAILURE_TYPE: loginError,
                SUCCESS_TYPE: (data) => {
                    return dispatch => {
                        const user = data.msg;
                        // If success, put token in sessionStorage
                        sessionStorage.setItem('token', user.token);

                        // And set store to authenticated.
                        dispatch(registerUser(user));
                    }
                }
            }
        }))
    }
}
