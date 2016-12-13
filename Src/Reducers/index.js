/**
 * Created by maizhikun on 16/6/26.
 */
import { combineReducers } from 'redux'
import { demo } from './demo'
import { network } from './network'



exports.index = combineReducers({
    demo,
    network
})