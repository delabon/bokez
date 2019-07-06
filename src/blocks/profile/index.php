<?php

/**
 * Registers the block
 */
function bokez_init_block_profile(){
    
	register_block_type( 'bokez/profile', array(
        'attributes' => array(
            
            'message' => array(
                'type' => 'string',
                'default' => 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
            ),

            'name' => array(
                'type' => 'string',
                'default' => 'John Doe',
            ),

            'job' => array(
                'type' => 'string',
                'default' => 'Designer',
            ),

            'imageUrl' => array(
                'type' => 'string',
            ),

            'imageID' => array(
                'type' => 'number',
            ),

            'backgroundColor' => array(
                'type' => 'string',
                'default' => 'makeMeIgnored()',
            ),

            'textColor' => array(
                'type' => 'string',
                'default' => 'makeMeIgnored()',
            ),

        ),
		'render_callback' => 'bokez_render_block_profile',
    ) );
    
}
add_action( 'init', 'bokez_init_block_profile' );

/**
 * Server-side Rendering
 */
function bokez_render_block_profile( $attributes ) {

    $image_markup = '';

    if( $attributes['imageUrl'] ){
        $image_markup = <<<HTML
        <div class="bokez-profile-avatar-wrapper" >
            <div class="bokez-profile-avatar" >
                <img src="{$attributes['imageUrl']}" >
            </div>
        </div>
HTML;
    }

    return <<<HTML
    <div class="bokez-block bokez-profile" style="color: {$attributes['textColor']}; background-color:{$attributes['backgroundColor']};" >
        
        {$image_markup}

        <div class="bokez-profile-content" >

            <h3 class="bokez-profile-name" style="color: {$attributes['textColor']};">{$attributes['name']}</h3>

            <span class="bokez-profile-job">{$attributes['job']}</span>
            
            <p class="bokez-profile-text">{$attributes['message']}</p>

        </div>

    </div>
HTML;
}
