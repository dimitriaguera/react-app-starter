/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import thunk from 'redux-thunk'
import config from 'env/config'
import logger from './logger'
import api from './api'

// Development middlewares.
const devTools = ( config.getEnv() === 'production' ) ? [] : [logger];

// Export middlewares array for Redux.
const middlewares = [api, thunk, ...devTools];

export default middlewares