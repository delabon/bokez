//  Import JS.
import { Edit } from './edit';
import { PricingTableIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/pricing-table', {
    
    title: __( 'Pricing Table' ),
    
    description: __('Add Pricing Boxes.'),
    
    keywords: [ __('price'), __('table'), __('tag') ],
    
    icon: PricingTableIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: Edit,
    
    save: () => null,
})
