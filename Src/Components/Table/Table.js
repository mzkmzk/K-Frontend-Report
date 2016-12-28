import React, { Component, PropTypes} from 'react'
import ReactDOM , { render } from 'react-dom'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'
    
const type_to_url = {
    'loadtime': CONSTANT.URL.LOADTIME_QUERY,
    'network': CONSTANT.URL.NETWORK_QUERY,
    'error': CONSTANT.URL.ERROR_QUERY,
}

export default class Network extends Component {

    constructor(props) {
      super(props)
      
      this.get_ajax_url.bind(this)
      this.state = {
          type: 'loadtime',
          showCheckboxes: false
      }
    }

    get_type(){
        let url_params = Utils.get_url_params(),
            type = url_params.type || 'loadtime'
        return type
    }

    get_ajax_url(){
        return type_to_url[ this.get_type() ]
    }

    componentDidMount() {
        let { actions } = this.props

        actions.ajax_load_data(1,this.get_ajax_url())
    }
    
    componentWillReceiveProps( nextProps ) {
      let { actions } = this.props
            
        if (nextProps.params.type !== this.props.params.type) {
            this.state.type = type
            actions.ajax_load_data(1,this.get_ajax_url())
        }
    }

    componentDidUpdate (prevProps) {
    // 上面步骤3，通过参数更新数据
      /*let { actions,ajax_url } = this.props
      let oldId = prevProps.params.type
      let newId = this.props.params.type
      if (newId !== oldId)
        actions.ajax_load_data(1,ajax_url)*/
    }

    render() {
        let { network, actions, ajax_url } = this.props,
            { ajax_load_data } = actions,
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
                                <TableRowColumn>{data_one.url}</TableRowColumn>
                                <TableRowColumn title={data_one.referer}>{data_one.referer}</TableRowColumn>
                            </TableRow>
                        )
                    }
                    </TableBody>
                  </Table>
                  <div>
                    <RaisedButton onClick={() => ajax_load_data(network.current_page - 1, ajax_url)} label="Prev" primary={true} style={style} />
                    <TextField hintText="What page?" />
                    <RaisedButton label="Go" secondary={true} style={style} />
                    <RaisedButton onClick={() => ajax_load_data(network.current_page + 1, ajax_url)} label="Next" primary={true} style={style} />
                    <p>当前第{network.current_page}页</p>
                    <p>共{network.total}条记录</p>
                  </div>
                  
                </div>
          </div>
        )
    }
}

const style = {
  margin: 12
}

