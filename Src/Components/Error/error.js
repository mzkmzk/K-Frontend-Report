import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_error from '../../Actions/error'
import Pagination from '../Utils/Pagination/Pagination'

    

class Error extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
          showCheckboxes: false
      }
    }

    componentDidMount() {
        let { actions } = this.props

        actions.ajax_load_data_error(1)
    }
    
    render() {
        let { error, actions } = this.props,
            { ajax_load_data_error } = actions,
            { data }= error
        
        return (
            <div>
             
                <div style={{marginLeft: '256px'}}>
                   <Table 
                      
                   >
                    <TableHeader 
                      displaySelectAll={this.state.showCheckboxes}
                      adjustForCheckbox={this.state.showCheckboxes}
                    >
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Message</TableHeaderColumn>
                        <TableHeaderColumn>Line</TableHeaderColumn>
                        <TableHeaderColumn>Column</TableHeaderColumn>
                        <TableHeaderColumn>Object</TableHeaderColumn>
                        <TableHeaderColumn>URL</TableHeaderColumn>
                        <TableHeaderColumn>Referer</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={this.state.showCheckboxes}
                    >
                    {
                        data.map(data_one =>
                            <TableRow key={data_one.id}>
                                <TableRowColumn>{data_one.id}</TableRowColumn>
                                <TableRowColumn title={data_one.message}>{data_one.message}</TableRowColumn>
                                <TableRowColumn>{data_one.line}</TableRowColumn>
                                <TableRowColumn>{data_one.column}</TableRowColumn>
                                <TableRowColumn>{data_one.object}</TableRowColumn>
                                <TableRowColumn title={data_one.url}>{data_one.url}</TableRowColumn>
                                <TableRowColumn title={data_one.referer}>{data_one.referer}</TableRowColumn>
                            </TableRow>
                        )
                    }
                    </TableBody>
                  </Table>
                  <Pagination entity={error} ajax_load_data={ajax_load_data_error} />
                  
                </div>
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
            action_error
         ),
        dispatch)
    }
}

export default Error = connect(
    mapStateToProps,
    mapDispatchToProps
)(Error)




