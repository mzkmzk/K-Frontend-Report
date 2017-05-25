import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Router, Route, IndexRoute, Link, IndexLink, browserHistory } from 'react-router'


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import action_user from '../../Actions/user'

import Utils from '../../Utils/Utils'

class App extends Component {
    
    componentWillMount(){
        let { actions } = this.props,
            params = Utils.get_url_params(),
            creator_user_id = params.id,
            { sina_access_token } = params
        
        if ( creator_user_id != null ){
            localStorage.setItem('creator_user_id', creator_user_id)
            localStorage.setItem('sina_access_token', sina_access_token)
        }else if(localStorage.getItem('creator_user_id') == null){
            window.location.href = 'http://journey.404mzk.com/login.html?jump_url=' +  encodeURIComponent(Utils.get_curent_host() ) 
        }
        //console.log(actions.set_user)
        actions.set_user({
            creator_user_id: localStorage.getItem('creator_user_id'),
            sina_access_token: localStorage.getItem('sina_access_token')
        })
    }

    componentDidMount(){

    }

    signout(){
        localStorage.removeItem('creator_user_id')
        localStorage.removeItem('sina_access_token')
        window.location.href = 'http://journey.404mzk.com/login.html?jump_url=' +  encodeURIComponent(Utils.get_curent_host() ) 
    }

    render() {
        let { actions, network, children, params } = this.props,
            type = params

        return ( 
            <div>
                <Drawer open={true}>
                  <Link to="all_charts"><MenuItem>All_Charts</MenuItem></Link>
                  <Link to="loadtime"><MenuItem>Loadtime</MenuItem></Link>
                  <Link to="network"><MenuItem>Network</MenuItem></Link>
                  <Link to="error"><MenuItem>Error</MenuItem></Link>
                  <Link to="site"><MenuItem>Site</MenuItem></Link>
                  <Link onClick={this.signout}><MenuItem>Sign out</MenuItem></Link>
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
            action_user
         ),
        dispatch)
    }
}

export default App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)




