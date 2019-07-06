//  Import JS.
import { Edit } from './edit';
import { TestimonialIcon, ArrowLeftIcon, ArrowRightIcon } from '../../icons';

const { __ } = wp.i18n;
const { RichText } = wp.editor;
const { Fragment } = wp.element;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/testimonial', {
    
    title: __( 'Testimonial' , 'bokez'),
    
    description: __('Add a multiple testimonials with a name, title and text.', 'bokez'),
    
    keywords: [__('testimonial', 'bokez'), __('user', 'bokez')],
    
    icon: TestimonialIcon,
    
    category: 'bokez',
    
    supports: {
        html: false
    },
    
    edit: Edit,

    save: () => null,

})

