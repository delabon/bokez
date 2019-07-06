// Import JS
import { Edit } from './edit'
import { ProgressBarIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/progress-bar', {

    title: __( 'Progress Bar' , 'bokez'),
    
    description: __('Add beautiful customized progress bar.', 'bokez'),
    
    keywords: [__('progress', 'bokez'), __('bar', 'bokez'), __('skill', 'bokez')],
    
    icon: ProgressBarIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: Edit,
    
    save: () => null,
})

