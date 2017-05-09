import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'

const NAME = 'loadtime'

let handle_data = obj_result => {
    obj_result.data.forEach( element => {
        element.dom_content_loaded = element.dom_content_loaded - element.unload_event_start
        element.window_loaded = element.window_loaded - element.unload_event_start
    })
    return obj_result
}

exports.ajax_load_data_loadtime = (page, params) => {
    return ajax_load_data(page, CONSTANT.URL.LOADTIME_QUERY, NAME, handle_data, params)
}