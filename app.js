var restify = require('restify')
var parser  = require('body-parser')
var mongoose = require('mongoose')
var responder = require('./responder.js')
var errors = require('./errors.js')
var colors = require('colors/safe')

var config = require('./config.js')
var versioner = require('./versioner.js')

var env = process.env
var isProduction = (env.NODE_ENV == 'production')
var envString = isProduction ? "prod" : "dev"
var port = isProduction ? config.port.prod : config.port.dev

// var databaseUrl = isProduction ? config.database.prod : config.database.dev

var app = restify.createServer({ name: 'Node Project Template' })
app.pre(restify.pre.sanitizePath())
app.pre(versioner.versionizeRoutes())
app.use(restify.plugins.queryParser())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.on('restifyError', function(req, res, err, callback) {

    err.toJSON = function customToJSON() {
        return {
            error: {
                code: err.statusCode,
                name: err.name,
                message: err.message
            },
            success: false
        }
    }

    return callback()

})

app.get('/', restify.plugins.serveStatic({
	'directory': './public',
	'default': 'index.html'
}))

app.listen(port, () => {

    // mongoose.connect(databaseUrl, {
    //     useMongoClient: true
    // })
    //
    // mongoose.once('open', () => {
	//     require('./routes/routes.js')(app);
    //     console.log(colors.green(`** Node Project Template - running on port ${port} (${envString}) **`))
	// });

    require('./routes/routes.js')(app);
    console.log(colors.green(`** Node Project Template - running on port ${port} (${envString}) **`))

})
