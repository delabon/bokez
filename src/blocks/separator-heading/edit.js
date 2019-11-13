import { bokez } from '../../global'

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,	
    InspectorControls, 
    RichText
} = wp.blockEditor;

const { 
    SelectControl,
    RangeControl,
} = wp.components;

export class Edit extends Component{

    render() {

        const { 
            isSelected, 
            setAttributes, 
            attributes
        } = this.props
    
        const { 
            text,
            textColor,
            borderSize,
            borderType,
            borderColor,
            width
        } = attributes
    
        return [
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
                    
                    <SelectControl
                        label = { __( 'Type' , 'bokez') }
                        value = { borderType }
                        options = { bokez.borderTypes.map( function( pos ) {
                            return { value: pos.value, label: pos.label };
                        })}
                        onChange = { ( newValue ) => setAttributes( { borderType: newValue } ) }
                    />
    
                    <RangeControl
                        label = { __( 'Width' , 'bokez') }
                        value = { width }
                        min = { 60 }
                        max = { 100 }
                        step = { 1 }
                        onChange = { ( newValue ) => setAttributes( { width: newValue } ) } 
                    />
                    
                    <RangeControl
                        label = { __( 'Border Height' , 'bokez') }
                        value = { borderSize }
                        min = { 1 }
                        max = { 15 }
                        step = { 0.5 }
                        onChange = { ( newValue ) => setAttributes( { borderSize: newValue } ) } 
                    />
                    
                    <PanelColorSettings 
                        title = { __( 'Border Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { borderColor } 
                        colorSettings={ [ {
                            value: borderColor,
                            colors: bokez.colors,
                            label: __( 'Border Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { borderColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Text Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { textColor } 
                        colorSettings={ [ {
                            value: textColor,
                            colors: bokez.colors,
                            label: __( 'Text Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { textColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key={ 'divider' } className={ 'bokez-block bokez-separator-heading-wrapper' } >
                
                <div className = { 'bokez-separator-heading' } style = { { 'width' : width + '%' } } > 
    
                    <span 
                        className = { 'bokez-separator-heading-border' } 
                        style={ { 'border-bottom' : borderSize + 'px ' + borderType + ' ' + borderColor,	 } }
                    ></span>
    
                    <RichText 
                        tagName = { 'h3' }
                        keepPlaceholderOnFocus = { true }
                        placeholder = { text }
                        value = { text }
                        isSelected = { false }
                        className = { 'bokez-separator-heading-text' }
                        onChange = { ( newValue ) => setAttributes( { text: newValue } ) }
                        style = {{ 'color' : textColor }}
                    />
                
                    <span 
                        className = { 'bokez-separator-heading-border' } 
                        style={ { 'border-bottom' : borderSize + 'px ' + borderType + ' ' + borderColor,	 } }
                    ></span>
    
                </div>
    
            </div>
            
        ];
    }

}
