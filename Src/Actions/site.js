import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'
import Attribute_Constant from '../Constant/Attribute_Constant'

const NAME = Attribute_Constant.SITE.key

exports.ajax_load_data_site = ( params) => {
    return ajax_load_data( CONSTANT.URL.SITE_QUERY, NAME, null, params)
}