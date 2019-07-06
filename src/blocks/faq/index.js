// Import JS
import { Edit } from './edit';
import { FaqIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const {
    RichText,
} = wp.editor;

registerBlockType( 'bokez/faq', {

    title: __( 'FAQ / Accordion' , 'bokez'),
    
    description: __('Easily create an accordion for your post / page.', 'bokez'),
    
    keywords: [__('accordion', 'bokez'), __('list', 'bokez'), __('faq', 'bokez')],
    
    icon: FaqIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },

    edit: Edit,
    
    save: () => null,
    
});
