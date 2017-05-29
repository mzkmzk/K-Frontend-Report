exports.set_entity_filter_attribute = (entity_id, data) => {
    return {
        type: 'SET_ENTITY_FILTER_ATTRIBUTE',
        entity_id,
        data
    }
}