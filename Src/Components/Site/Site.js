import React , { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import K_Table from '../Utils/K_Table/K_Table'

import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'

import action_site from '../../Actions/site'
import Pagination from '../Utils/Pagination/Pagination'

import CONSTANT from '../../Constant/Constant'
import Utils from '../../Utils/Utils'

import action_utils from '../../Actions/utils/Utils'

import { SITE } from '../../Constant/Attribute_Constant' 
class Site extends Component {
    
     constructor(props) {
        super(props)
        this.state = {
          open: false,
          message: ''
        }
      }

    authentication_site(){
        
        let authentication_site = document.querySelector('#authentication_site_p').value,
            get_status = () => this.props
        
        if (authentication_site.trim() === '' )return
        action_utils.ajax(CONSTANT.URL.AUTHENTICATION_SITE, {
            url: encodeURIComponent( authentication_site )
        },{
            success: result => {
                result = JSON.parse(result)
                //console.log(result)
                if( result.result === true || result.result === 0){
                    this.setState({
                      open: true,
                      message: '认领成功'
                    })
                }else{
                    this.setState({
                      open: true,
                      message: result.message
                    })
                }
            },
            error: result => {
                this.setState({
                  open: true,
                  message: '认领失败'
                })
            }
        },get_status)
        
    }

    render() {
        let { site, actions, user } = this.props,
            { creator_user_id } = user,
            { ajax_load_data_site } = actions,
            { data }= site
        
        return (
            <div >
                <p style={{marginLeft: '256px'}}>tips: 在域名的k_report文件中添加且仅有内容: { creator_user_id * 2 } </p>
                <p style={{marginLeft: '256px'}}>tips: 暂时每个账号只能认领一个根域名</p>
                <TextField style={{marginLeft: '256px'}}
                  hintText="填写根域名 eg: 404mzk.com"
                  id="authentication_site_p"
                />
                <RaisedButton onClick={this.authentication_site.bind(this)} label="申请" primary={true}  />
                <Snackbar
                  open={this.state.open}
                 
                  message={this.state.message}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
                <K_Table 
                  ATTRIBUTE_OBJECT = { SITE }
                  entity = { site } 
                  ajax_load_data = {ajax_load_data_site}
                />
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
            action_site
         ),
        dispatch)
    }
}

export default Site = connect(
    mapStateToProps,
    mapDispatchToProps
)(Site)




