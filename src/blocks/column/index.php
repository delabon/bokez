<?php

/**
 * Registers the block
 */
function bokez_init_block_column(){
    
	register_block_type( 'bokez/column', array(
        'attributes' => array(
            'id' => array(
                'type' => 'number',
                'default' => 1,
            ),
            'paddingTop' => array(
                'type' => 'number',
                'default' => 0
            ),
            'paddingBottom' => array(
                'type' => 'number',
                'default' => 0
            ),
    
            'marginTop' => array(
                'type' => 'number',
                'default' => 0
            ),
    
            'marginBottom' => array(
                'type' => 'number',
                'default' => 0
            ),
        ),
		'render_callback' => 'bokez_render_block_column',
    ) );
    
}
add_action( 'init', 'bokez_init_block_column' );

/**
 * Server-side Rendering
 */
function bokez_render_block_column( $attributes, $content = "" ) {

    $style = " style='padding-top:{$attributes['paddingTop']}px; margin-top:{$attributes['marginTop']}px; padding-bottom:{$attributes['paddingBottom']}px; margin-bottom:{$attributes['marginBottom']}px;'";

    return <<<HTML
        <div {$style} class="bokez-column bokez-column-{$attributes['id']}">
            <div class="bokez-column-inner">{$content}</div>
        </div>
HTML;
}
