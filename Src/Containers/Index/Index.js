import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import action_index from '../../Actions/index'

import Components_Index from '../../Components/Index/Index'


class Index extends Component {
    
    render() {

        let { actions, demo } = this.props
        
        return ( 
            <Components_Index demo={demo} />
            
        )
    }
}

function mapStateToProps(state) {
    return state
    //return {
    //    state
        //tasks: state.tasks,
        //state: state
    //}
}

function mapDispatchToProps(dispatch) {

    return {
        actions: bindActionCreators(
        Object.assign(
            {},
            action_index
         ),
        dispatch)
    }
}

export default Index = connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)




