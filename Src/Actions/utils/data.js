//import k_ajax from 'k_ajax'
import Utils from './Utils.js'

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

let handle_data = data => {
    
}

exports.ajax_load_data = function(page, url, type, handle_data, params){
    return (dispatch, get_state) => {
        let state = get_state()
        
        params = Object.assign({
            page
        }, params) 
        Utils.ajax(url, params, {
            success: function(result){
                let obj_result = JSON.parse(result)
                
                if( handle_data ) obj_result = handle_data(obj_result)

                dispatch( load_data( obj_result.data, type ) )

                dispatch( set_total( obj_result.total, type ) )

                dispatch( set_current_page( obj_result.current_page, type ) )
            }
        }, get_state)
        /*k_ajax.getJSON(url,params,{
            success: function(result){
                let obj_result = JSON.parse(result)
                
                if( handle_data ) obj_result = handle_data(obj_result)

                dispatch( load_data( obj_result.data, type ) )

                dispatch( set_total( obj_result.total, type ) )

                dispatch( set_current_page( obj_result.current_page, type ) )
            }
        })*/
    }
}

