import k_ajax  from 'k_ajax'
import action_commonDialog from './commonDialog'
import action_multipleFiles from './multipleFiles'
import Utils from '../Global/JS/Utils'
import _ from 'underscore'
import $ from 'jquery'
import actionsMessageDialog from './messageDialog'

exports.is_loaded = function(){
    return {
        type: 'IS_LOADED'
    }
}

exports.change_check_all_tasks = function(){
    return {
        type: 'CHANGE_CHECK_ALL_TASKS'
    }
}


exports.change_check_tasks = function(index){
    return {
        type: 'CHANGE_CHECK_TASKS',
        index
    }
}

exports.is_fetching = function() {
    return {
        type: 'IS_FETCHING'
    }
}

exports.not_fetching = function() {
    return {
        type: 'NOT_FETCHING'
    }
}

exports.load_data = function() {
    return (dispatch,getState) => {
        let state = getState(),
            pageSize = 20,
            begin = state.tasks.begin,//(state.tasks.current_page -1 ) * pageSize + 1,
            params = {
                user_id: state.user.user_id,
                begin,
                session_id: state.user.session_id,
                num: pageSize,
                from: 'lx_web',
                t: (new Date()).getTime(),
                type:0
            } 
        //window.onscroll = null
       
       dispatch(exports.is_fetching())
        //console.log(state.tasks.is_fetching)
        $.ajax({
            url: 'http://service.open.lixian.vip.xunlei.com/task/list',
            type: 'get',
            async: true,
            timeout: 8000,
            data: params,
            success: function(result) {
                 if(result.result === 0) {
                    dispatch(exports.not_fetching())
                    dispatch(load_data_action(result.tasks))
                     //第一次加载
                    if (state.tasks.totals == 0 ) {
                        dispatch(exports.is_loaded())
                        dispatch(add_totals(result.total_num))
                       
                    }
                    //dispatch(load_data_action([result.task],true))
                    /*dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'ok',
                        text: ' 添加成功!',
                    }))*/
                 }else {
                    dispatch(exports.not_fetching())
                    singleKLogging.info('收到请求添加失败'+JSON.stringify(result))
                    dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'error',
                        text: ' 加载失败!',
                    }))
                 }
                //dispatch(delete_selece_file(data_one.task_id))
                
            },
            complete: function(XMLHttpRequest, status) {　　　
                if (status == 'timeout') { //超时,status还有success,error等值的情况　　　　　　　　　
                    //dispatch(delete_selece_file(task_ids))
                    dispatch(exports.not_fetching())
                    dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'error',
                        text: ' 加载超时!',
                    }))
                    return
                }
                if (status == 'error') {　　　　　　　　
                     //dispatch(delete_selece_file(task_ids))
                    dispatch(exports.not_fetching())
                    dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'error',
                        text: ' 加载超时!',
                    }))
                    return
                }　　
            }
        })
        /*k_ajax.getJSONP('http://service.open.lixian.vip.xunlei.com/task/list',params,function(result) {
            
            
            dispatch(exports.not_fetching())
            dispatch(load_data_action(result.tasks))
            //dispatch(increase_current_page())
            //第一次加载
            if (state.tasks.totals == 0 ) {
                dispatch(add_totals(result.total_num))
               
            }
            
            
            
        })*/
    }
}

exports.first_add_data = function(task_id,isTaskUpdateMsg = false) {
    return (dispatch, getState) => {
        let state = getState(),
            params = {
                user_id: state.user.user_id,
                task_id: task_id
            }
        singleKLogging.info('收到请求'+JSON.stringify(params))
        
        $.ajax({
            url: 'http://service.open.lixian.vip.xunlei.com/task/query?from=lx_web&user_id='+state.user.user_id+'&session_id='+state.user.session_id+'&task_id='+task_id,
            type: 'get',
            async: true,
            timeout: 8000,
            //data: JSON.stringify(params),
            success: function(result) {
                 if(result.result === 0) {
                    dispatch(load_data_action([result.task],true))
                    /*dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'ok',
                        text: ' 添加成功!',
                    }))*/
                 }else {
                    if (isTaskUpdateMsg) return 
                    singleKLogging.info('收到请求添加失败'+JSON.stringify(result))
                    dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'error',
                        text: ' 添加失败!',
                    }))
                 }
                //dispatch(delete_selece_file(data_one.task_id))
                
            },
            complete: function(XMLHttpRequest, status) {　　　
                if (status == 'timeout') { //超时,status还有success,error等值的情况　　　　　　　　　
                    //dispatch(delete_selece_file(task_ids))
                     if (isTaskUpdateMsg) return 
                    dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'error',
                        text: ' 添加超时!',
                    }))
                    return
                }
                if (status == 'error') {　　　　　　　　
                     //dispatch(delete_selece_file(task_ids))
                      if (isTaskUpdateMsg) return 
                    dispatch(action_commonDialog.set_common_dialog({
                        display: true,
                        type: 'error',
                        text: ' 添加失败!',
                    }))
                    return
                }　　
            }
        })
        /*k_ajax.getJSONP('http://service.open.lixian.vip.xunlei.com/task/query',params,function(result){
             singleKLogging.info('收到请求结果'+JSON.stringify(result))
            if(result.result === 0) {
                dispatch(load_data_action([result.task],true))
            }
        })*/
    }
}

