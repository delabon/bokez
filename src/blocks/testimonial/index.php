<?php

/**
 * Registers the block
 */
function bokez_init_block_testimonial(){
    
	register_block_type( 'bokez/testimonial', array(
        'attributes' => array(
            
            'items' => array(
                'type' => 'array',
                'default' => array(
                    array(
                        'message' => 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
                        'name' => 'John Doe',
                        'job' => 'Designer',
                        'imageUrl' => '',
                        'imageID' => 0,
                    ),
                ),
            ),
            
            'itemsJson' => array(
                'type' => 'string',
                'default' => json_encode(array(
                    array(
                        'message' => 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
                        'name' => 'John Doe',
                        'job' => 'Designer',
                        'imageUrl' => '',
                        'imageID' => 0,
                    )
                ))
            ),

            'showPoints' => array(
                'type' => 'boolean',
                'default' => true
            ),
        
            'showArrows' => array(
                'type' => 'boolean',
                'default' => true
            ),
        
            'alignment' => array(
                'type' => 'string',
                'default' => 'center'
            ),
        
            'backgroundColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'textColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'arrowsColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'pointsColor' => array(
                'type' => 'string',
                'default' => '',
            ),

        ),
		'render_callback' => 'bokez_render_block_testimonial',
    ) );
    
}
add_action( 'init', 'bokez_init_block_testimonial' );

/**
 * Server-side Rendering
 */
function bokez_render_block_testimonial( $attributes ) {

    $rows =  json_decode( $attributes['itemsJson'], true );
    $rows_markup = '';
    $points_markup = '';
    $arrows_markup = '';
    $iii = 0;

    foreach( $rows as $item ){

        $image_markup = '';

        if( $item['imageUrl'] ){
            $image_markup = <<<HTML
            <div class="_item_avatar_wrapper_bokez" >
                <div class="_item_avatar_bokez" >
                    <img src="{$item['imageUrl']}" >
                </div>
            </div>
HTML;
        }

        $item_current = ( $iii === 0 ? ' _item_current_bokez' : '');
        $rows_markup .= <<<HTML
        <div data-id="{$iii}" class="_item_bokez {$item_current}" >
            {$image_markup}
            <h3 class="_item_name_bokez">{$item['name']}</h3>
            <span class="_item_job_bokez">{$item['job']}</span>
            <p class="_item_message_bokez">{$item['message']}</p>
        </div>
HTML;

        $points_current = ( $iii === 0 ? ' _current_point_bokez' : '');
        $points_markup .= <<<HTML
        <span class="{$points_current}" data-index="{$iii}" style="background-color: {$attributes['pointsColor']};"></span>
HTML;

        $iii += 1;
    }

    if( $attributes['showPoints'] && count( $rows ) > 1 ){
        $points_markup = '<div class="_points_bokez">' . $points_markup . '</div>';
    }
    else{
        $points_markup = '';
    }

    if( $attributes['showArrows'] && count( $rows ) > 1 ){
        $arrows_markup = <<<HTML
        <div class="_arrow_left_bokez">
            <svg class="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="{$attributes['arrowsColor']}" d="M20 .753l-14.44 11.247 13.44 11.263-.678.737-14.322-12 15.335-12 .665.753z"/>
            </svg>
        </div>
        <div class="_arrow_right_bokez">
            <svg class="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                <path fill="{$attributes['arrowsColor']}" d="M4 .753l14.44 11.247-13.44 11.263.678.737 14.322-12-15.335-12-.665.753z"/>
            </svg>
        </div>
HTML;
    }

    return <<<HTML
    <div class="bokez-block bokez-testimonials" style="text-align: {$attributes['alignment']}; background-color: {$attributes['backgroundColor']}; color: {$attributes['textColor']};">
        {$rows_markup}           
        {$points_markup}
        {$arrows_markup}
    </div>
HTML;
}
