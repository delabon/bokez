<div class="wrap">
    
    <div class="bokez-header">
        <h1>Bokez - Page Builder (<?php echo BOKEZ_VERSION ?>)</h1>

        <nav class="nav-tab-wrapper bokez-nav-tab-wrapper">
            <a data-page="getting-started" href="#" class="nav-tab nav-tab-active"><?php _e('Getting Started', 'bokez'); ?></a>
            <a data-page="general-settings" href="#" class="nav-tab"><?php _e('General Settings', 'bokez'); ?></a>
            <a data-page="changes-log" href="#" class="nav-tab "><?php _e('Changes Log', 'bokez'); ?></a>
            <a href="http://bit.ly/bokez_demo" target="_blank" class="nav-tab "><?php _e('Available Blocks', 'bokez'); ?></a>
            <a href="http://bit.ly/2N85EhI" target="_blank" class="nav-tab "><?php _e('Get More Plugins', 'bokez'); ?></a>
        </nav>
    </div>

    <div class="bokez-page _open_" data-page="getting-started">
        <div class="bokez-page-content">

            <h2><?php _e('Getting Started', 'bokez'); ?></h2>

            <p class="bokez-hero">
                <?php _e('Bokez is an awesome collection of blocks which made for the new Gutenberg Editor by 
                    <a href="http://bit.ly/2GJw1tf">Delabon</a>.
                    With Bokez you get your essential blocks, customization options and more.', 'bokez'); ?>                
            </p>

            <ul class="bokez-tabs">

                <li class="_open_">
                    <a href="#"><?php _e('What is Gutenberg?', 'bokez'); ?></a>
                    <div class="bokez-tabs-content">

                        <p>
                            <?php _e('Gutenberg is the new Wordpress Editor. it is built to simplify the creation of pages 
                            and posts by replacing shortcodes and custom HTML by Blocks.', 'bokez'); ?>
                        </p>

                        <img src="<?php echo BOKEZ_URL; ?>dist/panel/img/gutenberg.png" alt="">

                    </div>
                </li>
                
                <li>
                    <a href="#"><?php _e('What are Blocks?', 'bokez'); ?></a>
                    <div class="bokez-tabs-content">
                        <p>
                            <?php _e('Anything you insert into the new editor from a simple Paragraph to a Video or 
                            Cover is a gutenberg block.', 'bokez'); ?>
                        </p>

                        <img src="<?php echo BOKEZ_URL; ?>dist/panel/img/blocks.png" alt="">

                    </div>

                </li>

                <li>
                    <a href="#"><?php _e('How to Add Your First Block?', 'bokez'); ?></a>

                    <div class="bokez-tabs-content">

                        <p>
                            <?php _e('First, You need to create a new post ( or page ) by going to Posts > Add New.', 'bokez'); ?>  
                        </p>

                        <img src="<?php echo BOKEZ_URL; ?>dist/panel/img/adding-new-post.png" alt="">

                        <br>
                        <p>
                            <?php _e('Then, Click on the plus (+) icon and scroll down to "Bokez" section and select a block.', 'bokez'); ?>
                        </p>
                        <img src="<?php echo BOKEZ_URL; ?>dist/panel/img/adding-new-block.png" alt="">

                        <br>
                        <p>
                            <?php _e('In this example we have selected a blockquote block, so click on the block and start editing the text.', 'bokez'); ?>
                        </p>

                        <img src="<?php echo BOKEZ_URL; ?>dist/panel/img/blockquote-block.png" alt="">

                    </div>
                </li>


                <li>
                    <a href="#"><?php _e('Block Settings', 'bokez'); ?></a>

                    <div class="bokez-tabs-content">
                        <p>
                            <?php _e('Let\'s say that we want to change our blockquote border color. 
                            So in order to do that we need to click on the block and a sidebar panel will be shown. That sidebar panel is called The Inspector.', 'bokez'); ?>
                            <br>
                            <?php _e('Within that inspector, you will find the block settings.', 'bokez'); ?>
                        </p>
                        <img src="<?php echo BOKEZ_URL; ?>dist/panel/img/block-settings.png" alt="">

                    </div>
                </li>
            
            </ul>

        </div>
    </div>

    <div class="bokez-page" data-page="general-settings">
        <div class="bokez-page-content">

            <h2><?php _e('General Settings', 'bokez'); ?></h2>

            <form method="POST">

                <label>
                
                    <h4><?php _e('Max Width','bokez'); ?></h4>

                    <input type="text" name="max_width" value="<?php echo get_option('bokez_max_width', '100%');?>" >

                    <br>

                    <span><?php _e('If you do not know what you are doing, please leave it 100%', 'bokez') ?></span>

                </label>

                <br>
                <br>

                <input type="hidden" name="nonce" value="<?php echo wp_create_nonce('bokez-admin-settings');?>" >

                <button name="bokez-submit" value="processing" class="button button-primary"><?php _e('Save','bokez'); ?></button>

            </form>

        </div>
    </div>

    <div class="bokez-page" data-page="changes-log">
        <div class="bokez-page-content">

            <h2>Changes Log</h2>

            <?php

            $changes_log = file_get_contents( __DIR__ . '/../../readme.txt' );
            $changes_log = preg_replace( '/.*== Changelog ==/is', '', $changes_log );
            echo nl2br( $changes_log );

            ?>
        </div>
    </div>

</div>