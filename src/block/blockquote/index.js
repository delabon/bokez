// Import JS
import { QuoteIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/blockquote', {
    
    title: __( 'Blockquote' ),
    
    description: __('Add quoted text'),
    
    keywords: [__('blockquote'), __('quote'), __('block') ],
    
    icon: QuoteIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },

    edit: Edit,
    
    save: () => null,

});
