var errors = require('./errors.js')
var colors = require('colors/safe')

function sendObject(res, code, object) {

    var path = res.req.originalUrl
    var isObject = (typeof object == 'object')

    log(res, code)

    if (isObject) {
        object["success"] = true
        res.send(code, object)
    }
    else {
        var data = object || ''
        res.sendRaw(String(data))
    }

}

function sendError(res, next, err) {

    log(res, err.statusCode)
    next(err)

}

function log(res, code) {

    var path = res.req.originalUrl
    var success = (code >= 200 && code < 300)

    if (success) {
        console.log(colors.green("<= (" + code + ") " + path))
    }
    else {
        console.log(colors.red("<= (" + code + ") " + path))
    }

}

// Success

module.exports.success = (res, object) => {
    sendObject(res, 200, object)
}

module.exports.created = (res, object) => {
    sendObject(res, 201, object)
}

// Error

module.exports.badRequest = (res, next, message) => {
    sendError(res, next, errors.badRequest(message))
}

module.exports.invalidVersion = (res, next, message) => {
    sendError(res, next, errors.invalidVersion(message))
}

module.exports.unauthorized = (res, next, message) => {
    sendError(res, next, errors.unauthorized(message))
}

module.exports.forbidden = (res, next, message) => {
    sendError(res, next, errors.forbidden(message))
}

module.exports.notFound = (res, next, message) => {
    sendError(res, next, errors.notFound(message))
}

module.exports.resourceNotFound = (res, next, message) => {
    sendError(res, next, errors.resourceNotFound(message))
}
