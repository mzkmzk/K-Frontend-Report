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
    


class Filter_Attribute extends Component {

    constructor(props) {
      super(props)
      
      this.state = {
          showCheckboxes: false
      }
    }

    filter(page_index = 1){
      let {  ajax_load_data, ENTITY, actions } = this.props,
          filter_data = _.chain(ENTITY.data)
                            .map( element => {

                                return {
                                  key: element.key,
                                  condition: 'REGEXP',
                                  value: $(`#${ENTITY.key}_${element.key}`).val()
                                }
                            })
                            .filter(element => {
                              return element.value !== ''
                            })
                            .value()
      actions.set_entity_filter_attribute(ENTITY.key, Utils.array_to_object('key', filter_data) )
      ajax_load_data( { 
        where: JSON.stringify( filter_data ),
        page: page_index
      })
    }


    
    render() { //需要实体的属性, 实体的id, 数据中心对应的模型filter_attribute
        let { ENTITY , action_ajax , filter_attribute} = this.props,
            { key } = ENTITY
       
        return (
            <div>
             
                {
                    ENTITY.data.map( element => 
                                <TextField  key={`k_${key}_${element.key}`}
                                  hintText={`过滤${element.name}`}
                                  id={`${key}_${element.key}`}
                                  defaultValue={ filter_attribute && filter_attribute[element.key] && filter_attribute[element.key].value }
                                />
                              
                          )
                 }
                  <RaisedButton onClick={this.filter.bind(this, 1)} label="过滤条件" primary={true} />
          </div>
        )
    }
}



export default Filter_Attribute




