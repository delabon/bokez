// Import JS
import { Edit } from './edit';
import { DividerIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/divider', {
    
    title: __( 'Divider' , 'bokez'),
    
    description: __('Insert a horizontal line where you want to create a break between ideas.', 'bokez'),
    
    keywords: [__('divider', 'bokez'), __('separator', 'bokez')],
    
    icon: DividerIcon,
    
    category: 'bokez',
   
    supports: {
        html: false,
    },

    edit: Edit,
    
    save: () => null,
})
