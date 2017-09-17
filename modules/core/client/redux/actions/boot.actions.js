/**
 * Created by Dimitri Aguera on 13/09/2017.
 */

import { registerUser } from 'users/client/redux/actions'

export const BOOT_REQUEST = 'BOOT_REQUEST'
export const BOOT_FAILURE = 'BOOT_FAILURE'
export const BOOT_SUCCESS = 'BOOT_SUCCESS'


export function requestBOOT () {
    return {
        type: BOOT_REQUEST,
    }
}

export function setFailureBOOT ( error ) {
    return {
        type: BOOT_FAILURE,
        error
    }
}

export function successBOOT () {
    return {
        type: BOOT_SUCCESS,
    }
}

export function failureBOOT ( error ) {
    return dispatch => {
        dispatch(setFailureBOOT(error));
        throw new Error(error);
    }
}

/**
 * If booting with user's token is success,
 * This function set store to authenticated.
 *
 * @param token
 * @returns {function(*=)}
 */
export function proceedBOOT ( token ) {
    return data => {
        return dispatch => {
            const user = data.msg;
            // Put token on user object.
            user.token = token;
            // Register user on store.
            dispatch(registerUser(user));
            // Set bootStore to success.
            dispatch(successBOOT());
        }
    }
}
