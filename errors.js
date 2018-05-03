var RestifyError = require('restify-errors')

module.exports.badRequest = (message) => {
    return new RestifyError.BadRequestError(message)
}

module.exports.invalidVersion = (message) => {
    return new RestifyError.InvalidVersionError(message)
}

module.exports.unauthorized = (message) => {
    return new RestifyError.UnauthorizedError(message)
}

module.exports.forbidden = (message) => {
    return new RestifyError.ForbiddenError(message)
}

module.exports.notFound = (message) => {
    return new RestifyError.NotFoundError(message)
}

module.exports.resourceNotFound = (message) => {
    return new RestifyError.ResourceNotFoundError(message)
}
