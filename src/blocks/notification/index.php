<?php

/**
 * Registers the block
 */
function bokez_init_block_notification(){
    
	register_block_type( 'bokez/notification', array(
        'attributes' => array(
            
            'message' => array(
                'type' => 'string',
                'default' => 'This is an informational alert, have fun editing it.',
            ),

            'type' => array(
                'type' => 'string',
                'default' => 'warning',
            ),

            'alignment' => array(
                'type' => 'string',
                'default' => ''
            ),

            'backgroundColor' => array(
                'type' => 'string',
                'default' => '',
            ),

            'textColor' => array(
                'type' => 'string',
                'default' => '',
            ),

            'borderRadius' => array(
                'type' => 'string',
                'default' => '0',
            ),

            'dismissible' => array(
                'type' => 'boolean',
                'default' => false
            ),
            
            'uid' => array(
                'type' => 'string',
                'default' => ''
            ),

        ),
		'render_callback' => 'bokez_render_block_notification',
    ) );
    
}
add_action( 'init', 'bokez_init_block_notification' );

/**
 * Server-side Rendering
 */
function bokez_render_block_notification( $atts ) {

    $dismissible_markup = '';

    if( $atts['dismissible'] ){
        $dismissible_markup = <<<HTML
        <span class="bokez-notification-close">
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox ="0 0 24 24" width="12" height="12" >
                <path fill ="{$atts['textColor']}" d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
            </svg>
        </span>            
HTML;
    }

    return <<<HTML
    <div id="{$atts['uid']}" class="bokez-block bokez-notification bokez-notification-{$atts['type']} dismissible-{$atts['dismissible']}" style="text-align:{$atts['alignment']}; background-color:{$atts['backgroundColor']};" >
        {$dismissible_markup}
        <p style="color:{$atts['textColor']};">{$atts['message']}</p>
    </div>
HTML;
}
