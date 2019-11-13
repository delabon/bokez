<?php
/**
 * Plugin Name: Bokez - Wordpress 5 Blocks
 * Plugin URI: https://wordpress.org/plugins/bokez-awesome-gutenberg-blocks/
 * Description: A beautiful and customizable collection of gutenberg blocks, to build professional website with ease.
 * Author: Sabri Taieb
 * Author URI: https://delabon.com/
 * Version: 2.2.1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package Bokez
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'BOKEZ_VERSION', '2.2.1' );
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

/**
 * Shows the review and upgrade notices for the admin
 */
add_action( 'admin_notices', function() {

    if( get_transient('bokez_hide_notices') ) return;
    if( get_transient('bokez_hide_review_notice') ) return;

    $url_hide_notices = add_query_arg( 'bokez_hide_notices', 'true', bokez_current_url() );
    $url_review_notice = add_query_arg( 'bokez_hide_review_notice', 'true', bokez_current_url() );

    ?>
        <div class="notice notice-warning">

            <p style="font-size: 15px;">

                <?php _e("Hi there! you have been using <strong>Bokez</strong> for few days. I hope it is helpful.", 'bokez'); ?>
                <br>
                <?php _e("Would you mind give it 5-stars review to help spread the word? And to keep me updating it & adding more features to it!", 'bokez' ); ?>

            </p>

            <p>
                <a class="button button-primary" href="<?php echo $url_review_notice; ?>"><?php _e('Give it 5-stars', 'bokez'); ?></a>
                <a class="button" href="<?php echo $url_hide_notices; ?>"><?php _e('Thanks, later', 'bokez') ?></a>
            </p>

        </div>
    <?php

} );

/**
 * Hide admin notices
 */
add_action( 'admin_init', function () {

    if( isset( $_REQUEST['bokez_hide_notices'] ) ){
        set_transient('bokez_hide_notices', 1, 5 * DAY_IN_SECONDS );
    }

    if( isset( $_REQUEST['bokez_hide_review_notice'] ) ){
        set_transient('bokez_hide_review_notice', 1, 30 * DAY_IN_SECONDS );

        echo '<script>location.href = "https://wordpress.org/support/plugin/bokez-awesome-gutenberg-blocks/reviews/?rate=5#rate-response";</script>';
    }
} );
