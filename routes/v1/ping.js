var restify = require('restify')
var responder = require.main.require('./responder.js')

/**
* @module Routes | Ping
* GET /ping
*/

module.exports = (app) => {

    /**
    * Ping! Pong?
    */

    app.get('/ping', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: pingV1 },
        { version: '2.0.0', handler: pingV2 }
    ]))

    function pingV1(req, res) {
        responder.success(res, 'pong')
    }

    function pingV2(req, res) {
        responder.success(res, { message: 'pong' })
    }

    app.get('/bad', restify.plugins.conditionalHandler([
        { version: '1.0.0', handler: badV1 }
    ]))

    function badV1(req, res, next) {
        responder.badRequest(res, next, 'A wild error appeared!')
    }

}
