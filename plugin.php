<?php
/**
 * Plugin Name: Bokez - Page Builder ( Gutenberg Blocks )
 * Plugin URI: https://wordpress.org/plugins/bokez-awesome-gutenberg-blocks/
 * Description: A beautiful and customizable collection of gutenberg blocks, to build professional website with ease.
 * Author: Sabri Taieb
 * Author URI: https://delabon.com/
 * Version: 2.1.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Bokez
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'BOKEZ_VERSION', '2.1.0' );
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
 * Load Translation
 */
add_action( 'plugins_loaded', function(){
    load_plugin_textdomain( 'bokez', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );
});

/**
 * Plugin Activation
 * Add a check for our plugin before redirecting
 */
register_activation_hook(__FILE__, function() {
    add_option( 'bokez_do_activation_redirect', true );
});

/**
 * Redirect to the Bokez admin page on single plugin activation
 */
add_action( 'admin_init', function() {
    
    if ( get_option( 'bokez_do_activation_redirect', false ) ) {

        delete_option( 'bokez_do_activation_redirect' );
    
        if( ! isset( $_GET['activate-multi'] ) ) {

            wp_redirect( "admin.php?page=bokez_admin_page" );
        
        }
    }
} );

/**
 * Admin Notices
 */
add_action( 'admin_notices', function() {
    
    $transient = get_transient( 'bokez_banner' );
  
    if( $transient ) return;

    ?>
        <div class="bokez-notice">

            <a href="<?php echo admin_url('plugin-install.php?s=sogrid&tab=search&type=term'); ?>" >
                <img src="<?php echo BOKEZ_URL; ?>/dist/img/banner-1024.jpg" alt="" >
            </a>

            <button class="bokez-notice-close">&times;</button>
        </div>
    <?php
});

/**
 * Ajax :: Hide Banner
 */
add_action('wp_ajax_bokez_banner_hide', function(){
    set_transient( 'bokez_banner', true, WEEK_IN_SECONDS );
    die;
});
