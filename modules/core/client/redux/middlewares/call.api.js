/**
 * Created by Dimitri Aguera on 11/09/2017.
 */
import config from 'env/local-config'
import { requestAPI, successAPI, failureAPI } from '../actions/api.actions'

const BASE_URL = config.app.api_base_url;
const CALL_API = Symbol('Call API');

/**
 * Pipe to proceed api call.
 * Request server.
 * Call states actions along the way.
 *
 * @param callAPI
 * @returns {function(*)}
 */
function proceedCallApi( callAPI ) {

    return dispatch => {

        // Build actions types called during pipe.
        // Default, set API actions.
        // If success, the pipe call actions on this order :
        // REQUEST_TYPE => HOOK_TYPE (optional) => SUCCESS_TYPE
        const { types = {} } = callAPI;
        const { HOOK_TYPE, REQUEST_TYPE = requestAPI, FAILURE_TYPE = failureAPI, SUCCESS_TYPE = successAPI } = types;

        // Call request action.
        dispatch(REQUEST_TYPE());

        // Start server request.
        return makeCall( callAPI )

            // Server response testing.
            .then(rep => {
                if ( !rep.ok ) {
                    return Promise.reject(rep.statusText);
                }
                return rep.json();
            })

            // Data send by server testing.
            .then( data => {

                if ( !data.success ) {
                    return Promise.reject(data);
                }
                if ( HOOK_TYPE ) {
                    dispatch(HOOK_TYPE(data))
                }
                return data
            })

            // End pipe with success call.
            .then( data => {

                dispatch(SUCCESS_TYPE(data));
                return data;
            })

            // Catch any error during pipe process.
            .catch( err => {
                //const errMessage = err.message ? err.message : err.msg;
                dispatch(FAILURE_TYPE(err));
                return err;
            });
    }
}

/**
 * Forging API server request.
 *
 * @param callAPI
 * @returns {*}
 */
const makeCall = ( callAPI ) => {
    const { endpoint, body, method, headers } = callAPI;
    let config = {
            method: method,
            headers: headers,
            body: body,
            mode: 'cors',
            cache: 'default'
    };
    return fetch( BASE_URL + endpoint, config );
};

/**
 * Middleware that hook API actions,
 * Then call API calling pipe.
 *
 * @param store
 */
const callApiMiddleware = store => next => action => {

    // Get API symbol.
    const callAPI = action[CALL_API];

    // If no API symbol in action, exit API pipe.
    if ( typeof callAPI === 'undefined' ){
        return next(action);
    }

    // Start API pipe.
    return next( proceedCallApi( callAPI ) );
};

export { CALL_API }
export default callApiMiddleware