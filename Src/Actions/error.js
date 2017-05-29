import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'
import Attribute_Constant from '../Constant/Attribute_Constant'

const NAME = Attribute_Constant.ERROR.key

exports.ajax_load_data_error = ( params) => {
    return ajax_load_data( CONSTANT.URL.ERROR_QUERY, NAME, null, params)
}