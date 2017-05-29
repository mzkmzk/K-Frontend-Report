import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'
import Attribute_Constant from '../Constant/Attribute_Constant'

const NAME = Attribute_Constant.LOG.key

exports.ajax_load_data_log = ( params) => {
    return ajax_load_data( CONSTANT.URL.LOG_QUERY, NAME, null, params)
}