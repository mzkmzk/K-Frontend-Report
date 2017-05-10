import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import K_Table from '../Utils/K_Table/K_Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_network from '../../Actions/network'
import Pagination from '../Utils/Pagination/Pagination'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
    
import { NETWORK } from '../../Constant/Attribute_Constant' 
class Network extends Component {

    
    render() {
        let { network, actions } = this.props,
            { ajax_load_data_network } = actions,
            { data }= network
        
        return (
            <K_Table 
              ATTRIBUTE_OBJECT = { NETWORK }
              entity = {network} 
              ajax_load_data = {ajax_load_data_network}
            />
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




