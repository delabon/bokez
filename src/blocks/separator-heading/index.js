//  Import JS.
import { Edit } from './edit'
import { SeparatorHeadingIcon } from '../../icons';

const { __ } = wp.i18n;
const { RichText } = wp.editor;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/separator-heading', {
    
    title: __( 'Separator With Text' , 'bokez'),
    
    description: __('Insert a horizontal line with text in the center.', 'bokez'),
    
    keywords: [__('divider', 'bokez'), __('separator', 'bokez')],
    
    icon: SeparatorHeadingIcon,
    
    category: 'bokez',
    
    supports: {
        html: false
    },
    
    edit: Edit,
    
    save: () => null,
})
