var errors = require('./errors.js')
var colors = require('colors/safe')

module.exports.send = function(res, code, object) {

    var path = res.req.originalUrl
    var success = (code >= 200 && code < 300)
    var isObject = (typeof object == 'object')

    if (success) {
        console.log(colors.green("<= (" + code + ") " + path))
    }
    else {
        console.log(colors.red("<= (" + code + ") " + path))
    }

    if (isObject) {
        object["success"] = success
        res.send(code, object)
    }
    else {
        var data = object || ''
        res.sendRaw(String(data))
    }

}

module.exports.success = function(res, object) {
    this.send(res, 200, object)
}

module.exports.created = function(res, object) {
    this.send(res, 201, object)
}

module.exports.error = function(res, message) {
    this.send(res, 400, { error: errors.generic(message) })
}

module.exports.badRequest = function(res, message) {
    this.send(res, 400, { error: errors.badRequest(message) })
}

module.exports.invalidVersion = function(res, message) {
    this.send(res, 400, { error: errors.invalidVersion(message) })
}

module.exports.unauthorized = function(res, message) {
    this.send(res, 401, { error: errors.unauthorized(message) })
}

module.exports.forbidden = function(res, message) {
    this.send(res, 403, { error: errors.forbidden(message) })
}

module.exports.notFound = function(res, message) {
    this.send(res, 404, { error: errors.notFound(message) })
}

module.exports.resourceNotFound = function(res, message) {
    this.send(res, 404, { error: errors.resourceNotFound(message) })
}
