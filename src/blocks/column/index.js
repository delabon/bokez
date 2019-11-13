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

const {
    InnerBlocks, 
	InspectorControls,
} = wp.blockEditor;

const {
	PanelBody,
    RangeControl,
	Dashicon,    
} = wp.components;

export class BokezColumnBlock extends Component{

    /**
	 * Renders the component.
	**/
    render(){        

        const {
            isSelected,
            attributes,
            setAttributes,
        }  = this.props;

        const { 
            id,
        } = attributes
    
        return [

            isSelected && (

                <InspectorControls>

                    <PanelBody
                        title={ __('Padding / Margin', 'bokez') }
                        initialOpen={ true }
                    >
            
                        <RangeControl
                            label = { __('Padding Top', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ attributes.paddingTop }
                            onChange={ ( paddingTop = 0 ) => setAttributes({ paddingTop }) }
                        />
            
                        <RangeControl
                            label = { __('Padding Bottom', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ attributes.paddingBottom }
                            onChange={ ( paddingBottom = 0 ) => setAttributes({ paddingBottom }) }
                        />
            
                        <RangeControl
                            label = { __('Margin Top', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ attributes.marginTop }
                            onChange={ ( marginTop = 0 ) => setAttributes({ marginTop }) }
                        />
            
                        <RangeControl
                            label = { __('Margin Bottom', 'bokez') }
                            min = { 0 }
                            max = { 100 }
                            value={ attributes.marginBottom }
                            onChange={ ( marginBottom = 0 ) => setAttributes({ marginBottom }) }
                        />
            
                    </PanelBody>

                </InspectorControls>
            ),      

            <div 
                className={ `bokez-column bokez-column-${id}` } 
                style = {{ 
                    'paddingTop' : attributes.paddingTop + 'px', 
                    'marginTop' : attributes.marginTop + 'px', 
                    'paddingBottom' : attributes.paddingBottom + 'px', 
                    'marginBottom' : attributes.marginBottom + 'px',             
                }}
            >
                <div 
                    className="bokez-column-inner" 
                >
                    
                    <div className="bokez-column-settings-icon" >
                        
                        <Dashicon icon="admin-generic"/>

                        <span>{__('Column Settings', 'bokez')}</span>

                    </div>

					<InnerBlocks templateLock={ false } />
                    
				</div>
			</div>
        ];
    };
}

registerBlockType( 'bokez/column', {
    
    parent: [ 'bokez/row' ],

    title: __( 'Column' , 'bokez'),
        
    keywords: [ __('column', 'bokez'), __('section', 'bokez'), __('layout', 'bokez') ],
    
    icon: ColumnIcon,
    
    category: 'bokez',
    
    supports: {
        html: false,
    },
    
    edit: BokezColumnBlock,

    save: () => <InnerBlocks.Content />,

})

