<?php

/**
 * Registers the block
 */
function bokez_init_block_cover_1(){
    
	register_block_type( 'bokez/cover-1', array(
        'attributes' => array(

            'imageUrl' => array(
                'type' => 'string',
                'default' => '',
            ),

            'imageID' => array(
                'type' => 'number',
                'default' => '',
            ),

            'title' => array(
                'type' => 'string',
                'selector' => 'h2',
                'default' => 'John & Dina',
            ),
            
            'subtitle' => array(
                'type' => 'string',
                'selector' => 'p',
                'default' => 'We have combined many pre-designed blocks which you will need when building your pages.',
            ),
            
            'buttonText' => array(
                'type' => 'string',
                'selector' => 'a',
                'default' => 'Buy Now',
            ),

            'buttonUrl' => array(
                'type' => 'string',
                'default' => 'http://delabon.com',
            ),
            
            'buttonColor' => array(
                'type' => 'string',
                'default' => '#ffffff'
            ),

            'buttonBGColor' => array(
                'type' => 'string',
                'default' => ''
            ),

            'textColor' => array(
                'type' => 'string',
                'default' => '',
            ),

            'backgroundColor' => array(
                'type' => 'string',
                'default' => 'transparent',
            ),

            'alignment' => array(
                'type' => 'string',
                'default' => '',
            ),

            'showHero' => array(
                'type' => 'boolean',
                'default' => true
            ),

            'showButton' => array(
                'type' => 'boolean',
                'default' => true
            ),

        ),
		'render_callback' => 'bokez_render_block_cover_1',
    ) );
    
}
add_action( 'init', 'bokez_init_block_cover_1' );

/**
 * Server-side Rendering
 */
function bokez_render_block_cover_1( $attributes ) {

    $has_image = ( $attributes['imageID'] ? ' bokez-cover-has-image' : ''  );
    $bg_image = ( $attributes['imageUrl'] ? 'url('. $attributes['imageUrl'] .')' : ''  );
    $hero_markup = '';
    $button_markup = '';

    if( $attributes['showHero'] ){
        $hero_markup = <<<HTML
        <p class="bokez-cover-subtitle" style="color:{$attributes['textColor']};">{$attributes['subtitle']}</p>
HTML;
    }

    if( $attributes['showButton'] ){
        $button_markup = <<<HTML
        <a class="bokez-cover-button" href="{$attributes['buttonUrl']}" style="color:{$attributes['buttonColor']}; background-color:{$attributes['buttonBGColor']};">{$attributes['buttonText']}</a>
HTML;
    }

    return <<<HTML
    <div class="bokez-block bokez-cover bokez-cover-one {$has_image}" style="text-align:{$attributes['alignment']}; background-color:{$attributes['backgroundColor']}; background-image:{$bg_image};" >
        <div class = 'bokez-cover-content' >
            <h2 class="bokez-cover-title" style="color:{$attributes['textColor']};">{$attributes['title']}</h2>
            {$hero_markup}
            {$button_markup}
        </div>
    </div>
HTML;
}
