import { bokez } from '../../global';
import { UploadImageIcon } from '../../icons';

const { __ } = wp.i18n;
const { Component } = wp.element;

const {
    PanelColorSettings,
    InspectorControls, 
    BlockControls,
    RichText,
    MediaUpload,
} = wp.editor;

const { 
    Button,
    IconButton,
    Toolbar, 
} = wp.components;

export class Edit extends Component{

    render(){
    
        const { 
            isSelected, 
            setAttributes,
            attributes
        } = this.props
    
        const { 
            message,
            name,
            job,
            imageID,
            imageUrl,
            backgroundColor,
            textColor,
        } = attributes
    
        const style = {
            'background-color': backgroundColor,
            'color': textColor,		
        };
    
        return [
    
            isSelected && (
                
                <BlockControls key = { 'controls' }>
                
                    <Toolbar>
                        <MediaUpload
                            onSelect = { ( media ) => setAttributes( { imageUrl: media.url, imageID: media.id } ) }
                            type = "image"
                            value = { imageID }
                            render = { ( { open } ) => (
                                <IconButton
                                    className="components-toolbar__control"
                                    label={ __( 'Edit image' ) }
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
                        title = { __( 'Text Color' ) } 
                        initialOpen = { false } 
                        colorValue = { textColor }
                        colorSettings={ [ {
                            value: textColor,
                            colors: bokez.colors,
                            label: __( 'Text Color' ),
                            onChange: ( newColor ) => setAttributes( { textColor: newColor } ),
                        } ] } >
    
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key={ 'editable' } className={ 'bokez-block bokez-profile' } style={ style } >
    
                <MediaUpload
                    className = {'bokez-cover-upload'}
                    onSelect = { ( media ) => setAttributes( { imageUrl: media.url, imageID: media.id } ) }
                    type = { 'image' }
                    value = { imageID }
                    render = { function( obj ) {
                        return (
    
                            <div className = { 'bokez-profile-avatar-wrapper' } >
    
                                {! imageUrl ? (
                                    <Button
                                        className = { imageID ? '' : 'button-bokez-image-add button button-large' }
                                        onClick = { obj.open } 
                                    >
                                        <UploadImageIcon/>
                                    </Button>
                                ) : (
    
                                    <div className = { 'bokez-profile-avatar' } >
                                        <img src = { imageUrl } onClick = { obj.open }  />
                                    </div>
    
                                )}
                                
                            </div>
    
                        )
                    } }
                />
    
                <div className = { 'bokez-profile-content' } >
                
                    <RichText 
                        formattingControls = {[]}
                        key = { 'editable-name' }
                        className = { 'bokez-profile-name' }
                        tagName = { 'h3' }
                        placeholder = { name.default }
                        keepPlaceholderOnFocus = { true }
                        value = { name }
                        onChange = { ( value ) => setAttributes( { name: value } ) }
                        style = {{ 'color' : textColor }}
                    />
    
                    <RichText 
                        formattingControls = {[]}
                        key = { 'editable-job' }
                        className = { 'bokez-profile-job' }
                        tagName = { 'span' }
                        placeholder = { job.default }
                        keepPlaceholderOnFocus = { true }
                        value = { job }
                        onChange = { ( value ) => setAttributes( { job: value } ) }
                    />
    
                    <RichText 
                        key = { 'editable-text' }
                        className = { 'bokez-profile-text' }
                        tagName = { 'p' }
                        placeholder = { message.default }
                        keepPlaceholderOnFocus = { true }
                        value = { message }
                        onChange = { ( newMessage ) => setAttributes( { message: newMessage } ) }
                    />
    
                </div>
    
            </div>
            
        ];
    }

}