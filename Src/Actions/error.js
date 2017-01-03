import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'

const NAME = 'error'

exports.ajax_load_data_error = (page) => {
    return ajax_load_data(page, CONSTANT.URL.ERROR_QUERY, NAME)
}