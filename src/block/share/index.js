//  Import JS.
import { Edit, justifyContent } from './edit'
import { ShareIcon, FacebookIcon, TwitterIcon, GooglePlusIcon, RedditIcon, LinkedinIcon, EmailIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/share', {
    
    title: __( 'Share' ),
    
    description: __('Make your visitors share your content.'),
    
    keywords: [__('share'), __('facebook'), __('twitter')],
    
    icon: ShareIcon,
    
    category: 'bokez',
    
    supports: {
        html: false
    },
    
    edit: Edit,
    
    save: () => null,
});
