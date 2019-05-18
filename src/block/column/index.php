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
        ),
		'render_callback' => 'bokez_render_block_column',
    ) );
    
}
add_action( 'init', 'bokez_init_block_column' );

/**
 * Server-side Rendering
 */
function bokez_render_block_column( $attributes, $content = "" ) {
    return <<<HTML
        <div class="bokez-column bokez-column-{$attributes['id']}">
            <div class="bokez-column-inner">{$content}</div>
        </div>
HTML;
}
