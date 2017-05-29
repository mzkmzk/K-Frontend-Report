import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'
import Utils_Function from '../Utils/Utils'
import Attribute_Constant from '../Constant/Attribute_Constant'

const NAME = Attribute_Constant.NETWORK.key

exports.ajax_load_data_network = ( params) => {
    
    return ajax_load_data( CONSTANT.URL.NETWORK_QUERY, NAME, null, params)
}