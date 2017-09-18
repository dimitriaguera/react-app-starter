/**
 * Created by Dimitri Aguera on 12/09/2017.
 */
import config from 'env/local-config'
import { CALL_API } from 'core/client/redux/middlewares/api'
import { failureAPI } from 'core/client/redux/actions/api.actions'
import { getLocalToken } from 'users/client/services/users.storage.services'

const BASE_URL = config.app.api_base_url;

function forgeResquest( method, endpoint, data = {} ) {

    let url = BASE_URL + endpoint;

    return () => {

        const params = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
        };

        if ( method === 'GET' ) {
            try {
                // const urlParams = data || {};
                // url = new URL(url);
                // Object.keys(urlParams).forEach(key => url.searchParams.append(key, urlParams[key]))
                data = null;
            }
            catch (e) {
                console.log(`Unable to put params on GET ${url} api request : ${e.message}`);
            }
        }
        else if ( data === Object(data) ) {
            params.body = JSON.stringify(data);
        }
        else {
            throw new Error(`Invalid XHR request. See ${method} at ${url}`);
        }

        const token = getLocalToken();
        if (token) {
            params.headers.authorization = token;
        }

        return fetch(url, params);
    }
}

class ApiService {

    request( endpoint, options = {} ) {

        const { method, body, types } = options;

        return {
            [CALL_API]: {
                endpoint: endpoint,
                types: types,
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": getLocalToken(),
                },
                body: body,
            }
        }
    }
}

export const get = ( endpoint, options = {} ) => {
    const { data, types } = options;
    return {
        [CALL_API]: {
            send: forgeResquest( 'GET', endpoint, data ),
            types: types,
        }
    }
};

export const post = ( endpoint, options = {} ) => {
    const { data, types } = options;
    return {
        [CALL_API]: {
            send: forgeResquest( 'POST', endpoint, data ),
            types: types,
        }
    }
};

export const put = ( endpoint, options = {} ) => {
    const { data, types } = options;
    return {
        [CALL_API]: {
            send: forgeResquest( 'PUT', endpoint, data ),
            types: types,
        }
    }
};

export const del = ( endpoint, options = {} ) => {
    const { data, types } = options;
    return {
        [CALL_API]: {
            send: forgeResquest( 'DELETE', endpoint, data ),
            types: types,
        }
    }
};

export default new ApiService()