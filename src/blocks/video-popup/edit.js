import { bokez } from '../../global'
import { VideoPlayIcon } from '../../icons';

const { __ } = wp.i18n;
const { Fragment, Component } = wp.element;

const {
    PanelColorSettings,	
    InspectorControls, 
    URLInput,
    MediaUpload,
    BlockControls,
} = wp.editor;

const { 
    Dashicon,    
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
            url,
            color,
            backgroundColor,
            imageID,
            imageUrl,
            videoSite,
            videoId,
        } = attributes
    
        const style = {    
            'background-image' : ( ! imageUrl ? '' : 'url(' + imageUrl + ')' ),
            'background-color' : backgroundColor,
        };
    
        const videoUrlChange = ( url ) => {
    
            url = url.trim();
            const parts = bokez.parse_url( url );
    
            if( parts.hostname === "www.youtube.com" || parts.hostname === "youtube.com" || parts.hostname === "youtu.be" ){
    
                if( parts.hostname === "youtu.be" ){
                    return setAttributes({ 
                        url: url,
                        videoSite: 'youtube',
                        videoId: parts.path.replace('/', ''),
                    });
                }
                else{
                    if( parts.query.search('v=') !== -1 ){
                        
                        const regex = /v=(.*?)(&|$)/;
                        const m = regex.exec( url );
                        
                        if( m ){
                            return setAttributes({ 
                                url: url,
                                videoSite: 'youtube',
                                videoId: m[1],
                            });
                        }
                    }
                }
    
            }
            else if( parts.hostname === "www.vimeo.com" || parts.hostname === "vimeo.com" ){
                return setAttributes({ 
                    url: url,
                    videoSite: 'vimeo',
                    videoId: parts.path.replace('/', ''),
                });
            }
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
                        title = { __( 'Play Button Color' , 'bokez') } 
                        initialOpen = { false } 
                        colorValue = { color } 
                        colorSettings={ [ {
                            value: color,
                            colors: bokez.colors,
                            label: __( 'Play Button Color' , 'bokez'),
                            onChange: ( newColor ) => setAttributes( { color: newColor } ),
                        } ] } >
                    </PanelColorSettings>
    
                </InspectorControls>
    
            ),
    
            <div key = { 'video-popup' } className = { 'bokez-block bokez-video-popup' } data-videosite = { videoSite } data-videoid = { videoId } >
                <div className = { 'bokez-video-wrapper' } style = { style } > 
    
                    <a onClick = { (event) => { event.preventDefault(); event.stopPropagation(); } } 
                        href = { '#' } 
                        className = { 'bokez-video-popup-play' }                                 
                    >
                        <VideoPlayIcon fill = { color } />
                    </a>
    
                    <MediaUpload
                        className = {'bokez-video-popup-upload'}
                        onSelect = { ( media ) => setAttributes( { imageUrl: media.url, imageID: media.id } ) }
                        type = { 'image' }
                        value = { imageID }
                        render = { function( obj ) {
                            return (
    
                                <Button
                                    className = { 'bokez-video-popup-upload button' }
                                    onClick = { obj.open } 
                                >
                                    { __('Upload Image', 'bokez') }
                                </Button>
                                        
                            )
                        } }
                    />
    
                </div>
            </div>,
    
            isSelected && (
                <form
                    key={ 'form-link' }
                    onSubmit={ ( event ) => event.preventDefault() }
                    className={ 'bokez-block-form blocks-button__inline-link' }>
                    {__('youtube or vimeo', 'bokez') }
                    <Dashicon icon={ 'admin-links' } />
                    <URLInput
                        value={ url }
                        onChange={ videoUrlChange }
                    />
                </form>
            ),
            
        ];
    }

}