module.exports = {

    'port': {
        'dev': 8081,
        'prod': 8080
    },

    'database': {
        'dev': '',
        'prod': ''
    }

    'shipit': {
        'remote': {
            'host': 'myhost.com',
            'user': 'user'
        },
        'workspace': {
            'path': '/tmp/app'
        },
        'deployment': {
            'path': {
                'dev': '/var/apps/app-dev',
                'prod': '/var/apps/app'
            }
        },
        'git': {
            'repo': 'git@git.myhost.com:app/app.git',
            'branch': {
                'dev': 'dev',
                'prod': 'master'
            }
        }
    }

}