exports.first_add_task = function(task){
    return load_data_action([task],true)
}

function load_data_action(data = [],insert_first = false) {

    //data.map.(data_one => {
    //    data_one.file_type = Utils.getFileType(data_one.task_name,data_one.url) //加文件类型
    //})
    return {
        type: 'LOAD_DATA',
        data,
        insert_first,
    }
}

exports.delete_data = function(task_id) {
    return (dispatch,getState) => {
        
        let task_ids = [],
            state = getState()

        if (task_id) { //单个
            task_ids.push(task_id)
        }else { //批量
            _.each(state.tasks.data,function(data_one){
                if (data_one.checked === true) {
                    task_ids.push(data_one.task_id)
                }
            })
        }

        let { multipleFiles } = getState(),
            delete_selece_file = action_multipleFiles.delete_selece_file,
            //task_ids = _.pluck(multipleFiles.data, 'task_id'),
            params = {
                user_id: state.user.user_id,
                flag: 2,
                task_ids
            }
            
        $.ajax({
            url: 'http://service.open.lixian.vip.xunlei.com/task/delete?from=lx_web&user_id='+state.user.user_id+'&session_id='+state.user.session_id,
            type: 'post',
            async: true,
            timeout: 8000,
            data: JSON.stringify(params),
            success: function(result) {
                dispatch(delete_data_action(task_ids))
                
                //保证还有20条数据的情况下 最少有20条数据
                if (state.tasks.data.length >= 20 &&  (state.tasks.data.length - task_ids.length <= 20)) {
                    dispatch(exports.load_data())
                }

                //dispatch(delete_selece_file(data_one.task_id))
                dispatch(actionsMessageDialog.set_message_dialog({
                    display: true,
                    type: 'ok',
                    text: ' 删除成功!',
                }))


            },
            complete: function(XMLHttpRequest, status) {　　　
                    if (status == 'timeout') { //超时,status还有success,error等值的情况　　
                         dispatch(actionsMessageDialog.set_message_dialog({
                            display: true,
                            type: 'error',
                            text: ' 删除失败!',
                        }))　　　　　　　
                        dispatch(delete_selece_file(task_ids))
                       
                        return
                    }
                    if (status == 'error') {　　　
                         dispatch(actionsMessageDialog.set_message_dialog({
                            display: true,
                            type: 'error',
                            text: ' 删除失败!',
                        }))　　　　　　
                         dispatch(delete_selece_file(task_ids))
                        
                        return
                    }　　
                }
        })   
        /*k_ajax.post('http://service.open.lixian.vip.xunlei.com/task/delete?from=lx_web&user_id=501&session=E930ADA772A49AD785E5F9FAD30829EC08A25A307C9D94B0D714C0958F77EEC333267758DBEBA643DE5CEC019E33E90674AA0D69B293D18D8F434BD42D6EAF60',params,function(result){
            dispatch(delete_data_action(task_ids))
            delete_selece_file(data_one.task_id)
            dispatch(commonDialog.set_common_dialog({
                display: true,
                type: 'ok',
                text: ' 删除成功!',
            }))
        },function(){
            delete_selece_file(task_ids)
            dispatch(commonDialog.set_common_dialog({
                display: true,
                type: 'error',
                text: ' 删除失败!',
            }))
        })*/
    }
}

function delete_data_action(task_ids = []) {
    return {
        type: 'DELETE_DATA',
        task_ids
    }
}


function add_totals(add_sum = 1) {
    return {
        type: 'ADD_TOTALS',
        add_sum
    }
}

function increase_current_page() {
    return {
        type: 'INCREASE_CURRENT_PAGE'
    }
}

exports.add_activity = function(text,temp_picture){
    return ( dispatch,getState ) => {
        dispatch(exports.is_fetching())
        const activity = {
            text,
            'media': {'qiniu_key': temp_picture},
        }

        const params = Object.assign(activity,JSON.parse(localStorage.getItem('sina_access_token')))

        $.post('http://inner.journey.404mzk.com/v2/Activity_Controller/insert',params,function(result) {
        //fetch('http://inner.journey.404mzk.com/v2/Activity_Controller/insert',{
         // method: 'POST',
         // body: JSON.stringify(params)
        //}).then(function(result) {
            dispatch(exports.is_fetching())
            dispatch(load_activity_action(result.data, true))
            dispatch(add_totals(1))
            
        })
    }
}

exports.load_task_bt_list = function() {
    
}

