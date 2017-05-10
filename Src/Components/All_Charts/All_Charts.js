import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReactEcharts from 'echarts-for-react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_all_charts from '../../Actions/all_charts'
import Pagination from '../Utils/Pagination/Pagination'

import { LOADTIME, ERROR, NETWORK } from '../../Constant/Attribute_Constant'    
import _ from 'underscore'
import $ from 'jquery'

import { network_option } from './network_chart'
import { loadtime_option } from './loadtime_chart'
import { error_option } from './error_chart'

class All_Charts extends Component {

    
    componentDidMount() {
        let { actions } = this.props
         
        actions.ajax_load_loadtime_chart()
        actions.ajax_load_network_chart()
        actions.ajax_load_error_chart()
    }



    filter(){
        let { actions } = this.props,
          params = {
            where: JSON.stringify(
               _.chain(LOADTIME.data)
                .map( element => {

                    return {
                      key: element.key,
                      condition: 'REGEXP',
                      value: $(`#k_loadtime_chart_filter_${element.key}`).val()
                    }
                })
                .filter(element => {
                  return element.value !== ''
                })
                .value()
            )
          }

      actions.ajax_load_loadtime_chart( params)
    }

    filter_network(){
        let { actions } = this.props,
          params = {
            where: JSON.stringify(
               _.chain(NETWORK.data)
                .map( element => {

                    return {
                      key: element.key,
                      condition: 'REGEXP',
                      value: $(`#k_network_chart_filter_${element.key}`).val()
                    }
                })
                .filter(element => {
                  return element.value !== ''
                })
                .value()
            )
          }

      actions.ajax_load_network_chart( params)
    }

    filter_error(){
        let { actions } = this.props,
          params = {
            where: JSON.stringify(
               _.chain(ERROR.data)
                .map( element => {

                    return {
                      key: element.key,
                      condition: 'REGEXP',
                      value: $(`#k_error_chart_filter_${element.key}`).val()
                    }
                })
                .filter(element => {
                  return element.value !== ''
                })
                .value()
            )
          }

      actions.ajax_load_error_chart( params)
    }
    
    render() {
        let { error, actions, all_charts } = this.props,
            { network_chart, loadtime_chart, error_chart } = all_charts,
            { ajax_load_data_error } = actions,
            { data }= error
        
        return (
            <div>
               <div style={{marginLeft: '256px'}}>
                 {
                    LOADTIME.data.map( element => 
                             
                                <TextField  key={`k_loadtime_chart_filter_${element.key}`}
                                  hintText={`过滤${element.name}`}
                                  id={`k_loadtime_chart_filter_${element.key}`}
                                />
                              
                          )
                 }
                  <RaisedButton onClick={this.filter.bind(this, 1)} label="过滤条件" primary={true} />
                 <ReactEcharts
                          option={loadtime_option( loadtime_chart )} 
                          style={{height: '350px', width: '100%'}} 
                          className='react_for_echarts' />
                 
                 {
                    NETWORK.data.map( element => 
                             
                                <TextField  key={`k_network_chart_filter_${element.key}`}
                                  hintText={`过滤${element.name}`}
                                  id={`k_network_chart_filter_${element.key}`}
                                />
                              
                          )
                 }
                  <RaisedButton onClick={this.filter_network.bind(this, 1)} label="过滤条件" primary={true} />
                 <ReactEcharts
                          option={ network_option(network_chart) } 
                          style={{height: '350px', width: '100%'}} 
                          className='react_for_echarts' />
                 {
                    ERROR.data.map( element => 
                             
                                <TextField  key={`k_error_chart_filter_${element.key}`}
                                  hintText={`过滤${element.name}`}
                                  id={`k_error_chart_filter_${element.key}`}
                                />
                              
                          )
                 }
                  <RaisedButton onClick={this.filter_error.bind(this, 1)} label="过滤条件" primary={true} />
                 <ReactEcharts
                          option={ error_option(error_chart) } 
                          style={{height: '350px', width: '100%'}} 
                          className='react_for_echarts' />
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
            action_all_charts
         ),
        dispatch)
    }
}

export default All_Charts = connect(
    mapStateToProps,
    mapDispatchToProps
)(All_Charts)




