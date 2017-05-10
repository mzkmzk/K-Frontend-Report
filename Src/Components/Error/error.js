import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import K_Table from '../Utils/K_Table/K_Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_error from '../../Actions/error'
import Pagination from '../Utils/Pagination/Pagination'

import  { ERROR }   from '../../Constant/Attribute_Constant'    

console.log(ERROR)

class Error extends Component {

    render() {
        let { error, actions } = this.props,
            { ajax_load_data_error } = actions,
            { data }= error
        
        return (
            <K_Table 
              ATTRIBUTE_OBJECT = {ERROR}
              entity = {error} 
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
            action_error
         ),
        dispatch)
    }
}

export default Error = connect(
    mapStateToProps,
    mapDispatchToProps
)(Error)




