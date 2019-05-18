//  Import JS .
import { Edit } from './edit';
import { ProfileIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'bokez/profile', {
    
    title: __( 'Profile' ),
    
    description: __('Add beautiful customized profile.'),
    
    keywords: [__('profile'), __('author')],
    
    icon: ProfileIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: Edit,
    
    save: () => null,
})

