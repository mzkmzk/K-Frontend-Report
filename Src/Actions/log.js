import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'

const NAME = 'log'

exports.ajax_load_data_log = (page, params) => {
    return ajax_load_data(page, CONSTANT.URL.LOG_QUERY, NAME, null, params)
}