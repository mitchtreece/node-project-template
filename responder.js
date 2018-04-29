var errors = require('restify-errors')
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

    this.send(res, 400, {
        error: {
            code: 'GenericError',
            message: message
        }
    })

}

module.exports.badRequest = function(res, message) {

    this.send(res, 400, {
        error: {
            code: new errors.BadRequestError().name,
            message: message
        }
    })

}

module.exports.invalidVersion = function(res, message) {

    this.send(res, 400, {
        error: {
            code: new errors.InvalidVersionError().name,
            message: message
        }
    })

}

module.exports.unauthorized = function(res, message) {

    this.send(res, 401, {
        error: {
            code: new errors.UnauthorizedError().name,
            message: message
        }
    })

}

module.exports.forbidden = function(res, message) {

    this.send(res, 403, {
        error: {
            code: new errors.ForbiddenError().name,
            message: message
        }
    })

}

module.exports.notFound = function(res, message) {

    this.send(res, 404, {
        error: {
            code: new errors.NotFoundError().name,
            message: message
        }
    })

}

module.exports.resourceNotFound = function(res, message) {

    this.send(res, 404, {
        error: {
            code: new errors.ResourceNotFoundError().name,
            message: message
        }
    })

}
