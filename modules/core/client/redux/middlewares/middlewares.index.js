/**
 * Created by Dimitri Aguera on 08/09/2017.
 */
import logger from './logger'
import callApiMiddleware from './call.api'

export const apiMiddleware = callApiMiddleware
export const middlewares = [logger]