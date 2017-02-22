import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_network from '../../Actions/network'
import Pagination from '../Utils/Pagination/Pagination'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
    
const style = {
  margin: 12
}

class Network extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
          showCheckboxes: false
      }
    }

    componentDidMount() {
        let { actions } = this.props

        actions.ajax_load_data_network(1)
    }
    
    render() {
        let { network, actions } = this.props,
            { ajax_load_data_network } = actions,
            { data }= network
        
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
                        <TableHeaderColumn>Duration</TableHeaderColumn>
                        <TableHeaderColumn>URL</TableHeaderColumn>
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
                                <TableRowColumn>{data_one.duration}</TableRowColumn>
                                <TableRowColumn title={data_one.url}>{data_one.url}</TableRowColumn>
                                <TableRowColumn title={data_one.referer}>{data_one.referer}</TableRowColumn>
                                <TableRowColumn title={data_one.updated_at}>{data_one.updated_at}</TableRowColumn>

                            </TableRow>
                        )
                    }
                    </TableBody>
                  </Table>
                  <Pagination entity={network} ajax_load_data={ajax_load_data_network} />
                  
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
            action_network
         ),
        dispatch)
    }
}

export default Network = connect(
    mapStateToProps,
    mapDispatchToProps
)(Network)




