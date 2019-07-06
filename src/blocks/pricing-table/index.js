//  Import JS.
import { Edit } from './edit';
import { PricingTableIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/pricing-table', {
    
    title: __( 'Pricing Table' , 'bokez'),
    
    description: __('Add Pricing Boxes.', 'bokez'),
    
    keywords: [ __('price', 'bokez'), __('table', 'bokez'), __('tag', 'bokez') ],
    
    icon: PricingTableIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: Edit,
    
    save: () => null,
})
