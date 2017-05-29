//import k_ajax from 'k_ajax'
import Utils from './Utils.js'
import Attribute_Constant from '../../Constant/Attribute_Constant'

import Utils_Function from '../../Utils/Utils'
let load_data = function(data, type){
    return {
        type: 'LOAD_DATA_'+type.toUpperCase(),
        data
    }
}

let set_total = function(total, type){
    return {
        type: 'SET_TOTAL_'+type.toUpperCase(),
        total
    }
}

let set_current_page = function(current_page, type){
    return {
        type: 'SET_CURRENT_PAGE_'+type.toUpperCase(),
        current_page
    }
}

exports.ajax_load_data = function( url, type, handle_data, params){
    return (dispatch, get_state) => {
        let state = get_state()
        //console.log( Utils_Function.get_filter_attribute_params(type, get_state))
        params = Object.assign(
            Utils_Function.get_filter_attribute_params(type, get_state),
         params) 
        Utils.ajax(url, params, {
            success: function(result){
                let obj_result = JSON.parse(result)
                
                if( handle_data ) obj_result = handle_data(obj_result)

                dispatch( load_data( obj_result.data, type ) )

                dispatch( set_total( obj_result.total, type ) )

                dispatch( set_current_page( obj_result.current_page, type ) )
            }
        }, get_state)
    }
}

