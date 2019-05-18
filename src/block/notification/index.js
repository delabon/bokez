//  Import JS.
import { Edit } from './edit';
import { NotificationIcon, CloseIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/notification', {

    title: __( 'Notification' ),
    
    description: __('Add beautiful notice for your visitors.'),
    
    keywords: [__('alert'), __('notification'), __('error')],
    
    icon: NotificationIcon,
    
    category: 'bokez',

    supports: {
        html:false,
    },

    edit: Edit,
    
    save: () => null,
})

