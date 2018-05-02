
error = function(code, message) {

    if (message) {
        return { code: code, message: message }
    }
    else {
        return { code: code }
    }

}

module.exports.generic = function(message) {
    return error('Error', message)
}

module.exports.badRequest = function(message) {
    return error('BadRequest', message)
}

module.exports.invalidVersion = function(message) {
    return error('InvalidVersion', message)
}

module.exports.unauthorized = function(message) {
    return error('Unauthorized', message)
}

module.exports.forbidden = function(message) {
    return error('Forbidden', message)
}

module.exports.notFound = function(message) {
    return error('NotFound', message)
}

module.exports.resourceNotFound = function(message) {
    return error('ResourceNotFound', message)
}
