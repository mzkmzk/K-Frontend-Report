import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'

const NAME = 'network'

exports.ajax_load_data_network = (page, params) => {
    return ajax_load_data(page, CONSTANT.URL.NETWORK_QUERY, NAME, null, params)
}