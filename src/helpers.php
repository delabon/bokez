<?php 

/**
 * Dumper ( debuging )
 *
 * @param any $data
 * @param boolean $die
 * @return void
 */
function bokez_dump( $data, $die = true ){

    echo '<pre>';
    print_r( $data );
    echo '</pre>';

    if( $die ) die;

}

/**
 * Get current url
 *
 * @return string
 */
function bokez_current_url(){

    $url = isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http';
    $url .= '://'.$_SERVER['HTTP_HOST'];
    //$url .= in_array($_SERVER['SERVER_PORT'], array('80', '443')) ? '' : ':'.$_SERVER['SERVER_PORT'];
    $url .= $_SERVER['REQUEST_URI'];    

    return $url;
}
