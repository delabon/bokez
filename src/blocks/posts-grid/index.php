<?php

/**
 * Posts Grid Block
 * Server-side Rendering
 */
function bokez_render_block_posts_grid( $attributes ) {
        
	$recent_posts = wp_get_recent_posts( array(
        'numberposts' => $attributes['postsNumber'],
        'post_status' => 'publish',
		'category' => $attributes['category'],
    ), 'OBJECT' );
	
	if ( count( $recent_posts ) === 0 ) {
        return 'No posts';
    }
	
	$output = '';
    $post_thumb_size = 'bokez-posts-grid';

    if( $attributes['columns'] == 1 ){
        $post_thumb_size = 'original';
    }

    foreach( $recent_posts as $post ){

        $post_thumb_id = get_post_thumbnail_id( $post->ID );
        $post_thumb_class = '';
        $thumbnail = '';
        $date = '';

		if ( $post_thumb_id ) {
            $post_thumb_class = '_has_thumbnail_bokez';
            
            $thumbnail = '
                <div class="_entry_thumbnail_bokez">
                    <a href="'.esc_url( get_permalink( $post->ID ) ).'" rel="bookmark">
                        '.wp_get_attachment_image( $post_thumb_id, $post_thumb_size ).'
                    </a>
                </div>';
		}
    
        $post_title = '
            <h3>
                <a href="' .esc_url( get_permalink( $post->ID ) ). '">' .esc_html( get_the_title( $post->ID ) ). '</a>
            </h3>';

        $date = '<div class="_entry_meta_bokez">' .get_the_date( '', $post->ID ). '</div>';

        $output .= '
            <div class="_entry_bokez ' .$post_thumb_class. '" >
                '.$thumbnail.'
                <div class="_entry_content_bokez" style="background-color:'.$attributes['bgColor'].'; color:'.$attributes['textColor'].';">
                    '.$date.'
                    '.$post_title.'
                </div>
            </div>';

    }
	
	return sprintf(
        '<div class="bokez-block bokez-posts-grid" data-items="%2$s">%1$s</div>',
        $output,
        $attributes['columns']
    );
}

function bokez_init_block_posts_grid(){

	// Check if the register function exists
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
    }
    
	register_block_type( 'bokez/posts-grid', array(
        'attributes' => array(
            'postsNumber' => array(
                'type' => 'number',
                'default' => 3
            ),
            'columns' => array(
                'type' => 'number',
                'default' => 3
            ),
            'category' => array(
                'type' => 'number',
                'default' => 0
            ),
            'bgColor' => array(
                'type' => 'string',
                'default' => ''
            ),
            'textColor' => array(
                'type' => 'string',
                'default' => ''
            ),
        ),
		'render_callback' => 'bokez_render_block_posts_grid',
    ) );
    
}
add_action( 'init', 'bokez_init_block_posts_grid' );


/**
 * Create API fields for additional post info
 */
function bokez_posts_grid_register_rest_fields() {

	register_rest_field(
		'post',
		'featured_image_src',
		array(
			'get_callback' => 'bokez_posts_grid_get_image_src_square',
			'update_callback' => null,
			'schema' => null,
		)
    );
    
	register_rest_field(
		'post',
		'date_formated',
		array(
			'get_callback' => 'bokez_posts_grid_get_date_formated',
			'update_callback' => null,
			'schema' => null,
		)
	);
    
}
add_action( 'rest_api_init', 'bokez_posts_grid_register_rest_fields' );

/**
 * Get featured image source for the rest field
 */
function bokez_posts_grid_get_image_src_square( $object, $field_name, $request ) {
	$img_array = wp_get_attachment_image_src(
		$object['featured_media'],
		'bokez-posts-grid',
		false
	);
	return $img_array[0];
}

/**
 * Get formated date for the rest field
 */
function bokez_posts_grid_get_date_formated( $object, $field_name, $request ) {
    
    $date = new DateTime( $object['date'] );

	return $date->format( get_option('date_format') );
}

/**
 * Image Sizes
 */
function bokez_posts_grid_image_sizes(){
	add_theme_support( 'post-thumbnails' );
	add_image_size( 'bokez-posts-grid', '656', '456', true );
}
add_action( 'after_setup_theme', 'bokez_posts_grid_image_sizes' );
