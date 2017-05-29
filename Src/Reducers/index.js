/**
 * Created by maizhikun on 16/6/26.
 */
import { combineReducers } from 'redux'
import { error } from './error'
import { network } from './network'
import { loadtime } from './loadtime'
import { site } from './site'
import { log } from './log'
import  user  from './user'
import all_charts from './all_charts'
import  filter_attribute  from './filter_attribute'

exports.index = combineReducers({
    error,
    network,
    loadtime,
    site,
    user,
    log,
    all_charts,
    filter_attribute
})