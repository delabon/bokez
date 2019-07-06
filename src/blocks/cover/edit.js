import { bokez } from '../../global'

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar,
    BlockControls,
    MediaUpload,
    RichText,
    URLInput,   
} = wp.editor;

const { 
    ToggleControl,
    IconButton,
    Button,
    Toolbar, 
} = wp.components;

export class Edit extends Component{

    render(){

        const { 
            isSelected, 
            setAttributes, 
        } = this.props
        
        const {
            alignment,
            imageUrl,
            imageID,
            title,
            subtitle,
            buttonText,
            buttonUrl,
            backgroundColor,
            textColor,
            buttonColor,
            buttonBGColor,
            showButton,
            showHero,
            uid
        } = this.props.attributes;
    
        if( uid === '' ){
            setAttributes({ uid : bokez.uniqueID() });
        }
    
        const style = { 
            'text-align' : alignment, 
            'background-color' : backgroundColor,
        };
    
        if( imageUrl ){
            style['background-image'] = 'url('+ imageUrl +')' ;
        } 
    
        return [
    
            <div id = { uid } key={ 'cover-one' } className={ 'bokez-block bokez-cover bokez-cover-one' + ( imageID ? ' bokez-cover-has-image' : ''  ) } style = { style } >            
    
                <MediaUpload
                    className = {'bokez-cover-upload'}
                    onSelect = { ( media ) => setAttributes( { imageUrl: media.url, imageID: media.id } ) }
                    type = { 'image' }
                    value = { imageID }
                    render = { function( obj ) {
                        return [
                            ! imageUrl && (
                                <Button
                                    className = { imageID ? '' : 'button button-large' }
                                    onClick = { obj.open } 
                                >
                                    {__('Upload Image', 'bokez')}
                                </Button>
                            )
                        ]
                    } }
                />
                
                <div className = 'bokez-cover-content' >
                
                    <RichText
                        style = {{
                            'color' : textColor,
                        }}
                        formattingControls = { [] }
                        tagName = "h2"
                        className = { 'bokez-cover-title' }
                        placeholder = { title.default }
                        value = { title }
                        onChange = { ( value ) => setAttributes( { title: value } ) }
                    />
                    
                    { showHero && (
                        <RichText
                            style = {{
                                'color' : textColor,
                            }}
                            tagName = "p"
                            className = { 'bokez-cover-subtitle' }
                            placeholder = { subtitle.default }
                            value = { subtitle }
                            onChange = { ( value ) => setAttributes( { subtitle: value } ) }
                        />
                    )}
                    
                    { showButton && (
                        <RichText
                            style = {{
                                'color' : buttonColor,
                                'background-color' : buttonBGColor,
                            }}
                            formattingControls = { [] }
                            tagName = "a"
                            className = { 'bokez-cover-button' }
                            placeholder = { buttonText.default }
                            href = { buttonUrl }
                            value = { buttonText }
                            onChange = { ( value ) => setAttributes( { buttonText: value } ) }
                        />
                    )}
    
                </div>
                
            </div>,
    
            isSelected && (
                <form
                    key={ 'form-link' }
                    onSubmit={ ( event ) => event.preventDefault() }
                    className={ `bokez-block-form blocks-button__inline-link bokez-alignment-${alignment}`}>
                    <span>Button One Url</span>
                    <URLInput
                        value={ buttonUrl }
                        onChange={ ( value ) => setAttributes( { buttonUrl: value } ) }
                    />
                </form>
            ),
    
            isSelected  && (
                <BlockControls key='controls'>
    
                    <AlignmentToolbar
                        value={ alignment }
                        onChange={ ( newAlign ) => setAttributes( { alignment: newAlign } ) }
                    />
    
                    <Toolbar>
                        <MediaUpload
                            onSelect = { ( media ) => setAttributes( { imageUrl: media.url, imageID: media.id } ) }
                            type = "image"
                            value = { imageID }
                            render = { ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Edit image' , 'bokez') }
                                    icon="edit"
                                    onClick={ open }
                                />
                            ) }
                        />
                    </Toolbar>
                    
                </BlockControls>
            ),
    
            isSelected && (
    
                <InspectorControls key = {'inspector'} > 
    
                    <hr/>
    
                    <ToggleControl
                        label = { __( 'Show Hero' , 'bokez') }
                        checked = { showHero }
                        onChange = { ( value ) => setAttributes( { showHero: value } ) }
                    />
    
                    <ToggleControl
                        label = { __( 'Show Button' , 'bokez') }
                        checked = { showButton }
                        onChange = { ( value ) => setAttributes( { showButton: value } ) }
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
                        title = { __( 'Text Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { textColor } 
                        colorSettings={ [ {
                                value: textColor,
                                colors: bokez.colors,
                                label: __( 'Background Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { textColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                    <PanelColorSettings 
                        title = { __( 'Button Background Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { buttonBGColor }
                        colorSettings={ [ {
                                value: buttonBGColor,
                                colors: bokez.colors,
                                label: __( 'Background Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { buttonBGColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>     
    
                    <PanelColorSettings 
                        title = { __( 'Button Text Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { buttonColor } 
                        colorSettings={ [ {
                                value: buttonColor,
                                colors: bokez.colors,
                                label: __( 'Background Color' , 'bokez'),
                                onChange: ( newColor ) => setAttributes( { buttonColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>     
    
                </InspectorControls>
    
            )
            
        ];
    }
}
