import React, { Component, PropTypes} from 'react'
import ReactDOM , { render } from 'react-dom'

import Utils from '../../Global/JS/Utils'
import _ from 'underscore'
import $ from 'jquery'

export default class AddTaskDialog extends Component {

    componentDidMount() {

        let { user, actions } = this.props

        let fileOnChange = function(){
            $('.j-open-bt').off('change').on('change', function(event) {
                var val = $(this).val()
                //alert('change文件改变了')
                if (val) {
                    var url = 'http://service.open.lixian.vip.xunlei.com/task/torrent_upload?from=lx_web&user_id=' + user.user_id + '&session_id='+user.session_id+'&callback=document.domain="xunlei.com";window.top.btupload&form=1&t=' + new Date().getTime()
                    var iframe = $('<iframe name="submit_iframe" id="submit_iframe" style="display:none"><head></head><html></html></iframe>')
                    $('body').append(iframe)

                    $('#bt_form').attr({
                        action: url
                    }).submit()
                    

                    //提交后清空原来的 防止提重复文件没反应
                    //emptyFileInput: function($elem) {
                    var file = $('.j-open-bt')[0]
                    // for IE, Opera, Safari, Chrome
                    if (file.outerHTML) {
                        file.outerHTML = file.outerHTML
                    } else { // FF(包括3.5)
                        file.value = ''
                    }
                    fileOnChange()
                    //}
                }
            })
        }
        fileOnChange()

        window.btupload = function(data) {
            if (0 === data.result) {
                actions.parseBTByhash(data.info_hash)
                
            }else{
                 actions.set_message_dialog({
                        display: true,
                        text: '解析BT文件失败',
                        type: 'error'
                })
            }
            
        }
           
        
    }

    componentWillUnmount() {
        $('#bt_form').off('change')
    }

    confirmation() {
        let {  submitComTask } = this.props.actions,
            //{ is_submit } = this.props , 不能再这里做 还是会重复
            textarea = ReactDOM.findDOMNode(this.refs.task_dialog_textarea)
        
        //if (!is_submit) {    
            submitComTask()
           // textarea.value = ''
        //}
        //alert(2)
    }

    closeDialog(){
        let { reset_add_task_dialog } = this.props.actions,
        //let {  hide_common_dialog } = this.props.actions,
            textarea = ReactDOM.findDOMNode(this.refs.task_dialog_textarea)
        //hide_common_dialog()
        reset_add_task_dialog()
        //textarea.value = ''
       // let {  }
    }

    render(){
        //let type = ''
        let { display, is_fetch, data , is_submit, error_text,all_checked } = this.props.addTaskDialog,
            { checkURL, change_check_add_task_dialog, change_check_all_add_task_dialog, reset_add_task_dialog, submitComTask } = this.props.actions,
            component_display = display !== true ? {display: 'none'} : {},
            checkedSize = _.filter(data,(data_one)=>{
                if (data_one.checked === true) return true
            }).length
            


        return (
            <div>
                <div className="cover" style={component_display}></div>
                <div className="pop_wp" style={component_display} >
                    <div className="pop_h">
                        <h3>新建任务</h3>
                    </div>
                    <div className="pop_b">
                        <div className="pop_task">
                            <textarea id="task_dialog_textarea" ref="task_dialog_textarea" onInput={checkURL}  className="area_p_url" placeholder="请添加下载链接，暂不支持批量添加"></textarea>
                            <p className="task_warn" style={error_text == '' ? {display: 'none'} : {} }><i className="ico_p_warn"></i>{error_text}</p>
                        </div>
                        <div className="task_list" style={data.length == 0 ? {display: 'none'} : {}  }>
                            <div className="task_option">
                                <span className="cho">
                                    <a onClick={ change_check_all_add_task_dialog } href="javascript:;" className={'chk_file '+ (all_checked ? 'checked':'')} ></a>
                                    已选择
                                    <span>{checkedSize}</span>
                                    个文件
                                </span>
                                <span className="type">类型</span>
                                <span className="size">大小</span>
                            </div>
                            <div className="list_con">
                                <p className="txt_l" style={!is_fetch ? {display: 'none'} : {} }><img alt="加载中" src="img\/loading.gif"/>列表加载中，请稍候</p>
                                <div className="list_con_main">
                                    <ul>
                                        {
                                            data.map((data_one,index) => 
                                                <li key={index} onClick={change_check_add_task_dialog.bind(this,index)} >
                                                    <a  href="javascript:;" className={'chk_file '+ (data_one.checked ? 'checked':'') }></a>
                                                    <span className="name">{data_one.task_name}</span>
                                                    <span className="type">{Utils.getTaskFormat(data_one.task_name)}</span>
                                                    <span className="size">{Utils.bytesToSize(data_one.filesize)}</span>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pop_f">
                        <div className="pop_btn_r">
                             <a href="javascript:;" clickid="new_create_open_btfile" stat-info="category=file_new_create|eventid=new_create_open_btfile">
                                <form id="bt_form" action="" encType="multipart/form-data" target="submit_iframe" method="POST">
                                    <label htmlFor="bt-ipt" className="link_ft" title="打开BT种子文件">打开BT种子文件</label>
                                    <input type="file" id="bt-ipt" name="filepath" className="j-open-bt" style={{height: 0,width: 0}}>
                                    </input>
                                </form>
                            </a>
                            <a  onClick={ this.confirmation.bind(this) } href="javascript:;" title="立即添加" className={'btn_p_nor nor_1 ' + (checkedSize == 0 || is_submit ? 'nor_dis' : '')}>{is_submit ? '提交中' : '立即添加'}</a>
                        </div>
                    </div>
                    <a onClick={ this.closeDialog.bind(this) } href="javascript:;" title="关闭" className="close">关闭</a>
                </div>
            </div>
        )
    }
}

