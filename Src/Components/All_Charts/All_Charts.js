import React , { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReactEcharts from 'echarts-for-react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_all_charts from '../../Actions/all_charts'
import action_filter_attribute from '../../Actions/filter_attribute'

import Filter_Attribute from '../Utils/Filter_Attribute/Filter_Attribute'


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

    go_filter(entity_key, filter_attribute_name, echart_data){

      let { filter_attribute, actions, router } = this.props,
          filter_attribute_data = filter_attribute.data,
          filter_attribute_entity = filter_attribute_data[ entity_key ] || {}
          filter_attribute_entity[ filter_attribute_name ] = {
            key: filter_attribute_name,
            condition: 'REGEXP',
            value: echart_data.name
          }

      actions.set_entity_filter_attribute(entity_key, filter_attribute_entity)
      setTimeout(() => { //加定时 不然 echat会有个报错 虽然不影响使用
        router.push('/' + entity_key.toLowerCase())
      }, 0)
      
      
    }
    
    render() {
        let { error, actions, all_charts, filter_attribute } = this.props,
            { network_chart, loadtime_chart, error_chart } = all_charts,
            { ajax_load_data_error } = actions,
            { data }= error,
            on_network_events = {
              click: this.go_filter.bind(this, NETWORK.key, 'url')
            },
            on_error_events = {
              click: this.go_filter.bind(this, ERROR.key, 'column')
            }
        
        return (
            <div>
               <div style={{marginLeft: '256px'}}>
                  <Filter_Attribute 
                    ENTITY= { LOADTIME }
                    ajax_load_data= { actions.ajax_load_loadtime_chart  }
                    actions = { actions }
                    filter_attribute = { filter_attribute.data[ LOADTIME.key ]  }
                 />
                 <ReactEcharts
                          
                          option={loadtime_option( loadtime_chart )} 
                          style={{height: '350px', width: '100%'}} 
                          className='react_for_echarts' />
                 
                 <Filter_Attribute 
                    ENTITY= { NETWORK }
                    ajax_load_data= { actions.ajax_load_network_chart  }
                    actions = { actions }
                    filter_attribute = { filter_attribute.data[ NETWORK.key ]  }
                 />
                  
                 <ReactEcharts
                          onEvents={on_network_events}
                          option={ network_option(network_chart) } 
                          style={{height: '350px', width: '100%'}} 
                          className='react_for_echarts' />

                  <Filter_Attribute 
                    ENTITY= { ERROR }
                    ajax_load_data= { actions.ajax_load_error_chart  }
                    actions = { actions }
                    filter_attribute = { filter_attribute.data[ ERROR.key ]  }
                 />
                 <ReactEcharts
                          onEvents={on_error_events}
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
            action_all_charts,
            action_filter_attribute
         ),
        dispatch)
    }
}

export default All_Charts = connect(
    mapStateToProps,
    mapDispatchToProps
)(All_Charts)




