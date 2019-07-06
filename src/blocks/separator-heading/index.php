<?php

/**
 * Registers the block
 */
function bokez_init_block_separator_heading(){
    
	register_block_type( 'bokez/separator-heading', array(
        'attributes' => array(

            'text' => array(
                'type' => 'string',
                'default' => 'Heading Goes Here',
                'selector' => 'h3',
            ),

            'textColor' => array(
                'type' => 'string',
                'default' => '#2d2d2d',            
            ),

            'borderColor' => array(
                'type' => 'string',
                'default' => '#e1e1e1',
            ),

            'borderSize' => array(
                'type' => 'number',
                'default' => 1,
            ),

            'borderType' => array(
                'type' => 'string',
                'default' => 'solid',
            ),

            'width' => array(
                'type' => 'number',
                'default' => 50,
            ),

        ),
		'render_callback' => 'bokez_render_block_separator_heading',
    ) );
    
}
add_action( 'init', 'bokez_init_block_separator_heading' );

/**
 * Server-side Rendering
 */
function bokez_render_block_separator_heading( $attributes ) {
    return <<<HTML
    <div class="bokez-block bokez-separator-heading-wrapper" >
                
        <div class="bokez-separator-heading" style="width : {$attributes['width']}%" > 

            <span class="bokez-separator-heading-border" style="border-bottom: {$attributes['borderSize']}px {$attributes['borderType']} {$attributes['borderColor']};"></span>

            <h3 style="color: {$attributes['textColor']};">{$attributes['text']}</h3>
        
            <span class="bokez-separator-heading-border" style="border-bottom: {$attributes['borderSize']}px {$attributes['borderType']} {$attributes['borderColor']};"></span>

        </div>

    </div>
HTML;
}
