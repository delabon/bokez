/**
 * BLOCK: bokez-gutenberg
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { bokez } from '../../global';
import { ColumnIcon } from '../../icons';

const { Fragment, Component } = wp.element;
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;;

export class BokezColumnBlock extends Component{

    /**
	 * Renders the component.
	**/
    render(){        
        let self = this;

        const { 
            id,
        } = self.props.attributes
    
        return [
            <div 
                className={ `bokez-column bokez-column-${id}` } 
            >
                <div 
                    className="bokez-column-inner" 
                >
                    <div style = {{ 'height' : '10px' }} ></div>

					<InnerBlocks templateLock={ false } />
                    
                    <div style = {{ 'height' : '10px' }} ></div>

				</div>
			</div>
        ];
    };
}

registerBlockType( 'bokez/column', {
    
    parent: [ 'bokez/row' ],

    title: __( 'Column' ),
        
    keywords: [ __('column'), __('section'), __('layout') ],
    
    icon: ColumnIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: BokezColumnBlock,

    save: () => <InnerBlocks.Content />,

})

