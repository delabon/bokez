<?php

/**
 * Registers the block
 */
function bokez_init_block_faq(){
    
	register_block_type( 'bokez/faq', array(
        'attributes' => array(
            
            'items' => array(
                'type' => 'array',
                'default' => array(
                    array(
                        'header' => 'Header 1',
                        'body' => 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
                    ),
                    array(
                        'header' => 'Header 2',
                        'body' => 'Body 2',
                    )
                ),
            ),
            
            'itemsJson' => array(
                'type' => 'string',
                'default' => json_encode(array(
                    array(
                        'header' => 'Header 1',
                        'body' => 'Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.',
                    ),
                    array(
                        'header' => 'Header 2',
                        'body' => 'Body 2',
                    )
                ))
            ),

            'alignment' => array(
                'type' => 'string',
                'default' => '',
            ),
            
            'headerTextColor' => array(
                'type' => 'string',
                'default' => ''
            ),  
        
            'headerBgColor' => array(
                'type' => 'string',
                'default' => ''
            ),
        
            'bodyTextColor' => array(
                'type' => 'string',
                'default' => ''
            ),
        
            'bodyBgColor' => array(
                'type' => 'string',
                'default' => ''
            ),

        ),
		'render_callback' => 'bokez_render_block_faq',
    ) );
    
}
add_action( 'init', 'bokez_init_block_faq' );

/**
 * Server-side Rendering
 */
function bokez_render_block_faq( $attributes ) {

    $rows =  json_decode( $attributes['itemsJson'], true );
    $rows_markup = '';
    $iii = 0;

    foreach( $rows as $item ){
        $rows_markup .= <<<HTML
        <div data-id="{$iii}" class="bokez-block bokez-accordion-item" >

            <span style="background-color:{$attributes['headerBgColor']}; color:{$attributes['headerTextColor']};" class="_item_header_bokez">
                {$item['header']}
            </span>

            <p class="_item_body_bokez" style="background-color: {$attributes['bodyBgColor']}; color:{$attributes['bodyTextColor']};">
                {$item['body']}
            </p>

        </div>
HTML;

        $iii += 1;
    }
    
    return <<<HTML
    <div class="bokez-block bokez-accordion bokez-accordion-{$attributes['alignment']}" style="text-align:{$attributes['alignment']};">
        {$rows_markup}
    </div>
HTML;
}
