// Import JS
import { ButtonIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/button', {

    title: __( 'Button' , 'bokez'),
    
    description: __('Subscribe, buy, or read more? Add one now.', 'bokez'),
    
    keywords: [__('button', 'bokez'), __('link', 'bokez')],
    
    icon: ButtonIcon,
    
    category: 'bokez',

    supports: {
        html: false,
    },

    edit: Edit,

    save: () => null,
})
