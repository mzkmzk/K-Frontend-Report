import React , { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import $ from 'jquery'
import _ from 'underscore'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import Filter_Attribute from '../Filter_Attribute/Filter_Attribute'


import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_loadtime from '../../../Actions/loadtime'
import Pagination from '../../Utils/Pagination/Pagination'

import CONSTANT from '../../../Constant/Constant'
import Utils from '../../../Utils/Utils'
    


class K_Table extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
          showCheckboxes: false
      }
    }

    componentDidMount() {
        let {  ajax_load_data, entity } = this.props
        ajax_load_data(entity.current_page)
    }
    
    render() {
        let { entity, ajax_load_data, ENTITY, filter_attribute, actions } = this.props,
            { data } = entity
       
        return (
            <div>
             
                <div style={{marginLeft: '256px'}}>
                    <Filter_Attribute 
                      ENTITY= { ENTITY }
                      ajax_load_data= { ajax_load_data  }
                      actions = { actions }
                      filter_attribute = { filter_attribute  }
                   />
                   <Table 
                   >
                    <TableHeader 
                      displaySelectAll={this.state.showCheckboxes}
                      adjustForCheckbox={this.state.showCheckboxes}
                    >
                      <TableRow> {/* 行头*/}
                        {
                          ENTITY.data.map( element => 
                              <TableHeaderColumn key={`k_table_head_${element.key}`} style={ element.style } >{element.name}</TableHeaderColumn>
                          )
                        }
                      </TableRow>
                    </TableHeader>
                    <TableBody
                      displayRowCheckbox={this.state.showCheckboxes}
                    >
                    {  /* 主题内容 */
                        data.map(data_one => 
                            <TableRow key={data_one.id}>
                                {
                                  ENTITY.data.map( element => 
                                    <TableRowColumn  key={`k_table_content_${element.id}`} style={element.style} title={data_one[ element.key ]} >
                                     { 
                                        element.type === 'url' ?  <a target="_blank" href={data_one.url}>{data_one.url}</a> : data_one[ element.key ]
                                     } 
                                    </TableRowColumn>
                                  )
                                }
        
                            </TableRow>
                        )
                    }
                    </TableBody>
                  </Table>
                  <Pagination entity={entity} ajax_load_data={ajax_load_data.bind(this)} />
                  
                </div>
          </div>
        )
    }
}



export default K_Table




