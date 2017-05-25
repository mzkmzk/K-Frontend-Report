import data_reducer from './utils/data'

const NAME = 'site'

exports[NAME] = (...params) => {
    params.push( NAME )
    return data_reducer.apply(this, params)
}