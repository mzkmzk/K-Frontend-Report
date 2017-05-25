import { ajax_load_data } from './utils/data'
import CONSTANT from '../Constant/Constant'

const NAME = 'site'

exports.ajax_load_data_site = (page, params) => {
    return ajax_load_data(page, CONSTANT.URL.SITE_QUERY, NAME, null, params)
}