import CONSTANT from '../Constant/Constant'
import Attribute_Constant from '../Constant/Attribute_Constant'

import _ from 'underscore'
import Utils from './utils/Utils.js'

import Utils_Function from '../Utils/Utils'
let load_loadtime_chart = loadtime_chart => {
    return {
        type: 'LOAD_LOADTIME_CHART',
        loadtime_chart
    }
}

let handle_loadtime_data = obj_result => { 
    return {
        x_axis_data:  _.pluck(obj_result,'date'),
        dom_load_data: _.map(_.pluck(obj_result,'dom_load'), Math.floor),
        atf_data: _.map(_.pluck(obj_result,'atf'), Math.floor),
        window_loaded_data: _.map(_.pluck(obj_result,'window_loaded'), Math.floor)
    }
}

exports.ajax_load_loadtime_chart = (params = {}) => {
    return (dispatch, get_state) => {
        let params = Utils_Function.get_filter_attribute_params(Attribute_Constant.LOADTIME.key, get_state)
        Utils.ajax(CONSTANT.URL.LOAD_LOADTIME_CHART,params,{
            success: result => {
                let obj_result = handle_loadtime_data(JSON.parse(result))
                
                dispatch( load_loadtime_chart( obj_result ) )

            }
        },get_state)
    }
    //return ajax_load_data(page, CONSTANT.URL.LOAD_LOADTIME_CHART, NAME, handle_data)
}

let load_network_chart = network_chart => {
    return {
        type: 'LOAD_NETWORK_CHART',
        network_chart
    }
}

let handle_network_data = obj_result => {
    return {
        x_axis_data: _.pluck(obj_result, 'URL'),
        series_data: _.chain(obj_result)
                      .pluck('AVG( DURATION )')
                      .map(element => {
                        return parseInt(element)
                      })
                      .value()
        //series_data: _.pluck(obj_result, 'AVG( DURATION )')
    }
}

exports.ajax_load_network_chart = () => { 
    return (dispatch, get_state) => {
        let params = Utils_Function.get_filter_attribute_params(Attribute_Constant.NETWORK.key, get_state)
        Utils.ajax(CONSTANT.URL.LOAD_NETWORK_CHART, params, {
            success: result => {
                let obj_result = handle_network_data(JSON.parse(result))
                
                dispatch( load_network_chart( obj_result ) )
            }
        },get_state)
    }
}

let load_error_chart = error_chart => {
    return {
        type: 'LOAD_ERROR_CHART',
        error_chart
    }
}

let handle_error_data = obj_result => {
    return {
        x_axis_data: _.pluck(obj_result, 'Column'),
        series_data: _.pluck(obj_result, 'COUNT( * )')
        //series_data: _.pluck(obj_result, 'AVG( DURATION )')
    }
}

exports.ajax_load_error_chart = (params = {}) => {
    return (dispatch, get_state) => {
        let params = Utils_Function.get_filter_attribute_params(Attribute_Constant.ERROR.key, get_state)
        Utils.ajax(CONSTANT.URL.LOAD_ERROR_CHART, params, {
            success: result => {
                let obj_result = handle_error_data(JSON.parse(result))
                
                dispatch( load_error_chart( obj_result ) )
            }
        },get_state)
    }
}