const initial_state = {
    name: 'k-report'
}


exports.demo = function(state = initial_state, action = null) {
    switch (action.type) {
        case 'SET_NAME':
            return Object.assign({},state,{name: action.name})
        default :
            return state
    }

}
