import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import action_network from '../../Actions/network'


import Utils from '../../Utils/Utils'

class App extends Component {
    
    render() {
        let { actions, network, children, params } = this.props,
            type = params

        return ( 
            <div>
                <Drawer open={true}>
                  <Link to="/loadtime"><MenuItem>Loadtime</MenuItem></Link>
                  <Link to="/network"><MenuItem>Network</MenuItem></Link>
                  <Link to="/error"><MenuItem>Error</MenuItem></Link>
                </Drawer>
                {children}
                
            </div>
 
        )
    }
}

function mapStateToProps(state) {
    return state
}

function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(
        Object.assign(
            {},
            action_network
         ),
        dispatch)
    }
}

export default App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)




