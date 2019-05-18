<?php

/**
 * Registers the block
 */
function bokez_init_block_button(){
    
	register_block_type( 'bokez/button', array(
        'attributes' => array(
            'text' => array(
                'type' => 'string',
                'default' => 'Buy Now',
            ),
            'url' => array(
                'type' => 'url',
                'default' => 'http://delabon.com',
            ),
            'alignment' => array(
                'type' => 'string',
                'default' => '',
            ),
            'color' => array(
                'type' => 'string',
                'default' => '#e1e1e1',
            ),
            'backgroundColor' => array(
                'type' => 'string',
                'default' => 'black',
            ),
            'size' => array(
                'type' => 'string',
                'default' => 'default',            
            ),
            'type' => array(
                'type' => 'string',
                'default' => 'calltoaction',            
            ),
        ),
		'render_callback' => 'bokez_render_block_button',
    ) );
    
}
add_action( 'init', 'bokez_init_block_button' );

/**
 * Server-side Rendering
 */
function bokez_render_block_button( $attributes ) {
    return <<<HTML
    <div class="bokez-block bokez-button" style="text-align:{$attributes['alignment']};">
        <a class="bokez-button-type-{$attributes['type']} bokez-button-size-{$attributes['size']}" href="{$attributes['url']}" style="background-color:{$attributes['backgroundColor']}; color: {$attributes['color']};">
            <span>{$attributes['text']}</span>
        </a>
    </div>
HTML;
}
