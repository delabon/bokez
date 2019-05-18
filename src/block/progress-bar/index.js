// Import JS
import { Edit } from './edit'
import { ProgressBarIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/progress-bar', {

    title: __( 'Progress Bar' ),
    
    description: __('Add beautiful customized progress bar.'),
    
    keywords: [__('progress'), __('bar'), __('skill')],
    
    icon: ProgressBarIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: Edit,
    
    save: () => null,
})

