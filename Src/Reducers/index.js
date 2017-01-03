/**
 * Created by maizhikun on 16/6/26.
 */
import { combineReducers } from 'redux'
import { error } from './error'
import { network } from './network'
import { loadtime } from './loadtime'



exports.index = combineReducers({
    error,
    network,
    loadtime
})