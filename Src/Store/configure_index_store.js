/**
 * Created by maizhikun on 16/6/26.
 */
import { createStore , applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { index } from '../Reducers/index'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


exports.configure_index_store = function(initial_state) {
    return createStore(index,initial_state,composeEnhancers((
    applyMiddleware(thunk)
  )))
}
