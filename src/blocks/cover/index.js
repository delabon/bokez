// Import JS
import { Edit } from './edit';
import { CoverIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'bokez/cover-1', {
    
    title: __( 'Cover One' , 'bokez'),
    
    description: __('Call to action or Cover ? We got you covered...', 'bokez'),
    
    keywords: [__('call to action', 'bokez'), __('cover', 'bokez'), __('header', 'bokez')],
    
    icon: CoverIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },

    edit: Edit,
    
    save: () => null,
});
