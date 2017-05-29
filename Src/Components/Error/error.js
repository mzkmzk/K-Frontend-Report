import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import K_Table from '../Utils/K_Table/K_Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_error from '../../Actions/error'
import action_filter_attribute from '../../Actions/filter_attribute'

import Pagination from '../Utils/Pagination/Pagination'

import  { ERROR }   from '../../Constant/Attribute_Constant'    


class Error extends Component {

    render() {
        let { error, actions, filter_attribute } = this.props,
            { ajax_load_data_error } = actions,
            { data }= error
        
        return (
            <K_Table 

              ENTITY = {ERROR}
              entity = {error}
              actions = {actions}
              filter_attribute = { filter_attribute.data[ ERROR.key ]  } 
              ajax_load_data = {ajax_load_data_error}
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
            action_error,
            action_filter_attribute
         ),
        dispatch)
    }
}

export default Error = connect(
    mapStateToProps,
    mapDispatchToProps
)(Error)




