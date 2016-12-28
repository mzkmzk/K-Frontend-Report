import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import action_network from '../../Actions/network'

import Components_Network from '../../Components/Table/Table'

import Utils from '../../Utils/Utils'

class App extends Component {
    
    render() {
        console.log('render')
        let { actions, network } = this.props
        return ( 

            <div>
                <Drawer open={true}>
                  <Link to="/table/loadtime?type=loadtime"><MenuItem>Loadtime</MenuItem></Link>
                  <Link to="/table/network?type=network"><MenuItem>Network</MenuItem></Link>
                  <Link to="/table/error?type=error"><MenuItem>Error</MenuItem></Link>
                </Drawer>
                <Components_Network ajax_url={'loadtime'} network={network} actions={actions}/>
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




