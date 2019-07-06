<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Load Blocks
require_once __DIR__ . '/../src/blocks/blockquote/index.php';
require_once __DIR__ . '/../src/blocks/button/index.php';
require_once __DIR__ . '/../src/blocks/cover/index.php';
require_once __DIR__ . '/../src/blocks/divider/index.php';
require_once __DIR__ . '/../src/blocks/faq/index.php';
require_once __DIR__ . '/../src/blocks/notification/index.php';
require_once __DIR__ . '/../src/blocks/posts-grid/index.php';
require_once __DIR__ . '/../src/blocks/pricing-table/index.php';
require_once __DIR__ . '/../src/blocks/profile/index.php';
require_once __DIR__ . '/../src/blocks/progress-bar/index.php';
require_once __DIR__ . '/../src/blocks/separator-heading/index.php';
require_once __DIR__ . '/../src/blocks/share/index.php';
require_once __DIR__ . '/../src/blocks/testimonial/index.php';
require_once __DIR__ . '/../src/blocks/video-popup/index.php';
require_once __DIR__ . '/../src/blocks/section/index.php';
require_once __DIR__ . '/../src/blocks/column/index.php';


/**
 * Enqueue Gutenberg block assets for both frontend and backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * 
 * @since 1.0.0
 */
function bokez_gutenberg_cgb_block_assets() {
	
	if( ! is_admin() ){

		// Styles.
		wp_enqueue_style(
			'bokez_frontend', 
			plugins_url( 'dist/style.build.css', dirname( __FILE__ ) ),
			array(), 
			BOKEZ_VERSION
		);

		wp_add_inline_style( 'bokez_frontend', "
		
			.bokez-row .bokez-row-container{
				max-width: ".get_option('bokez_max_width', '100%')." !important;
			}
			
		" );

		// Scripts.
		wp_enqueue_script(
			'bokez_frontend', 
			plugins_url( '/dist/frontend.build.js', dirname( __FILE__ ) ), 
			array( 'jquery' ), 
			BOKEZ_VERSION,
			true 
		);

	}

}
add_action( 'enqueue_block_assets', 'bokez_gutenberg_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function bokez_gutenberg_cgb_editor_assets() {

	$block_dependencies = array(
		'wp-compose',
		'wp-blocks',
		'wp-i18n',
		'wp-element',
		'wp-editor',
		'wp-api-fetch',
		'wp-components',
		'wp-data',
		'wp-url',
		'lodash',
	);

	// Scripts.
	wp_enqueue_script(
		'bokez_editor', 
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), 
		$block_dependencies, 
		BOKEZ_VERSION,		
		true 
	);

	// Styles.
	wp_enqueue_style(
		'bokez_editor', 
		plugins_url( 'dist/editor.build.css', dirname( __FILE__ ) ), 
		array( 'wp-edit-blocks' ), 
		BOKEZ_VERSION
	);

}
add_action( 'enqueue_block_editor_assets', 'bokez_gutenberg_cgb_editor_assets' );

/**
 * Register A Block Categories
 * @since 1.5.0
 */
function bokez_gutenberg_block_categories( $categories, $post ) {
	return array_merge(
        $categories,
        array(
            array(
                'slug' => 'bokez',
                'title' => 'Bokez',
            ),
        )
    );
}
add_filter( 'block_categories', 'bokez_gutenberg_block_categories', 10, 2 );
