var semver = require('semver')
var error = require('restify-errors')
var errors = require('./errors.js')

module.exports.versionizeRoutes = (options) => {

    options = options || {}

    var prefix = options.prefix || ''
    if (prefix.length > 0 && (prefix.charAt(0 != '/'))) {
        prefix = '/'.concat(prefix)
    }

    return (req, res, next) => {

        req.originalUrl = req.url
        req.url = req.url.replace(prefix, '')

        var components = req.url.replace(/^\/+/, '').split('/')
        var version = components[0]

        version = version.replace(/v(\d{1})\.(\d{1})\.(\d{1})/, '$1.$2.$3')
        version = version.replace(/v(\d{1})\.(\d{1})/, '$1.$2.0')
        version = version.replace(/v(\d{1})/, '$1.0.0')

        // console.log('{\n  og_url: ' + req.originalUrl + ',\n  url: ' + req.url + ',\n  version: ' + version + '\n}')

        if (version == '' || version == null) {

            // No version specified
            // Root path requested

            return next()

        }
        else if (semver.valid(version)) {

            let endpoint = req.url.substr(components[0].length + 1)

            if (endpoint == '/' || endpoint == '' || endpoint == null) {

                // A valid version was requested, but without an endpoint.
                // i.e. http://host.com/v1/

                return next(errors.resourceNotFound(`\/ is not a valid endpoint`))

            }

            req.url = endpoint
            req.headers = req.headers || []
            req.headers['accept-version'] = version

            return next()

        }

        next(errors.invalidVersion('invalid api version'))

    }

}
