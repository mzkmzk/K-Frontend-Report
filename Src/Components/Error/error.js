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

const ATTRIBUTE_OBJECT = {
  data: [
    {
      key: 'message',
      name: 'Message',
      style: {width:'50px'}
    },
    {
      key: 'line',
      name: 'Line',
      style: {width:'50px'}
    },
    {
      key: 'column',
      name: 'Column',
      style:  {}
    },
    {
      key: 'object',
      name: 'Object',
      style: {}
    },
    {
      key: 'url',
      name: 'URL',
      style:  {}
    },
    {
      key: 'referer',
      name: 'Referer',
      style: {}
    },
    {
      key: 'updated_at',
      name: '更新时间',
      style: {width: '140px'}
    },
    {
      key: 'user_agent',
      name: 'UserAgent',
      style: {}
    }
  ]
}    

class Error extends Component {

    render() {
        let { error, actions } = this.props,
            { ajax_load_data_error } = actions,
            { data }= error
        
        return (
            <K_Table 
              ATTRIBUTE_OBJECT = {ATTRIBUTE_OBJECT}
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




