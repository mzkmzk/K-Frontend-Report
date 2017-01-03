import data_reducer from './utils/data'

const NAME = 'error'

exports[NAME] = (...params) => {
    params.push( NAME )
    return data_reducer.apply(this, params)
}