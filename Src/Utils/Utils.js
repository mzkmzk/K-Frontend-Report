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
}