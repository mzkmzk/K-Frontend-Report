import CONSTANT from '../Constant/Constant'
import _ from 'underscore'

let load_loadtime_chart = function(loadtime_chart){
    return {
        type: 'LOAD_LOADTIME_CHART',
        loadtime_chart
    }
}

let handle_data = obj_result => {
     
    return {
        x_axis_data:  _.pluck(obj_result,'date'),
        dom_load_data: _.map(_.pluck(obj_result,'dom_load'), Math.floor),
        atf_data: _.map(_.pluck(obj_result,'atf'), Math.floor),
        window_loaded_data: _.map(_.pluck(obj_result,'window_loaded'), Math.floor)
    }
}

exports.ajax_load_loadtime_chart = () => {
    return (dispatch, get_state) => {
        k_ajax.getJSON(CONSTANT.URL.LOAD_LOADTIME_CHART,{},{
            success: function(result){
                let obj_result = handle_data(JSON.parse(result))
                
                dispatch( load_loadtime_chart( obj_result ) )

            }
        })
    }
    //return ajax_load_data(page, CONSTANT.URL.LOAD_LOADTIME_CHART, NAME, handle_data)
}