//  Import JS.
import { Edit } from './edit';
import { NotificationIcon, CloseIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/notification', {

    title: __( 'Notification' , 'bokez'),
    
    description: __('Add beautiful notice for your visitors.', 'bokez'),
    
    keywords: [__('alert', 'bokez'), __('notification', 'bokez'), __('error', 'bokez')],
    
    icon: NotificationIcon,
    
    category: 'bokez',

    supports: {
        html:false,
    },

    edit: Edit,
    
    save: () => null,
})

