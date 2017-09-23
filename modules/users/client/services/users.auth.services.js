/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import store from 'core/client/redux/store'
import _ from 'lodash'

/**
 * Return true if store is authenticated state,
 * False if no.
 *
 * @returns {boolean}
 */
export function isAuthenticated() {
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
export function allowDisplayItem ( user, roles ) {

    if ( !user )
        return false;

    if ( !roles )
        return true;

    return hasRole(user, roles);
}


/**
 * Return true if user if user exist, and if user's role match.
 *
 * @param user
 * @param roles
 * @returns {boolean}
 */
export function hasRole ( user, roles ) {
    return (!!user && !!_.intersection(user.roles, roles).length);
}
