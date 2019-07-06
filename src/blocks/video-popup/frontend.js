(function( $, body ){

    const vimeoIframe = '<iframe src="https://player.vimeo.com/video/{##videoid##}?autoplay=1&loop=1&title=0&byline=0&portrait=0" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><script src="https://player.vimeo.com/api/player.js"></script>';
    const youtubeIframe = '<iframe allowfullscreen="" src="https://www.youtube.com/embed/{##videoid##}?html5=1&amp;rel=0&amp;showinfo=0&amp;playsinline=1&amp;autoplay=1"></iframe>';

    $('.bokez-video-popup').each(function(){
    
        const el = $( this );
        const videoId = el.attr( 'data-videoid' )
        const videoSite = el.attr( 'data-videosite' )
        let videoIframe = '';

        if( videoSite === 'youtube' ){
            videoIframe = youtubeIframe.replace( '{##videoid##}', videoId );
        }
        else{
            videoIframe = vimeoIframe.replace( '{##videoid##}', videoId );
        }

        el.on('click', function( event ){
            event.preventDefault();

            $( '#bokez-video-modal' ).remove();

            body.append('<div id="bokez-video-modal"><div class="bokez-video-modal-content"><div class="bokez-video-modal-wrapper">'+videoIframe+'</div></div><button class="bokez-video-modal-close">x</button></div>');
        });

    });

    // close modal
    jQuery( document ).on( 'click', '#bokez-video-modal', function( event ){
        $( this ).remove();
    });

    jQuery( document ).on( 'click', '#bokez-video-modal .bokez-video-modal-close', function( event ){
        event.stopPropagation();
        $( this ).parent().remove();
    });


})( jQuery, jQuery('body') );
