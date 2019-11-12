<?php

/**
 * Registers the block
 */
function bokez_init_block_share(){
    
	register_block_type( 'bokez/share', array(
        'attributes' => array(

            'show_facebook' => array(
                'type' => 'boolean',
                'default' => true,
            ),
    
            'show_twitter' => array(
                'type' => 'boolean',
                'default' => true,
            ),
    
            'show_reddit' => array(
                'type' => 'boolean',
                'default' => true,
            ),
    
            'show_linkedin' => array(
                'type' => 'boolean',
                'default' => true,
            ),
    
            'show_email' => array(
                'type' => 'boolean',
                'default' => true,
            ),
    
            'alignment' => array(
                'type' => 'string',
                'default' => 'center'
            ),
    
            'bgColor' => array(
                'type' => 'string',
                'default' => ''
            ),
    
            'iconColor' => array(
                'type' => 'string',
                'default' => ''
            ),

        ),
		'render_callback' => 'bokez_render_block_share',
    ) );
    
}
add_action( 'init', 'bokez_init_block_share' );

/**
 * Returns Item markup
 *  
 * @param array $attributes
 * @param string $slug
 * @param string $tooltip_text
 * @param string $svg_content
 * @return string
 */
function bokez_share_item( $attributes, $slug, $tooltip_text, $svg_content ){

    if( ! $attributes[ 'show_' . $slug ] ) return '';

    return <<<HTML
    <a href="javascript:void(0)" class="bokez-share-{$slug}" style="background-color: {$attributes['bgColor']};">
        <span class="bokez-share-tooltip" >
            {$tooltip_text}
        </span>
    
        <svg class="dashicon" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="{$attributes['iconColor']}" d="{$svg_content}"/>
        </svg>
    </a>
HTML;
}

/**
 * Server-side Rendering
 */
function bokez_render_block_share( $attributes ) {

    $css_justify_content = 'center';

    if( $attributes['alignment'] === 'left' ){
        $css_justify_content = 'center';
    }
    elseif( $attributes['alignment'] === 'right' ){
        $css_justify_content = 'flex-end';
    }

    $fb_markup = bokez_share_item( $attributes, 'facebook', __('Share on Facebook','bokez', 'bokez'), 'M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z' );
    $twitter_markup = bokez_share_item( $attributes, 'twitter', __('Share on Twitter','bokez', 'bokez'), 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' );
    $reddit_markup = bokez_share_item( $attributes, 'reddit', __('Share on Reddit','bokez', 'bokez'), 'M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z' );
    $linkedin_markup = bokez_share_item( $attributes, 'linkedin', __('Share on Linkedin','bokez', 'bokez'), 'M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z' );
    $email_markup = bokez_share_item( $attributes, 'email', __('Share by Email','bokez', 'bokez'), 'M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z' );

    return <<<HTML
    <div class="bokez-block bokez-share" style="justify-content: {$css_justify_content};" >
        {$fb_markup}
        {$twitter_markup}
        {$reddit_markup}
        {$linkedin_markup}
        {$email_markup}
    </div>
HTML;
}
