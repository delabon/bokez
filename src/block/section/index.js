//  Import JS.
import { RowIcon } from '../../icons';
import { Edit } from './edit';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;

registerBlockType( 'bokez/section', {
    
    title: __( 'Section / Row Layout' ),
        
    keywords: [ __('row'), __('section'), __('layout') ],
    
    icon: RowIcon,
    
    category: 'bokez',
    
    supports: {
        anchor: true,
        html: false,
    },
    
    edit: Edit,

    save: () => <InnerBlocks.Content />,

})

