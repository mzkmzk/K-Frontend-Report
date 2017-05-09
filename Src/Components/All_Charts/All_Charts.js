import React , { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ReactEcharts from 'echarts-for-react'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import action_all_charts from '../../Actions/all_charts'
import Pagination from '../Utils/Pagination/Pagination'

    

class All_Charts extends Component {

    constructor(props) {
      super(props)
      
      this.getOtion.bind(this)
    }
    
    componentDidMount() {
        let { actions } = this.props
         
        actions.ajax_load_loadtime_chart()
    }

    getOtion() {
        let { loadtime_chart } = this.props.all_charts 
        const option = {
            title: {
                text: 'Loadtime'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:  ['DOM加载完成','首屏时间','window加载完成']
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : loadtime_chart.x_axis_data /*[['周一','周二','周三','周四','周五','周六','周日']*/
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'DOM加载完成',
                    //boundaryGap : false,
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},
                    data: loadtime_chart.dom_load_data/*[120, 132, 101, 134, 90, 230, 210]*/
                },
                {
                    name:'首屏时间',
                    //boundaryGap : false,
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},
                    data: loadtime_chart.atf_data/*[220, 182, 191, 234, 290, 330, 310]*/
                },
                {
                    name:'window加载完成',
                    //boundaryGap : false,
                    type:'line',
                    //stack: '总量',
                    //areaStyle: {normal: {}},
                    data: loadtime_chart.window_loaded_data/*[150, 232, 201, 154, 190, 330, 410]*/
                }
            ]
        }
        return option
    }
    
    render() {
        let { error, actions } = this.props,
            { ajax_load_data_error } = actions,
            { data }= error
        
        return (
            <div>
               <div style={{marginLeft: '256px'}}>
                 <ReactEcharts
                          option={this.getOtion()} 
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




