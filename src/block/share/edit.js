import { bokez } from '../../global'
import { ShareIcon, FacebookIcon, TwitterIcon, GooglePlusIcon, RedditIcon, LinkedinIcon, EmailIcon } from '../../icons';

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,	
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
} = wp.editor;

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
            show_google,
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
                            { __('Facebook') }
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
                            { __('Twitter') }
                        </span>
    
                        <TwitterIcon fill = { iconColor } />
                    </a>
                )}
    
                { show_google && ( 
                    <a 
                        style = {{ 'background-color' : bgColor }}
                        onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = 'javascript:void(0)'
                        className = { 'bokez-share-google' }                                 
                    >
                        <span className = 'bokez-share-tooltip' >
                            { __('Google+') }
                        </span>
    
                        <GooglePlusIcon fill = { iconColor } />
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
                            { __('Reddit') }
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
                            { __('Linkedin') }
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
                            { __('Email') }
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
                        label = { __( 'Facebook' ) }
                        checked = { show_facebook }
                        onChange = { ( value ) => setAttributes( { show_facebook: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Twitter' ) }
                        checked = { show_twitter }
                        onChange = { ( value ) => setAttributes( { show_twitter: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Google+' ) }
                        checked = { show_google }
                        onChange = { ( value ) => setAttributes( { show_google: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Reddit' ) }
                        checked = { show_reddit }
                        onChange = { ( value ) => setAttributes( { show_reddit: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Linkedin' ) }
                        checked = { show_linkedin }
                        onChange = { ( value ) => setAttributes( { show_linkedin: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Email' ) }
                        checked = { show_email }
                        onChange = { ( value ) => setAttributes( { show_email: value } ) }
                    />
    
                    <PanelColorSettings 
                        title = { __( 'Background Color' ) } 
                        initialOpen = { false } 
                        colorValue = { bgColor } 
                        colorSettings={ [ {
                            value: bgColor,
                            colors: bokez.colors,
                            label: __( 'Background Color' ),
                            onChange: ( newColor ) => setAttributes( { bgColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Icon Color' ) } 
                        initialOpen = { false } 
                        colorValue = { iconColor } 
                        colorSettings={ [ {
                            value: iconColor,
                            colors: bokez.colors,
                            label: __( 'Icon Color' ),
                            onChange: ( newColor ) => setAttributes( { iconColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            )
            
        ];
    }

}