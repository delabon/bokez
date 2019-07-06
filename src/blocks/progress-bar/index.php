<?php

/**
 * Registers the block
 */
function bokez_init_block_progress_bar(){
    
	register_block_type( 'bokez/progress-bar', array(
        'attributes' => array(
            
            'progress' => array(
                'type' => 'string',
                'default' => '50%'
            ),

            'backgroundColor' => array(
                'type' => 'string',
                'default' => '#f5f5f5'
            ),

            'progressColor' => array(
                'type' => 'string',
                'default' => 'rgb(23,44,60)'
            ),

            'tooltipColor' => array(
                'type' => 'string',
                'default' => 'rgb(23,44,66)'
            ),

            'tooltipBackgroundColor' => array(
                'type' => 'string',
                'default' => '#eebf3f'
            ),


        ),
		'render_callback' => 'bokez_render_block_progress_bar',
    ) );
    
}
add_action( 'init', 'bokez_init_block_progress_bar' );

/**
 * Server-side Rendering
 */
function bokez_render_block_progress_bar( $attributes ) {
    return <<<HTML
    <div class="bokez-block bokez-progress-bar-wrapper" >
                
        <div class="bokez-progress-bar" style="background-color: {$attributes['backgroundColor']};" >
        
            <div class="bokez-progress-bar-progress" style="background-color: {$attributes['progressColor']}; width: {$attributes['progress']};" >
                
                <div class="bokez-progress-bar-tooltip" style="background-color: {$attributes['tooltipBackgroundColor']}; color: {$attributes['tooltipColor']};">
                    {$attributes['progress']}
                    <span style="border-top-color: {$attributes['tooltipBackgroundColor']};" ></span>
                </div>
            
            </div>  
        
        </div>

    </div>
HTML;
}
