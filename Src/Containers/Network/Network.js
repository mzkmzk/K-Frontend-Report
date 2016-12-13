import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import action_network from '../../Actions/network'

import Components_Network from '../../Components/Network/Network'


class Network extends Component {
    
    render() {

        let { actions, network } = this.props
        
        return ( 
            <Components_Network network={network} actions={actions}/>
            
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

export default Network = connect(
    mapStateToProps,
    mapDispatchToProps
)(Network)




