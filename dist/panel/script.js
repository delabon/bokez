(function( $ ){

    /**
     * Header Nav Click
     */
    var headerNavItems = $('.bokez-nav-tab-wrapper a');
    var pages = $('.bokez-page');

    headerNavItems.click(function( event ){
        $(this).parent().toggleClass('_open_');

        var self = $( this );

        if( self.attr('href') === '#' ){
            event.preventDefault();

            headerNavItems.filter('.nav-tab-active').removeClass('nav-tab-active');
            self.addClass('nav-tab-active');
            pages.filter('._open_').removeClass('_open_');
            pages.filter('[data-page="'+self.data('page')+'"]').addClass('_open_');
        }
    });

    /**
     * Tab Toggle
     */
    $('.bokez-tabs > li > a').click(function( event ){
        event.preventDefault();
        $(this).parent().toggleClass('_open_');
    });

    /**
     * Admin Notice 
     */
    $('.bokez-notice-close').on('click', function(e){
        e.preventDefault();
        $.post( ajaxurl, { action: "bokez_banner_hide" }, function(data){
            $('.bokez-notice').slideUp();
        });
    });

})( jQuery )
