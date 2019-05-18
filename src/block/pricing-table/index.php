<?php

/**
 * Registers the block
 */
function bokez_init_block_pricing_table(){
    
	register_block_type( 'bokez/pricing-table', array(
        'attributes' => array(
            
            'ID' => array(
                'type' => 'string',
                'default' => '',
            ),

            'imageUrl' => array(
                'type' => 'string',
                'default' => '',
            ),

            'imageID' => array(
                'type' => 'number',
                'default' => 0,
            ),

            'header' => array(
                'type' => 'string',
                'default' => 'Small Team',
            ),

            'features'  => array(
                'type' => 'string',
                'default' => '
                    <li>Custom Domains</li> 
                    <li>5 Users</li>
                    <li>10 Projects</li>
                ',
            ),

            'price' => array(
                'type' => 'string',
                'default' => '$49',
            ),

            'buttonName' => array(
                'type' => 'string',
                'default' => 'Free Trial',
            ),

            'buttonUrl' => array(
                'type' => 'string',
                'default' => 'https://delabon.com/',
            ),
            
            'backgroundColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'titleColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'featuresColor' => array(
                'type' => 'string',
                'default' => '',
            ),
            
            'priceColor' => array(
                'type' => 'string',
                'default' => '',
            ),
            
            'buttonColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'buttonBGColor' => array(
                'type' => 'string',
                'default' => '',
            ),
        
            'buttonColorHover' => array(
                'type' => 'string',
                'default' => '',
            ),

        ),
		'render_callback' => 'bokez_render_block_pricing_table',
    ) );
    
}
add_action( 'init', 'bokez_init_block_pricing_table' );

/**
 * Server-side Rendering
 */
function bokez_render_block_pricing_table( $attributes ) {

    $image_markup = '';

    if( $attributes['imageUrl'] ){
        $image_markup .= <<<HTML
        <div class="_item_avatar_wrapper_bokez" >
            <div class="_item_avatar_bokez" >
                <img src ="{$attributes['imageUrl']}" />
            </div>
        </div>
HTML;
    }

    return <<<HTML
    <style>
        #{$attributes['ID']} ._item_bokez {
            background-color: {$attributes['backgroundColor']};
        }

        #{$attributes['ID']} ._item_header_bokez {
            color: {$attributes['titleColor']};
        }

        #{$attributes['ID']} ._item_features_bokez {
            color: {$attributes['featuresColor']};
        }

        #{$attributes['ID']} ._item_features_bokez li {
            border-color: {$attributes['featuresColor']};
        }

        #{$attributes['ID']} ._item_price_bokez {
            color: {$attributes['priceColor']};
        }

        #{$attributes['ID']} ._item_button_bokez {
            color: {$attributes['buttonColor']};
            border-color: {$attributes['buttonColor']};
        }

        #{$attributes['ID']} ._item_button_bokez:hover {
            background-color: {$attributes['buttonBGColor']};
            border-color: {$attributes['buttonBGColor']};
            color: {$attributes['buttonColorHover']};
        }
    </style>

    <div id="{$attributes['ID']}" class="bokez-block bokez-pricing-table">
        <div class="_item_bokez" >
            
            {$image_markup}
    
            <h3 class="_item_header_bokez">{$attributes['header']}</h3>

            <ul class="_item_features_bokez">{$attributes['features']}</ul>

            <span class="_item_price_bokez">{$attributes['price']}</span>

            <a class="_item_button_bokez" href="{$attributes['buttonUrl']}">{$attributes['buttonName']}</a>
    
        </div>
    </div>
HTML;
}
