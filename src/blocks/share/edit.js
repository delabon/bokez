import { bokez } from '../../global'
import { FacebookIcon, TwitterIcon, RedditIcon, LinkedinIcon, EmailIcon } from '../../icons';

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls,
    AlignmentToolbar,
    BlockControls,
} = wp.blockEditor;

const { 
    ToggleControl,
} = wp.components;

export const justifyContent = ( alignment ) => {

    if( alignment === 'left' ){
        return 'flex-start';
    }
    else if( alignment === 'right' ){
        return 'flex-end';
    }
    
    return 'center';
}

export class Edit extends Component{

    render(){

        const { 
            isSelected, 
            setAttributes, 
            attributes
        } = this.props
    
        const { 
            show_facebook,
            show_linkedin,
            show_reddit,
            show_twitter,
            show_email,
            alignment,
            bgColor,
            iconColor,
        } = attributes
    
        return [
    
            <div key = { 'button' } className = { 'bokez-block bokez-share' } style = { { 'justify-content': justifyContent( alignment ) } } >
                
                { show_facebook && ( 
                    <a 
                        style = {{ 'background-color' : bgColor }}
                        onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = 'javascript:void(0)'
                        className = { 'bokez-share-facebook' }                                 
                    >
                        <span className = 'bokez-share-tooltip' >
                            { __('Facebook', 'bokez') }
                        </span>
    
                        <FacebookIcon fill = { iconColor } />
                    </a>
                )}
    
                { show_twitter && ( 
                    <a 
                        style = {{ 'background-color' : bgColor }}
                        onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = 'javascript:void(0)'
                        className = { 'bokez-share-twitter' }                                 
                    >
                        <span className = 'bokez-share-tooltip' >
                            { __('Twitter', 'bokez') }
                        </span>
    
                        <TwitterIcon fill = { iconColor } />
                    </a>
                )}
    
                { show_reddit && ( 
                    <a 
                        style = {{ 'background-color' : bgColor }}
                        onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = 'javascript:void(0)'
                        className = { 'bokez-share-reddit' }                                 
                    >
                        <span className = 'bokez-share-tooltip' >
                            { __('Reddit', 'bokez') }
                        </span>
    
                        <RedditIcon fill = { iconColor } />
                    </a>
                )}
    
                { show_linkedin && ( 
                    <a 
                        style = {{ 'background-color' : bgColor }}
                        onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = 'javascript:void(0)'
                        className = { 'bokez-share-linkedin' }                                 
                    >
                        <span className = 'bokez-share-tooltip' >
                            { __('Linkedin', 'bokez') }
                        </span>
    
                        <LinkedinIcon fill = { iconColor } />
                    </a>
                )}
    
                { show_email && ( 
                    <a 
                        style = {{ 'background-color' : bgColor }}
                        onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = 'javascript:void(0)'
                        className = { 'bokez-share-email' }                                 
                    >
                        <span className = 'bokez-share-tooltip' >
                            { __('Email', 'bokez') }
                        </span>
    
                        <EmailIcon fill = { iconColor } />
                    </a>
                )}
    
            </div>,
            
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
    
                    <ToggleControl
                        label = { __( 'Facebook' , 'bokez') }
                        checked = { show_facebook }
                        onChange = { ( value ) => setAttributes( { show_facebook: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Twitter' , 'bokez') }
                        checked = { show_twitter }
                        onChange = { ( value ) => setAttributes( { show_twitter: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Reddit' , 'bokez') }
                        checked = { show_reddit }
                        onChange = { ( value ) => setAttributes( { show_reddit: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Linkedin' , 'bokez') }
                        checked = { show_linkedin }
                        onChange = { ( value ) => setAttributes( { show_linkedin: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Email' , 'bokez') }
                        checked = { show_email }
                        onChange = { ( value ) => setAttributes( { show_email: value } ) }
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Background Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { bgColor } 
                        colorSettings={ [ {
                            value: bgColor,
                            colors: bokez.colors,
                            label: __( 'Background Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { bgColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Icon Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { iconColor } 
                        colorSettings={ [ {
                            value: iconColor,
                            colors: bokez.colors,
                            label: __( 'Icon Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { iconColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            )
            
        ];
    }

}