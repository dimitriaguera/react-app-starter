/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import store from 'core/client/redux/store'
import { registerUser } from 'users/client/redux/actions'
import _ from 'lodash'

class AuthService {

    /**
     * Return true if store is authenticated state,
     * False if no.
     *
     * @returns {boolean}
     */
    isAuthenticated() {
        const Auth = store.getState().authenticationStore;
        return !!Auth.isAuthenticated;
    }

    /**
     * Helper for authorizations.,
     * according roles and user authentification.
     *
     * @param item
     * @param user
     * @param roles
     * @returns {*}
     */
    allowDisplayItem ( item, user, roles ) {
        if ( !user )
            return null;
        if ( !roles )
            return item();

        return this.hasRole(user, roles) ? item() : null;
    }


    /**
     * Return true if user if user exist, and if user's role match.
     *
     * @param user
     * @param roles
     * @returns {boolean}
     */
    hasRole ( user, roles ) {
        return (!!user && !!_.intersection(user.roles, roles).length);
    }


    /**
     * Return user's token from store.
     *
     * @returns {String}
     */
    getStoredToken() {
        const Auth = store.getState().authenticationStore;
        return Auth._user ? Auth._user.token : '';
    }
}

export default new AuthService()