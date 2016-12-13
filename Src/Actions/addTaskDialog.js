import Utils from '../Global/JS/Utils' 
import actionsTask from './tasks'
import $ from 'jquery'
import actionAddBTDialog from './addBTDialog'
import actionsMessageDialog from './messageDialog'

exports.is_submit_add_task_dialog = function(){
    return {
        type: 'IS_SUBMIT_ADD_TASK_DIALOG'
    }
}

exports.not_submit_add_task_dialog = function(){
    return {
        type: 'NOT_SUBMIT_ADD_TASK_DIALOG'
    }
}

exports.change_check_all_add_task_dialog = function(){
    return {
        type: 'CHANGE_CHECK_ALL_ADD_TASK_DIALOG'
    }
}


exports.change_check_add_task_dialog = function(index){
    return {
        type: 'CHANGE_CHECK_ADD_TASK_DIALOG',
        index
    }
}


exports.reset_add_task_dialog = function() {
    return {
        type: 'RESET_ADD_TASK_DIALOG'
    }
}

exports.display_add_task_dialog = function() {
    return {
        type: 'DISPLAY_ADD_TASK_DIALOG'
    }
}

exports.set_error_text_add_task_dialog = function(error_text) {
    return {
        type: 'SET_ERROR_TEXT_ADD_TASK_DIALOG',
        error_text
    }
}

exports.add_data_add_task_dialog = function(task) {
    return {
        type: 'ADD_DATA_ADD_TASK_DIALOG',
        task
    }
}

exports.checkURL = function(event) {
    let textareaValue = event.target.value.trim(),
        checkURLResult = Utils.checkUrl(textareaValue),
        linkArr = textareaValue.split('\n'),
        isMagnet = 'magnet:' === textareaValue.slice(0, 7)
    
    if (textareaValue === '') return exports.set_error_text_add_task_dialog('')
    if (linkArr.length >= 2) return exports.set_error_text_add_task_dialog('暂不支持批量添加任务！') //多个链接
    if (checkURLResult.result === false) return exports.set_error_text_add_task_dialog(checkURLResult.error_text) //链接不合法时
    if ( isMagnet ) {
        let info_hash = textareaValue.split('btih:')[1].split('?')[0]

        if (!info_hash) return exports.set_error_text_add_task_dialog('您输入的链接不合法，请重新输入！')

         //event.target.value = ''
        return exports.parseBTByhash(info_hash)

    }else {
        
        return getTaskInfroByUrl(textareaValue)
    }

    return {
        type: 'DISPLAY_ADD_TASK_DIALOG'
    }
}

let getTaskInfroByUrl = function(link,callback){
    return (dispatch,getState) => {
        let state = getState(),
            encodeLink = encodeURIComponent(link)
        var url =  'http://service.open.lixian.vip.xunlei.com/task/url_info?from=lx_web&user_id=' + state.user.user_id + '&url=' + encodeLink + '&session_id=' + state.user.session_id +'&t=' + new Date().getTime() 
        $.ajax({
            type: 'get',
            async: true,
            url: url,
            timeout: 8000,
            dataType: 'jsonp',
            success: function(rs) {
                if (rs.result == 0 ) {
                    dispatch(exports.add_data_add_task_dialog(rs.task))
                }else {
                    dispatch(exports.set_error_text_add_task_dialog('获取文件失败'))
                }
                //callback && callback(rs,dispatch) 
                //return 
            },
            complete: function(XMLHttpRequest, status) {　　　
                if (status == 'timeout') { //超时,status还有success,error等值的情况　　
                    dispatch(exports.set_error_text_add_task_dialog('获取文件超时'))　　　　　　　
                    //callback && callback({
                    //    result: -1
                   // }) 
                    //return 
                }
                if (status == 'error') {
                    dispatch(exports.set_error_text_add_task_dialog('获取文件失败'))　　
                    //callback && callback({
                    //    result: -2
                   // }) 
                   // return 
                }　　
            }
        }) 
    } 
}

