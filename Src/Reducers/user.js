const initial_state = {
    creator_user_id: '',
    sina_access_token: ''
}

export default function(state = initial_state, action = null){
    switch(action.type) {
        case 'SET_USER':
            return Object.assign({}, state, action.data)
        default :
            return state
    }
}