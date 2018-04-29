var restify = require('restify')
var parser  = require('body-parser');
var mongoose = require('mongoose');
var colors = require('colors/safe')

var config = require('./config.js')
var versioner = require('./versioner.js')

var env = process.env
var isProduction = (env.NODE_ENV == 'production')
var envString = isProduction ? "prod" : "dev"
var port = isProduction ? config.port.prod : config.port.dev

// var database = isProduction ? config.database.prod : config.database.dev
//
// mongoose.connect(database, {
//     useMongoClient: true
// })

var app = restify.createServer({ name: 'Node Project Template' })
app.pre(restify.pre.sanitizePath())
app.pre(versioner.versionizeRoutes())
app.use(restify.plugins.queryParser())
app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())

app.listen(port, () => {
    console.log(colors.green('** Node Project Template - running on port ' + port + " (" + envString + ") **"))
})

app.get('/', restify.plugins.serveStatic({
	'directory': './public',
	'default': 'index.html'
}))

require('./routes/routes.js')(app)
