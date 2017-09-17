/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import { combineReducers } from 'redux'
import apiStore from './api.store'
import bootStore from './boot.store'
import { authenticationStore, usersStore } from 'users/client/redux/reducers/authenticationStore'

const storeApp = combineReducers({
    authenticationStore,
    bootStore,
    apiStore,
    usersStore,
});

export default storeApp