/**
 * Created by Dimitri Aguera on 12/09/2017.
 */
import { CALL_API } from 'core/client/redux/middlewares/call.api'
import { failureAPI } from 'core/client/redux/actions/api.actions'

class ApiService {

    request( endpoint, options ) {

        const { method = 'GET', body, types, token } = options;

        return {
            [CALL_API]: {
                endpoint: endpoint,
                types: types,
                method: method,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token,
                },
                body: body,
            }
        }
    }
}

export default new ApiService()