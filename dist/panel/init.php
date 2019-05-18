<?php 

function bokez_save_admin_settings(){
    if( ! isset( $_POST['bokez-submit'] ) ) return;
    if( ! current_user_can('level_8') ) return;
    if ( ! wp_verify_nonce( $_POST['nonce'], 'bokez-admin-settings' ) ) return;

    foreach ( $_POST as $key => $value ) {
        update_option( 'bokez_' . sanitize_text_field($key), sanitize_text_field($value) );
    }
}

/**
 * Admin Page
 */
function bokez_admin_menu() {

    bokez_save_admin_settings();
    
	add_menu_page( 'Bokez', 'Bokez Blocks', 'manage_options', 'bokez_admin_page', 'bokez_admin_page', 'dashicons-layout', 200  );
}
add_action( 'admin_menu', 'bokez_admin_menu' );

/**
 * Render the admin page
 */
function bokez_admin_page(){
    require_once __DIR__ . '/view.php';
}

/**
 * Assets
 */
function bokez_admin_page_assets( $key ) {
    
    if( $key !== 'toplevel_page_bokez_admin_page' ) return;

    wp_enqueue_style( 'bokez-admin-page', BOKEZ_URL . 'dist/panel/style.css', array(), BOKEZ_VERSION );

    wp_enqueue_script( 'bokez-admin-page', BOKEZ_URL . 'dist/panel/script.js', array('jquery'), BOKEZ_VERSION, true );

}
add_action('admin_enqueue_scripts', 'bokez_admin_page_assets');
