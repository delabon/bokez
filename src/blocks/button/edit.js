import { bokez } from '../../global'

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
    URLInput,   
    RichText,
} = wp.editor;

const { 
    SelectControl,
	Dashicon,    
} = wp.components;

export class Edit extends Component{

    render() {

        const { 
            isSelected, 
            setAttributes, 
        } = this.props
    
        const { 
            text,
            url,
            alignment,
            color,
            backgroundColor,
            size,
            type,
        } = this.props.attributes;

        return [

            isSelected && (
    
                <BlockControls key = { 'controls' }>
                    <AlignmentToolbar
                        value={alignment}
                        onChange={ ( nextAlign ) => setAttributes( { alignment: nextAlign } ) }
                    />
                </BlockControls>
    
            ),
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
    
                    <SelectControl 
                        label = { __( 'Size' , 'bokez') }
                        value = { size }
                        options = { bokez.buttonSizes.map( function( pos ) {
                            return { value: pos.value, label: pos.label };
                        })}
                        onChange = { ( value ) => setAttributes( { size: value } ) }
                    />
    
                    <SelectControl 
                        label = { __( 'Style' , 'bokez') }
                        value = { type }
                        options = { bokez.buttonTypes.map( function( pos ) {
                            return { value: pos.value, label: pos.label };
                        })}
                        onChange = { ( newType ) => setAttributes( { type: newType } ) }
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Background Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { backgroundColor }
        				colorSettings={ [ {
                            value: backgroundColor,
                            colors: bokez.colors,
                            label: __( 'Background Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { backgroundColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>                
    
                    <PanelColorSettings 
                        title = { __( 'Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { color }
                        colorSettings={ [ {
                            value: color,
                            colors: bokez.colors,
                            label: __( 'Background Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { color: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key = { 'button' } className = { 'bokez-block bokez-button' } style = { { 'text-align': alignment } } >
                <a 
                    onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                    href = { url } 
                    style = {{ 
                        'background-color': backgroundColor, 
                        'color' : color,
                    }} 
                    className = { 'bokez-button-type-' + type + ' bokez-button-size-' + size }                                 
                >
        
                    <RichText    
                        key = { 'button-text' }
                        value = { text }
                        placeholder = { text }
                        tagName = { 'span' }
                        keepPlaceholderOnFocus = { true }
                        onChange = { ( newtext ) => setAttributes( { text: newtext } ) }
                        isSelected = { false }
                    />
                    
                </a>
            </div>,
    
            isSelected && (
                <form
                    key={ 'form-link' }
                    onSubmit={ ( event ) => event.preventDefault() }
                    className={ `bokez-block-form blocks-button__inline-link bokez-alignment-${alignment}`}>
                    <Dashicon icon={ 'admin-links' } />
                    <URLInput
                        value={ url }
                        onChange={ ( value ) => setAttributes( { url: value } ) }
                    />
                </form>
            ),
            
        ];
    }

}
