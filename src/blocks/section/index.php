<?php

/**
 * Registers the block
 */
function bokez_init_block_section(){
    
	register_block_type( 'bokez/section', array(
        'attributes' => array(
            
            'uid' => array(
                'type' => 'string',
                'default' => ''
            ),
    
            'alignment' => array(
                'type' => 'string',
                'default' => 'center'
            ),
            
            'desktopLayout' => array(
                'type' => 'string',
            ),
    
            'desktopColumns'  => array(
                'type' => 'number',
                'default' => 0
            ),
    
            'tabletLayout' => array(
                'type' => 'string',
                'default' => 'equal'
            ),
    
            'tabletColumns'  => array(
                'type' => 'number',
                'default' => 1
            ),    

            'mobileLayout' => array(
                'type' => 'string',
                'default' => 'equal'
            ),
    
            'mobileColumns' => array(
                'type' => 'number',
                'default' => 1
            ),
    
            'column_gutter' => array(
                'type' => 'string',
                'default' => "30"
            ),
    
            'paddingTop' => array(
                'type' => 'number',
                'default' => 2
            ),
    
            'paddingBottom' => array(
                'type' => 'number',
                'default' => 2
            ),
    
            'marginTop' => array(
                'type' => 'number',
                'default' => 0
            ),
    
            'marginBottom' => array(
                'type' => 'number',
                'default' => 0
            ),
    
            'currentTab' => array(
                'type' => 'string',
                'default' => 'desktop'
            ),
    
            'background_type' => array(
                'type' => 'string',
                'default' => 'color',
            ),
    
            'background_color' => array(
                'type' => 'string',
                'default' => 'transparent',
            ),
    
            'gradient_orientation' => array(
                'type' => 'string',
                'default' => 'to right top',
            ),
    
            'gradient_from' => array(
                'type' => 'string',
                'default' => '#051937',
            ),
    
            'gradient_to' => array(
                'type' => 'string',
                'default' => '#00b894',
            ),
    
            'background_image_url' => array(
                'type' => 'string',
                'default' => '',
            ),
    
            'background_image_id' => array(
                'type' => 'number',
                'default' => 0,
            ),
    
            'background_image_size' => array(
                'type' => 'string',
                'default' => 'cover',
            ),
    
            'background_image_position' => array(
                'type' => 'string',
                'default' => 'center center',
            ),
    
            'background_image_repeat' => array(
                'type' => 'string',
                'default' => 'no-repeat',
            ),
    
            'background_image_attachment' => array(
                'type' => 'string',
                'default' => 'scroll',
            ),

            'text_color' => array(
                'type' => 'string',
                'default' => '#202020',
            ),

            'link_color' => array(
                'type' => 'string',
                'default' => 'blue',
            ),

            'link_color_hover' => array(
                'type' => 'string',
                'default' => 'darkblue',
            ),
    
        ),
		'render_callback' => 'bokez_render_block_section',
    ) );
    
}
add_action( 'init', 'bokez_init_block_section' );


/**
 * Renders the block style
 * @param {array} attributes 
 */
function bokez_render_style_section( $attributes ){

    extract( $attributes);

    $paddingTop = $paddingTop / 5;
    $paddingBottom = $paddingBottom / 5;
    $marginTop = $marginTop / 5;
    $marginBottom = $marginBottom / 5;
    $gradient_orientation = str_replace( '-', ' ', $gradient_orientation );

    $output = "
        
        #{$uid}.bokez-row{
            background-color: {$background_color};
            padding-top: {$paddingTop}em;
            padding-bottom: {$paddingBottom}em;
            margin-top: {$marginTop}em;
            margin-bottom: {$marginBottom}em;
            color: {$attributes['text_color']};
        }

        #{$uid}.bokez-row a{
            color: {$attributes['link_color']};
        }

        #{$uid}.bokez-row a:hover{
            color: {$attributes['link_color_hover']};
        }

    ";

    if( $background_type === 'gradient' ){
        $output .= "
            #{$uid}.bokez-row{
                background-image: linear-gradient( {$gradient_orientation}, {$gradient_from}, {$gradient_to} );
            }
        ";
    }

    else if( $background_type === 'image' ){
        $output .= "
            #{$uid}.bokez-row{
                background-image: url('$background_image_url');
                background-repeat: {$background_image_repeat};
                background-attachment: {$background_image_attachment};
                background-size: {$background_image_size};
                background-position: {$background_image_position};
            }
        ";
    }

    return $output;
}


/**
 * Server-side Rendering
 */
function bokez_render_block_section( $attributes, $content = "" ) {
    
    $style = bokez_render_style_section( $attributes );

    return <<<HTML
        <style>{$style}</style>
        <div id="{$attributes['uid']}" class="bokez-row bokez-row-gutter-{$attributes['column_gutter']} bokez-row-mobile-{$attributes['mobileLayout']} bokez-row-tablet-{$attributes['tabletLayout']} bokez-row-desktop-{$attributes['desktopLayout']} bokez-row-mobile-{$attributes['mobileColumns']} bokez-row-tablet-{$attributes['tabletColumns']} bokez-row-desktop-{$attributes['desktopColumns']}">
            <div class="bokez-row-container">{$content}</div>
        </div>
HTML;
}
