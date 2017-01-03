import React , { Component } from 'react'
import { render } from 'react-dom'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

    
class K_Table extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
          showCheckboxes: false
      }
    }

    render() {
        let { data, attributes, names } = this.props,
        
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
                        names.map((name, index) => 
                            <TableHeaderColumn>name</TableHeaderColumn>
                          )
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={this.state.showCheckboxes}
                    >
                    {
                        data.map(data_one =>
                            <TableRow key={data_one.id}>
                                {
                                  attributes.map(attribute => 
                                    <TableRowColumn>{data_one[attribute]}</TableRowColumn>
                                  )
                                }
                                <TableRowColumn>{data_one.id}</TableRowColumn>
                                <TableRowColumn>{data_one.duration}</TableRowColumn>
                                <TableRowColumn>{data_one.url}</TableRowColumn>
                                <TableRowColumn title={data_one.referer}>{data_one.referer}</TableRowColumn>
                            </TableRow>
                        )
                    }
                    </TableBody>
                  </Table>
                </div>
          </div>
        )
    }
}




