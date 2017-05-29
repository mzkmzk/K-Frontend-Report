import Constant from '../Constant/Constant'
import _ from 'underscore'
export default class Utils {

    static get_url_params() {
        let args = {},
            query = location.search.substring(1),
            pairs = query.split('&'),
            pos, name, value, i

        for ( i = pairs.length - 1; i >= 0; i-- ) {

            pos = pairs[i].indexOf( '=' )
            if ( pos === -1) continue

            name = pairs[i].substring( 0, pos )
            value = pairs[i].substring( pos + 1)
            args[ name ] = value
        }

        return args
    }

    static get_curent_host(){
        if(__DEV__){
            return Constant.TEST_URL
        }else {
            return Constant.PRODUCTION_URL
        }
    }

    static array_to_object(attribute_key, _array){
        let new_object = {}
        _.each(_array, element => {
            new_object[ element[ attribute_key ] ] = element
        })
        return new_object
    }

    static object_to_array(_object){
        let _array = []
        _.mapObject(_object, element => {
            _array.push(element)
        })
        return _array
    }

    static get_filter_attribute_params(entity_id, get_state){
        let state = get_state(),
            filter_attribte_data = state.filter_attribute.data,
            entity_attribute = filter_attribte_data[ entity_id ]

        if ( !entity_attribute ) return {}
        
        return {
            where: JSON.stringify( Utils.object_to_array(entity_attribute) )
        }
    }
}