const initial_state = {
    is_fetching: false,
    data: [],
    total: 0,
    current_page: 1,
    first_query_at: -1,
}

let data_reducer = ( state = initial_state, action = null, data_name = '' ) => {
    let type = action.type.replace( '_' + data_name.toUpperCase(), '')

    switch (type) {
        case 'LOAD_DATA':
            return Object.assign( {}, state, {data: action.data})
        
        case 'SET_TOTAL':
            return Object.assign( {}, state, {total: action.total})

        case 'SET_CURRENT_PAGE': 
            return Object.assign( {}, state, {current_page: action.current_page} )

        case 'IS_FETCHING':
            return Object.assign( {}, state, {is_fetching: true})

        case 'NOT_FETCHING':
            return Object.assign( {}, state, {is_fetching: false})

        default :
            return state
    }
}

export default data_reducer 