var colors = require('colors/safe')

module.exports.send = function(res, code, success, object) {

    var path = res.req.originalUrl

    if (success) {
        console.log(colors.green("<= (" + code + ") " + path))
    }
    else {
        console.log(colors.red("<= (" + code + ") " + path))
    }

    object["success"] = success
    res.send(code, object)

}

module.exports.success = function(res, object) {
    this.send(res, 200, true, object)
}

module.exports.error = function(res, message) {

    this.send(res, 400, false, {
        error: { message: message }
    })

}

module.exports.badRequest = function(res, message) {

    this.send(res, 400, false, {
        error: { message: message }
    })

}

module.exports.unauthorized = function(res, message) {

    this.send(res, 401, false, {
        error: { message: message }
    })

}

module.exports.notFound = function(res, message) {

    this.send(res, 404, false, {
        error: { message: message }
    })

}
