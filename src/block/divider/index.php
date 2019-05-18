<?php

/**
 * Registers the block
 */
function bokez_init_block_divider(){
    
	register_block_type( 'bokez/divider', array(
        'attributes' => array(
            
            'alignment' => array(
                'type' => 'string',
                'default' => '',
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
		'render_callback' => 'bokez_render_block_divider',
    ) );
    
}
add_action( 'init', 'bokez_init_block_divider' );

/**
 * Server-side Rendering
 */
function bokez_render_block_divider( $attributes ) {
    return <<<HTML
    <div class="bokez-block bokez-divider" style="text-align: {$attributes['alignment']};" >
        <span style="width: {$attributes['width']}%; border-width:{$attributes['borderSize']}px; border-color: {$attributes['borderColor']}; border-style: {$attributes['borderType']};"></span>
    </div>
HTML;
}
