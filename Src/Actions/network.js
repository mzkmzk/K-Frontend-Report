import k_ajax from 'k_ajax'
import CONSTANT from '../Constant/Constant'

let load_data = function(data){
    return {
        type: 'LOAD_DATA_NETWORK',
        data
    }
}

let set_total = function(total){
    return {
        type: 'SET_TOTAL_NETWORK',
        total
    }
}

let set_current_page = function(current_page){
    return {
        type: 'SET_CURRENT_PAGE_NETWORK',
        current_page
    }
}

exports.ajax_load_data = function(current_page,url){
    return (dispatch, get_state) => {
        let state = get_state(),
            params = {
                page: current_page
                //page: state.network.current_page
            }
        k_ajax.getJSON(url,params,{
            success: function(result){
                let obj_result = JSON.parse(result)

                dispatch( load_data( obj_result.data ) )

                dispatch( set_total( obj_result.total ) )

                dispatch( set_current_page( obj_result.current_page ) )
            }
        })
    }
}

