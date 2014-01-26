module.exports = {
    src : [
        'app/js/**/*.js',
        // exclude jquery from jasmine
        '!app/js/jquery*.js'
    ],
    options : {
        specs : 'app/js/**/*spec.js',
        helpers: [
            'app/js/jquery*.js'
        ]
    }
};
