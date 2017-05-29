import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'
import Attribute_Constant from '../Constant/Attribute_Constant'

import Utils_Function from '../Utils/Utils'


const NAME = Attribute_Constant.LOADTIME.key

let handle_data = obj_result => {
    obj_result.data.forEach( element => {
        element.dom_content_loaded = element.dom_content_loaded - element.unload_event_start
        element.window_loaded = element.window_loaded - element.unload_event_start
    })
    return obj_result
}

exports.ajax_load_data_loadtime = ( params) => {
    return ajax_load_data( CONSTANT.URL.LOADTIME_QUERY, NAME, handle_data, params)
}