import data_reducer from './utils/data'

const NAME = 'network'

exports[NAME] = (...params) => {
    params.push( NAME )
    return data_reducer.apply(this, params)
}