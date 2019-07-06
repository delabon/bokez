//  Import JS .
import { Edit } from './edit';
import { ProfileIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

registerBlockType( 'bokez/profile', {
    
    title: __( 'Profile' , 'bokez'),
    
    description: __('Add beautiful customized profile.', 'bokez'),
    
    keywords: [__('profile', 'bokez'), __('author', 'bokez')],
    
    icon: ProfileIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: Edit,
    
    save: () => null,
})

