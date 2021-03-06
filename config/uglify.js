var _ = require('underscore');

var files = {
    top: {
        'src/js/js_top.js': [
            'app/js/jquery-1.10.2.min.js',
            'app/js/modernizr.custom.49435.js',
            'app/js/modernizr.ios.js'
        ]
    },
    bottom: {
        'src/js/js_bottom.js': [
            'app/js/app.js',
            'app/js/app_nav-phone-toggle.js',
            'app/js/app_nav-current.js',
            'app/js/app_events_google-map.js',
            'app/js/webfont-loader.js'
        ]
    }
};

function all() {
    'use strict';
    var allfiles = {},
        i = {};

    for (i in files) {
        _.extend(allfiles, files[i]);
    }
    return allfiles;
}

// Grunt configuration settings
module.exports.config = {
    options: {
//      banner:   '// <%= pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd HH:mm:ss") %>\n\n',
        mangle:   false,
        report:   'min' // 'false', 'min' or 'gzip' Default: false
    },
    dist: {
        files: (all())
    },
    dev: {
        options: {
            compress: false,
            beautify: true
        },
        files: (all())
    }
};