exports.parseBTByhash = function(info_hash){
    return (dispatch,getState) => {
        let state = getState(),
            params = {
                task: {
                    info_hash
                }
            }
          $.ajax({
            type: 'post',
            async: true,
            data: JSON.stringify(params),
            url: 'http://service.open.lixian.vip.xunlei.com/task/bt_parse?from=lx_web&user_id='+ state.user.user_id  + '&session_id=' + state.user.session_id,
            timeout: 8000,
            success: function(rs) {
                if (0 === rs.result) { 
                    dispatch(exports.reset_add_task_dialog())
                    dispatch(actionsMessageDialog.set_message_dialog({
                        dispatch: true,
                        text: '添加文件成功',
                        type: 'ok'
                    }))
                    dispatch(actionAddBTDialog.load_data_add_bt_dialog(rs.file_infos,rs.title,rs.info_hash))
                    //dispatch(actionsTask.first_add_task(rs.task))
                }else {
                    dispatch(exports.set_error_text_add_task_dialog('解析磁力链失败'))
                }
                
            },
            complete: function(XMLHttpRequest, status) {　　　
                　　　　　　
                if (status == 'timeout') { //超时,status还有success,error等值的情况　　
                    dispatch(exports.set_error_text_add_task_dialog('解析磁力链超时'))　　　　　　　
                    //config.callback && config.callback({
                   //     result: -1
                   // });
                    //return;
                }
                if (status == 'error') {　　　
                    dispatch(exports.set_error_text_add_task_dialog('解析磁力链失败'))　　　　　　
                    //config.callback && config.callback({
                    //    result: -2
                    //});
                    //return;
                }　　
            }
        })
    }

}

exports.submitComTask = function() {
    return (dispatch,getState) => {
        let state = getState(),
            data = state.addTaskDialog.data,
            is_submit = state.addTaskDialog.is_submit,
            params 
        if (data.length === 0 || is_submit) {
            return {}
        }else {
            params = {
                task: {
                    url: data[0].url,
                    task_name: data[0].task_name,
                    gcid: data[0].gcid,
                    cid: data[0].cid,
                    refer_url:  data[0].refer_url
                }
                
            }
        }
        dispatch(exports.is_submit_add_task_dialog())
        $.ajax({
            type: 'post',
            async: true,
            data: JSON.stringify(params),
            url:'http://service.open.lixian.vip.xunlei.com/task/commit?from=lx_web&user_id=' + state.user.user_id  + '&session_id=' + state.user.session_id,
            timeout: 8000,
            success: function(rs) {
                if (0 === rs.result) { 
                    dispatch(exports.reset_add_task_dialog())
                    dispatch(actionsMessageDialog.set_message_dialog({
                        display: true,
                        text: '添加文件成功',
                        type: 'ok'
                    }))
                    dispatch(actionsTask.first_add_task(rs.task))
                }else {
                    dispatch(exports.set_error_text_add_task_dialog('提交普通任务失败'))
                }
                dispatch(exports.not_submit_add_task_dialog())
                
            },
            complete: function(XMLHttpRequest, status) {　　　
                　　　
                if (status == 'timeout') { //超时,status还有success,error等值的情况　　
                    dispatch(exports.set_error_text_add_task_dialog('提交普通任务超时'))　　　　
                    dispatch(exports.not_submit_add_task_dialog())　　　　　
                    //config.callback && config.callback({
                   //     result: -1
                   // });
                    //return;
                }
                if (status == 'error') {　　　
                    dispatch(exports.set_error_text_add_task_dialog('提交普通任务失败'))　
                    dispatch(exports.not_submit_add_task_dialog())　　　　　　　
                    //config.callback && config.callback({
                    //    result: -2
                    //});
                    //return;
                }　　
            }
        })
    }
}
