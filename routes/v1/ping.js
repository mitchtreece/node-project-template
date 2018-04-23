var responder = require.main.require('./response.js')

/**
* @module Routes | Ping
* GET /ping
*/

module.exports = function(app) {

    /**
    * Pong?
    */

    app.get({ path: '/ping', version: '1.0.0' }, function(req, res, next) {
        responder.success(res, { 'pong' })
    }

}
