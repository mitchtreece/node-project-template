var restify = require('restify')
var semver = require('semver')

module.exports.handleVersioning = function(options) {

    options = options || {}

    var prefix = options.prefix || ''

    return function (req, res, next) {

        req.originalUrl = req.url
        req.url = req.url.replace(prefix, '')

        var pieces = req.url.replace(/^\/+/, '').split('/')
        var version = pieces[0]

        version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3')
        version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0')
        version = version.replace(/v(\d{1})/, '$1.0.0')

        if (version == '' || version == null) {

            // No version specified
            // Root path requested

            next()

        }
        else if (semver.valid(version)) {

            req.url = req.url.substr(pieces[0].length + 1)
            req.headers = req.headers || []
            req.headers['accept-version'] = version

        }
        else {
            return next(new restify.InvalidVersionError('invalid api version'))
        }

        next()

    }

}
