const isEmpty = value =>
    value === undefined || value === null ||
    // empty obj
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    // empty string
    (typeof value === 'string' && value.trim().length === 0)

module.exports = isEmpty;