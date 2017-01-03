import React , { Component } from 'react'
import { render } from 'react-dom'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

const style = {
  margin: 12
}

class Pagination extends Component {

    render() {
        let { entity, ajax_load_data } = this.props
        
        return (
              <div>
                <RaisedButton onClick={() => ajax_load_data(entity.current_page - 1)} label="Prev" primary={true} style={style} />
                <TextField hintText="What page?" />
                <RaisedButton label="Go" secondary={true} style={style} />
                <RaisedButton onClick={() => ajax_load_data(entity.current_page + 1)} label="Next" primary={true} style={style} />
                <p>当前第{entity.current_page}页</p>
                <p>共{entity.total}条记录</p>
              </div>
        )
    }
}

export default Pagination





