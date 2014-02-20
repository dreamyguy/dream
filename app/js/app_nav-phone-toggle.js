
/* ---------------------------------------------------
::::::: app_nav-phone-toggle :::::::::::::::::::::::::
--------------------------------------------------- */

function phoneMenuToggler(){
    // default options, can be overridden by user
    var options = {
        overlay :           '#overlay-nav-menu-close',
        toggler :           '.nav-phone__toggle',
        phoneMenuItem :     '.nav-phone a',
        classHolder :       'html',
        classIsExpanded :   'nav-phone-is-expanded',
        classIsCollapsed :  'nav-phone-is-collapsed'
    };

    // Override default options with user supplied options
    for( var attrname in options ) {
        options[attrname] = options[attrname];
    };

    // toggle phone menu on click
    $('' + options.toggler + '').on('click', function(){
        // toggle phone menu depending on classIsExpanded state
        if($('' + options.classHolder + '').hasClass(options.classIsExpanded)){
            collapsePhoneMenu();
        } else {
            expandPhoneMenu();
        }
    });

    // disable / collapse phone menu when clicking on a phone menu item
    $('' + options.phoneMenuItem + '').on('click', function(){
        $('' + options.toggler + '').trigger('click');
    });

    // disable / collapse phone menu when clicking outside
    $('' + options.overlay + '').on('click', function(){
        collapsePhoneMenu();
    });

    // disable / collapse phone menu
    var collapsePhoneMenu = function(){
        $('' + options.overlay + '').hide();
        $('' + options.classHolder + '').removeClass(options.classIsExpanded).addClass(options.classIsCollapsed);
    };

    // enable / expand phone menu
    var expandPhoneMenu = function(){
        $('' + options.overlay + '').show();
        $('' + options.classHolder + '').removeClass(options.classIsCollapsed).addClass(options.classIsExpanded);
    };
}
phoneMenuToggler();
