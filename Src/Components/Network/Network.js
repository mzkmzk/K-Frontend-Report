import React, { Component, PropTypes} from 'react'
import ReactDOM , { render } from 'react-dom'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

    
export default class Network extends Component {

    componentDidMount() {
        let { actions } = this.props

        actions.ajax_load_data()
    }

    render() {
        let { data }= this.props.network
        return (
           <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn>ID</TableHeaderColumn>
                <TableHeaderColumn>Duration</TableHeaderColumn>
                <TableHeaderColumn>URL</TableHeaderColumn>
                <TableHeaderColumn>Referer</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
            {
                data.map(data_one =>
                    <TableRow>
                        <TableRowColumn>{data_one.id}</TableRowColumn>
                        <TableRowColumn>{data_one.duration}</TableRowColumn>
                        <TableRowColumn>{data_one.url}</TableRowColumn>
                        <TableRowColumn>{data_one.referer}</TableRowColumn>
                    </TableRow>
                )
            }
            </TableBody>
          </Table>
        )
    }
}

