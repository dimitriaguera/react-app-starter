/**
 * Created by Dimitri Aguera on 12/09/2017.
 */
import { createStore, applyMiddleware, compose } from 'redux'
import storeApp from './reducers/reducers.index.js'
import middlewares from './middlewares/middlewares.index.js'
import config from 'env/config'


console.log(config.getEnv());
const composeEnhancers = ( config.getEnv() === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ) ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(storeApp, /* preloadedState, */ composeEnhancers(
    applyMiddleware(...middlewares)
));

export default store;