<?php

/**
 * Registers the block
 */
function bokez_init_block_blockquote(){
    
	register_block_type( 'bokez/blockquote', array(
        'attributes' => array(

            'quote' => array(
                'type' => 'string',
                'selector' => 'p',
                'default' => 'Great things in business are never done by one person. They\'re done by a team of people.',
            ),
            
            'cite' => array(
                'type' => 'string',
                'selector' => 'cite',
                'default' => 'Steve Jobs',
            ),
            
            'borderColor' => array(
                'type' => 'string',
                'default' => '#F9583B',
            ),
            
            'borderSize' => array(
                'type' => 'string',
                'default' => '4',
            ),
            
            'borderPosition' => array(
                'type' => 'string',
                'default' => 'left',
            ),

            'alignment' => array(
                'type' => 'string',
                'default' => '',
            ),

            'textColor' => array(
                'type' => 'string',
                'default' => '',
            ),

            'backgroundColor' => array(
                'type' => 'string',
                'default' => 'transparent',
            ),

        ),
		'render_callback' => 'bokez_render_block_blockquote',
    ) );
    
}
add_action( 'init', 'bokez_init_block_blockquote' );

/**
 * Server-side Rendering
 */
function bokez_render_block_blockquote( $attributes ) {
    return <<<HTML
    <blockquote class="bokez-block bokez-blockquote" style="text-align:{$attributes['alignment']}; background-color:{$attributes['backgroundColor']}; color:{$attributes['textColor']}; border-{$attributes['borderPosition']}: {$attributes['borderSize']}px solid {$attributes['borderColor']};" >
        <p>{$attributes['quote']}</p>
        <cite style="text-align:{$attributes['alignment']}; color:{$attributes['textColor']};">{$attributes['cite']}</cite>
    </blockquote>
HTML;
}
