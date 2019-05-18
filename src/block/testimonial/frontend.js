(function( $ ){

    /**
     * Arrow Right
     */
    $('.bokez-testimonials ._arrow_left_bokez').on( 'click', function( event ){

        let self = jQuery( event.currentTarget );
        let uiParent = jQuery( self ).parents('.bokez-testimonials');
        let uiItems = jQuery( '._item_bokez', uiParent );
        let uiCurrentItem = jQuery( '._item_bokez._item_current_bokez', uiParent );
        let uiPoints = jQuery( '._points_bokez span', uiParent );

        uiCurrentItem.removeClass('_item_current_bokez');
        uiPoints.filter('._current_point_bokez').removeClass();

        let uiNext = uiItems.eq( parseInt( uiCurrentItem.attr('data-id') ) - 1 );
        let uiNextPoint = uiPoints.eq( parseInt( uiCurrentItem.attr('data-id') ) - 1 );

        if( uiNext.length ){
            uiNext.addClass('_item_current_bokez');
            uiNextPoint.addClass('_current_point_bokez');
        }
        else{
            jQuery( '._item_bokez:last', uiParent ).addClass('_item_current_bokez');
            uiPoints.filter(':last').addClass('_current_point_bokez');
        }

    });

    /**
     * Arrow Right
     */
    $('.bokez-testimonials ._arrow_right_bokez').on( 'click', function( event ){

        let self = jQuery( event.currentTarget );
        let uiParent = jQuery( self ).parents('.bokez-testimonials');
        let uiItems = jQuery( '._item_bokez', uiParent );
        let uiCurrentItem = jQuery( '._item_bokez._item_current_bokez', uiParent );
        let uiPoints = jQuery( '._points_bokez span', uiParent );

        uiCurrentItem.removeClass('_item_current_bokez');
        uiPoints.filter('._current_point_bokez').removeClass();

        let uiNext = uiItems.eq( parseInt( uiCurrentItem.attr('data-id') ) + 1 );
        let uiNextPoint = uiPoints.eq( parseInt( uiCurrentItem.attr('data-id') ) + 1 );

        if( uiNext.length ){
            uiNext.addClass('_item_current_bokez');
            uiNextPoint.addClass('_current_point_bokez');
        }
        else{
            jQuery( '._item_bokez:first', uiParent ).addClass('_item_current_bokez');
            uiPoints.filter(':first').addClass('_current_point_bokez');
        }

    });

    /**
     * Points
     */
    $('.bokez-testimonials ._points_bokez span').on( 'click', function( event ){

        var self = jQuery( event.currentTarget );

        if( self.hasClass('_current_point_bokez') ) return;

        var uiParent = self.parents('.bokez-testimonials');
        var uiItems = jQuery( '._item_bokez', uiParent );

        uiItems.filter('._item_current_bokez').removeClass('_item_current_bokez');
        uiItems.eq( self.attr('data-index') ).addClass('_item_current_bokez');
        
        self.parent().find('._current_point_bokez').removeClass('_current_point_bokez');
        self.addClass('_current_point_bokez');

    });

})( jQuery )