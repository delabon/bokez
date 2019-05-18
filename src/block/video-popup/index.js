//  Import JS.
import { Edit } from './edit'
import { VideoPopupIcon } from '../../icons';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'bokez/video-popup', {
    
    title: __( 'Video Popup' ),
    
    description: __('Video popup block. use youtube or vimeo videos'),
    
    keywords: [ __('video'), __('popup'), 'youtube' ],
    
    icon: VideoPopupIcon,
    
    category: 'bokez',
    
    supports: {
        html: false
    },
    
    edit: Edit,
    
    save: () => null,
});
