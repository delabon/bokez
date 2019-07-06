<?php

/**
 * Registers the block
 */
function bokez_init_block_video_popup(){
    
	register_block_type( 'bokez/video-popup', array(
        'attributes' => array(
            
            'url' => array(
                'type' => 'url',
                'default' => 'https://vimeo.com/50522981',
            ),

            'videoSite' => array(
                'type' => 'string',
                'default' => 'vimeo',
            ),

            'videoId' => array(
                'type' => 'string',
                'default' => '50522981',
            ),

            'color' => array(
                'type' => 'string',
                'default' => 'white',
            ),

            'backgroundColor' => array(
                'type' => 'string',
                'default' => '#1d1d1d',
            ),

            'imageUrl' => array(
                'type' => 'string',
                'default' => ''
            ),

            'imageID' => array(
                'type' => 'number',
                'default' => 0
            ),

        ),
		'render_callback' => 'bokez_render_block_video_popup',
    ) );
    
}
add_action( 'init', 'bokez_init_block_video_popup' );

/**
 * Server-side Rendering
 */
function bokez_render_block_video_popup( $attributes ) {
    return <<<HTML
    <div class="bokez-block bokez-video-popup" data-videosite="{$attributes['videoSite']}" data-videoid="{$attributes['videoId']}" >
        <div class="bokez-video-wrapper" style="background-image: url({$attributes['imageUrl']}); background-color: {$attributes['backgroundColor']};" > 
            <a href="javascript:void(0)" class="bokez-video-popup-play" >
                <svg class="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path fill="{$attributes['color']}" d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3 17v-10l9 5.146-9 4.854z"/>
                </svg>
            </a>
        </div>
    </div>
HTML;
}
