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
import Pagination from '../Utils/Pagination/Pagination'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
    
const ATTRIBUTE_OBJECT = {
  data: [
    {
      key: 'dom_content_loaded',
      name: 'DOM加载完成',
      style: {width:'100px'}
    },
    {
      key: 'atf',
      name: '首屏时间',
      style: {width:'100px'}
    },
    {
      key: 'window_loaded',
      name: 'window加载完成',
      style: {width:'100px'}
    },
    {
      key: 'referer',
      name: 'Referer',
      style: {}
    },
    {
      key: 'updated_at',
      name: '更新时间',
      style: {width:'140px'}
    },
    {
      key: 'user_agent',
      name: 'UserAgent',
      style: {}
    },
  ]
}

class Loadtime extends Component {


    render() {
        let { loadtime, actions } = this.props,
            { ajax_load_data_loadtime } = actions,
            { data }= loadtime
        
        return (
            <K_Table 
              ATTRIBUTE_OBJECT = {ATTRIBUTE_OBJECT}
              entity = {loadtime} 
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
            action_loadtime
         ),
        dispatch)
    }
}

export default Loadtime = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loadtime)




