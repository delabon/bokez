<?php
/**
 * Plugin Name: Bokez - Page Builder ( Gutenberg Blocks )
 * Plugin URI: https://wordpress.org/plugins/bokez-awesome-gutenberg-blocks/
 * Description: A beautiful and customizable collection of gutenberg blocks, to build professional website with ease.
 * Author: Delabon Plugins
 * Author URI: https://delabon.com/
 * Version: 2.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Bokez
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'BOKEZ_VERSION', '2.0.0' );
define( 'BOKEZ_PATH', plugin_dir_path( __FILE__ ) );
define( 'BOKEZ_URL', plugin_dir_url( __FILE__ ) );

/**
 * Block Initializer.
 */
require_once BOKEZ_PATH . 'dist/init.php';

/**
 * Admin Page
 */
require_once BOKEZ_PATH . 'dist/panel/init.php';

/**
 * Plugin Activation
 * Add a check for our plugin before redirecting
 */
function bokez_activation() {
    add_option( 'bokez_do_activation_redirect', true );
}
register_activation_hook(__FILE__, 'bokez_activation');

/**
 * Redirect to the Bokez admin page on single plugin activation
 */
function bokez_activation_redirect() {
    
    if ( get_option( 'bokez_do_activation_redirect', false ) ) {

        delete_option( 'bokez_do_activation_redirect' );
    
        if( ! isset( $_GET['activate-multi'] ) ) {

            wp_redirect( "admin.php?page=bokez_admin_page" );
        
        }
    }
}
add_action( 'admin_init', 'bokez_activation_redirect' );
