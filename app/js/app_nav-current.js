
/* ---------------------------------------------------
::::::: app_nav-current ::::::::::::::::::::::::::::::
--------------------------------------------------- */

function navCurrent(){

    var options = {
        navItem :           '.nav-default__item, .nav-phone__item',
        navItemTrigger :    '.nav-default__item a, .nav-phone__item a',
        currentItem :       'current'
    };

    // when clicking on a navigation link
    $('' + options.navItemTrigger + '').on('click', function(){
        // get href attribute of clicked link
        var clickedHref = $(this).attr('href');
        // if clicked link's parent doesn't have class 'current'
        if(!$(this).parent().hasClass(options.currentItem)){
            // remove all instances of class 'current'
            $('' + options.navItem + '').removeClass(options.currentItem);
            // give class 'current' to all links with the same 'href' attribute
            $('a[href=' + clickedHref + ']' ).parent().addClass(options.currentItem);
        }
    });

}
navCurrent();
