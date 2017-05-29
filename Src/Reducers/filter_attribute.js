const initial_state = {
    data: {
        /*loadtime: {

        }*/
    }
}

export default function(state = initial_state, action = null){
    switch(action.type) {
        case 'SET_ENTITY_FILTER_ATTRIBUTE':
            let new_data = state.data
                new_data[ action.entity_id ] = action.data
            return Object.assign({}, state, {
                data: new_data
            })
        
        default :
            return state
    }
}