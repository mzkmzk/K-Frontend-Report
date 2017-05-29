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

import action_loadtime from '../../Actions/loadtime'
import action_filter_attribute from '../../Actions/filter_attribute'

import Pagination from '../Utils/Pagination/Pagination'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
import { LOADTIME } from '../../Constant/Attribute_Constant'    


class Loadtime extends Component {


    render() {
        let { loadtime, actions, filter_attribute } = this.props,
            { ajax_load_data_loadtime } = actions,
            { data }= loadtime
        
        return (
            <K_Table 
              ENTITY = {LOADTIME}
              entity = {loadtime}
              actions = {actions}
              filter_attribute = { filter_attribute.data[ LOADTIME.key ]  } 
              ajax_load_data = {ajax_load_data_loadtime}
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
            action_loadtime,
            action_filter_attribute
         ),
        dispatch)
    }
}

export default Loadtime = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loadtime)




