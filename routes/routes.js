var middleware = require('./middleware.js')

module.exports = function(app) {

    // v1
    require.main.require('./routes/v1/ping.js')(app)

}
