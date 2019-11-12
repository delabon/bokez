//  Import JS.
import { Edit } from './edit'
import { ShareIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/share', {
    
    title: __( 'Share' , 'bokez'),
    
    description: __('Make your visitors share your content.', 'bokez'),
    
    keywords: [__('share', 'bokez'), __('facebook', 'bokez'), __('social', 'bokez')],
    
    icon: ShareIcon,
    
    category: 'bokez',
    
    supports: {
        html: false
    },
    
    edit: Edit,
    
    save: () => null,
});
