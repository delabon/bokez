(function( $ ){

    var items = jQuery('.bokez-accordion .bokez-accordion-item');

    items.on( 'click', function(){

        var self = $( this );

        if( self.hasClass('_active_bokez') ){
            self.removeClass('_active_bokez');
            return;
        }

        self.parents('.bokez-accordion').find('.bokez-accordion-item').removeClass('_active_bokez');
        self.addClass('_active_bokez');

    });

})( jQuery );