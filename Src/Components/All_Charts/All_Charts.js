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
    
    render() {
        let { error, actions, all_charts, filter_attribute } = this.props,
            { network_chart, loadtime_chart, error_chart } = all_charts,
            { ajax_load_data_error } = actions,
            { data }= error,
            onEvents = {
              'click': this.ahaha
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
                          onEvents={onEvents}
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
                          onEvents={onEvents}
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




