/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import thunk from 'redux-thunk'
import logger from './logger'
import api from './api'

// Export middlewares array for Redux.
const middlewares = [api, thunk, logger];

export default middlewares