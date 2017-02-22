const initial_state = {
    is_fetching: false,
    loadtime_chart: {
        x_axis_data: [], /*['周一','周二','周三','周四','周五','周六','周日']*/
        dom_load_data: [],
        atf_data: [],
        window_loaded_data: []
    }
}

export default function(state = initial_state, action = null){
    switch(action.type) {
        case 'LOAD_LOADTIME_CHART':
            return Object.assign({},state,{loadtime_chart: action.loadtime_chart })
        default :
            return state
    }
}