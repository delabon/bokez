// Import JS
import { QuoteIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/blockquote', {
    
    title: __( 'Blockquote' , 'bokez'),
    
    description: __('Add quoted text', 'bokez'),
    
    keywords: [__('blockquote', 'bokez'), __('quote', 'bokez'), __('block', 'bokez') ],
    
    icon: QuoteIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },

    edit: Edit,
    
    save: () => null,

});
