import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_loadtime from '../../Actions/loadtime'
import Pagination from '../Utils/Pagination/Pagination'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
    
const style = {
  margin: 12
}

class Loadtime extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
          showCheckboxes: false
      }
    }

    componentDidMount() {
        let { actions } = this.props

        actions.ajax_load_data_loadtime(1)
    }
    
    render() {
        let { loadtime, actions } = this.props,
            { ajax_load_data_loadtime } = actions,
            { data }= loadtime
        
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
                        <TableHeaderColumn>DOM加载完成</TableHeaderColumn>
                        <TableHeaderColumn>首屏时间</TableHeaderColumn>
                        <TableHeaderColumn>window加载完成</TableHeaderColumn>
                        <TableHeaderColumn>Referer</TableHeaderColumn>
                        <TableHeaderColumn>更新时间</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={this.state.showCheckboxes}
                    >
                    {
                        data.map(data_one =>
                            <TableRow key={data_one.id}>
                                <TableRowColumn>{data_one.id}</TableRowColumn>
                                <TableRowColumn>{data_one.dom_content_loaded}</TableRowColumn>
                                <TableRowColumn>{data_one.atf}</TableRowColumn>
                                <TableRowColumn>{data_one.window_loaded}</TableRowColumn>
                                <TableRowColumn title={data_one.referer}>{data_one.referer}</TableRowColumn>
                                <TableRowColumn title={data_one.updated_at}>{data_one.updated_at}</TableRowColumn>
                            </TableRow>
                        )
                    }
                    </TableBody>
                  </Table>
                  <Pagination entity={loadtime} ajax_load_data={ajax_load_data_loadtime} />
                  
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
            action_loadtime
         ),
        dispatch)
    }
}

export default Loadtime = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loadtime)




