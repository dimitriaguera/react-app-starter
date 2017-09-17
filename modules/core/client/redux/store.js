/**
 * Created by Dimitri Aguera on 12/09/2017.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import storeApp from './reducers/reducers.index.js'
import  { apiMiddleware, middlewares } from './middlewares/middlewares.index.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(storeApp, /* preloadedState, */ composeEnhancers(
    applyMiddleware(apiMiddleware, thunk, ...middlewares)
));

export default store;