import k_ajax from 'k_ajax'
import CONSTANT from '../Constant/Constant'

let load_data = function(data){
    return {
        type: 'LOAD_DATA_NETWORK',
        data
    }
}

exports.ajax_load_data = function(){
    return (dispatch, get_state) => {
        let state = get_state(),
            params = {
                page: state.network.current_page
            }
        k_ajax.getJSON(CONSTANT.URL.NETWORK_QUERY,params,{
            success: function(result){
                let obj_result = JSON.parse(result)
                dispatch(load_data(obj_result.data))
            }
        })
    }
}

