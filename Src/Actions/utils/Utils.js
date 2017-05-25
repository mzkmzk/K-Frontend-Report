import k_ajax from 'k_ajax'

export default {
    ajax: (url, params, options, get_status) => {
        params.creator_user_id = get_status().user.creator_user_id
        params.sina_access_token = get_status().user.sina_access_token
        k_ajax.getJSON(url,params,options)
    }
}