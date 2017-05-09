import React , { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import $ from 'jquery'
import _ from 'underscore'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'


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
        let {  ajax_load_data } = this.props

        ajax_load_data(1)
    }

    filter(page_index = 1){
      let {  ajax_load_data, ATTRIBUTE_OBJECT } = this.props,
          params = {
            where: JSON.stringify(
               _.chain(ATTRIBUTE_OBJECT.data)
                .map( element => {

                    return {
                      key: element.key,
                      condition: 'REGEXP',
                      value: $(`#k_table_filter_${element.key}`).val()
                    }
                })
                .filter(element => {
                  return element.value !== ''
                })
                .value()
            )
          }

      ajax_load_data(page_index, params)
    }


    
    render() {
        let { entity, ajax_load_data, ATTRIBUTE_OBJECT } = this.props,
            { data } = entity
       
        return (
            <div>
             
                <div style={{marginLeft: '256px'}}>
                   <RaisedButton onClick={this.filter.bind(this, 1)} label="过滤条件" primary={true} />
                   <Table 
                      
                   >
                    <TableHeader 
                      displaySelectAll={this.state.showCheckboxes}
                      adjustForCheckbox={this.state.showCheckboxes}
                    >
                      <TableRow> {/* 行头*/}
                        {
                          ATTRIBUTE_OBJECT.data.map( element => 
                              <TableHeaderColumn key={`k_table_head_${element.key}`} style={ element.style } >{element.name}</TableHeaderColumn>
                          )
                        }
                      </TableRow>
                      <TableRow>  {/* 过滤头*/}
                        {
                          ATTRIBUTE_OBJECT.data.map( element => 
                              <TableHeaderColumn  key={`k_table_filter_head_${element.key}`} style={ element.style } >
                                <TextField 
                                  hintText={`过滤${element.name}`}
                                  id={`k_table_filter_${element.key}`}
                                />
                              </TableHeaderColumn>
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
                                  ATTRIBUTE_OBJECT.data.map( element => 
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
                  <Pagination entity={entity} ajax_load_data={this.filter.bind(this)} />
                  
                </div>
          </div>
        )
    }
}



export default K_Table




