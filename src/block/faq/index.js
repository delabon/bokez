// Import JS
import { Edit } from './edit';
import { FaqIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
    RichText,
} = wp.editor;

registerBlockType( 'bokez/faq', {

    title: __( 'FAQ / Accordion' ),
    
    description: __('Easily create an accordion for your post / page.'),
    
    keywords: [__('accordion'), __('list'), __('faq')],
    
    icon: FaqIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },

    edit: Edit,
    
    save: () => null,
    
});
