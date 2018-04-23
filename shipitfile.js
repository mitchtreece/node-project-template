var config = require('./config.js').shipit;

module.exports = (shipit) => {

    require('shipit-deploy')(shipit)

    shipit.initConfig({

        default: {
            workspace: config.workspace,
            deployTo: config.deployment.path.dev,
            repositoryUrl: config.git.repo,
            branch: config.git.branch.dev,
            servers: [{
                host: config.remote.host,
                user: config.remote.user
            }],
            ignores: ['.git', 'node_modules'],
            keepReleases: 5,
            deleteOnRollback: true,
            shallowClone: true
        },

        development: {
            // Same as 'default'
        },

        production: {
            deployTo: config.deployment.path.prod,
            branch: config.git.branch.prod
        }

    })
    
}
