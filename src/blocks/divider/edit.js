import { bokez } from '../../global'

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
} = wp.editor;

const { 
    SelectControl,
    RangeControl,
} = wp.components;

export class Edit extends Component{

    render(){

        const { 
            isSelected, 
            setAttributes, 
        } = this.props
    
        const { 
            alignment, 
            borderSize, 
            borderColor,
            borderType, 
            width       
        } = this.props.attributes
    
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
                        label = { __( 'Type' , 'bokez') }
                        value = { borderType }
                        options = { bokez.borderTypes.map( function( pos ) {
                            return { value: pos.value, label: pos.label };
                        })}
                        onChange = { ( newValue ) => setAttributes( { borderType: newValue } ) }
                    />
    
                    <RangeControl
                        label = { __( 'Height' , 'bokez') }
                        value = { borderSize }
                        min = { 1 }
                        max = { 15 }
                        step = { 1 }
                        onChange = { ( newValue ) => setAttributes( { borderSize: newValue } ) } 
                    />
    
                    <RangeControl
                        label = { __( 'Width' , 'bokez') }
                        value = { width }
                        min = { 1 }
                        max = { 100 }
                        step = { 1 }
                        onChange = { ( newValue ) => setAttributes( { width: newValue } ) } 
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { borderColor } 
                        colorSettings={ [ {
                                value: borderColor,
                                colors: bokez.colors,
                                label: __( 'Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { borderColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key={ 'divider' } className={ 'bokez-block bokez-divider' } style = { { 'text-align': alignment } } >
                <span style={ { 
                    'width' : width + '%', 
                    'border-width' : borderSize + 'px',
                    'border-color' : borderColor,
                    'border-style' : borderType,
                    } }
                ></span>
            </div>
            
        ];
    }
    

}
