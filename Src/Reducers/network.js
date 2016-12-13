const initial_state = {
    is_fetching: false,
    data: [],
    totals: 0,
    current_page: 1,
    first_query_at: -1,
}


exports.network = function(state = initial_state, action = null) {
    switch (action.type) {
        case 'LOAD_DATA_NETWORK':
            return Object.assign({},state,{data: action.data})
        case 'IS_FETCHING_NETWORK':
            return Object.assign({},state,{is_fetching: true})
        case 'NOT_FETCHING_NETWORK':
            return Object.assign({},state,{is_fetching:false})

        default :
            return state
    }

}
