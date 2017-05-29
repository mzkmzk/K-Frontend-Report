import React , { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import $ from 'jquery'
import _ from 'underscore'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'


import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import K_Table from '../Utils/K_Table/K_Table'

import action_log from '../../Actions/log'
import action_filter_attribute from '../../Actions/filter_attribute'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
import { LOG } from '../../Constant/Attribute_Constant'    


class Log extends Component {


    render() {
        let { log, actions, filter_attribute } = this.props,
            { ajax_load_data_log } = actions,
            { data }= log
        
        return (
            <K_Table 
              ENTITY = {LOG}
              entity = {log}
              actions = {actions}
              filter_attribute = { filter_attribute.data[ LOG.key ]  } 
              ajax_load_data = {ajax_load_data_log}
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
            action_log,
            action_filter_attribute
         ),
        dispatch)
    }
}

export default Log = connect(
    mapStateToProps,
    mapDispatchToProps
)(Log)




