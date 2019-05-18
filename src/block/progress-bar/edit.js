import { bokez } from '../../global'

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,	
    InspectorControls, 
} = wp.editor;

const { 
    RangeControl,
} = wp.components;

export class Edit extends Component{

    render(){

        const { 
            isSelected, 
            setAttributes, 
            attributes
        } = this.props
    
        const {
            progress,
            progressColor,
            backgroundColor,
            tooltipBackgroundColor,
            tooltipColor
        } = attributes;
    
        return [
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
                    
                    <RangeControl
                        label = { __( 'Progress' ) }
                        value = { parseInt( progress.slice(0, -1) ) }
                        step = { 1 }
                        min = { 0 }
                        max = { 100 }
                        onChange = { ( newValue ) => setAttributes( { progress: newValue + "%" } ) }
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Background Color' ) } 
                        initialOpen = { false } 
                        colorValue = { backgroundColor }
                        colorSettings={ [ {
                            value: backgroundColor,
                            colors: bokez.colors,
                            label: __( 'Background Color' ),
                            onChange: ( newColor ) => setAttributes( { backgroundColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Progress Color' ) } 
                        initialOpen = { false } 
                        colorValue = { progressColor } 
                        colorSettings={ [ {
                            value: progressColor,
                            colors: bokez.colors,
                            label: __( 'Progress Color' ),
                            onChange: ( newColor ) => setAttributes( { progressColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Tooltip Background Color' ) } 
                        initialOpen = { false } 
                        colorValue = { tooltipBackgroundColor }
                        colorSettings={ [ {
                            value: tooltipBackgroundColor,
                            colors: bokez.colors,
                            label: __( 'Tooltip Background Color' ),
                            onChange: ( newColor ) => setAttributes( { tooltipBackgroundColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Tooltip Color' ) } 
                        initialOpen = { false } 
                        colorValue = { tooltipColor }
                        colorSettings={ [ {
                            value: tooltipColor,
                            colors: bokez.colors,
                            label: __( 'Tooltip Color' ),
                            onChange: ( newColor ) => setAttributes( { tooltipColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key={ 'progress-bar' } className={ 'bokez-block bokez-progress-bar-wrapper' } >
                
                <div className = { 'bokez-progress-bar' } style = { { 'background-color': backgroundColor } } >
                
                    <div className = { 'bokez-progress-bar-progress' } style = { { 'background-color': progressColor , 'width' : progress } } >
                        
                        <div className = { 'bokez-progress-bar-tooltip' } style = { { 'background-color': tooltipBackgroundColor , 'color' : tooltipColor } } >{ progress }
                            
                            <span style = { { 'border-top-color': tooltipBackgroundColor } } ></span>
                        
                        </div>
                    
                    </div>  
                
                </div>
    
            </div>
            
        ];
    }    


}
